import React, { Suspense } from "react";
import { EventEmitter } from "events";
import AddCityCard from "../../components/AddCityCard/AddCityCard";
import axios from "axios";
import NavBar from "../../components/Navbar/NavBar";
import Loader from "react-loader-spinner";
import "./HomeStyles.css";
const CityCard = React.lazy(() => import('../../components/CityCard/CityCard'));
export default class Home extends React.Component<
  {},
  {cities:any[],darkTheme:boolean,bgSize?:number}
> {
  _emitter: any;
  constructor(props: any) {
    super(props);
    this._emitter = new EventEmitter();
    this.state = { cities: [] ,darkTheme:false, bgSize : 100};

    this._emitter.on("addedCity",(cityId:number)=>{
      const cities = this.state.cities
      cities.push(cityId)
      this.setState({cities:cities})
    })

    this._emitter.on("changeTheme",(darkTheme:boolean)=>{
      this.setState({darkTheme:darkTheme})
    })

    this._emitter.on("removeCity",async (cityId:number)=>{
      const cities = this.state.cities
      cities.splice(cities.indexOf(cityId),1)
      this.setState({cities:cities})
       const {
        data: { csrfToken },
      } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/csrf`, {
        withCredentials: true,
      });
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/user/remove_city`,{headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "xsrf-token": csrfToken,
      },data : {city:cityId},withCredentials:true})
    })
  }

  async fetchCities(){
    const cities = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/cities`,{withCredentials:true})).data
    this.setState({cities:cities})
  }

  async componentDidMount(){
    await this.fetchCities()
  }
  render() {
    return (
      <div className="Home">
        <NavBar emitter={this._emitter} />
        <div style={{display:"flex",justifyContent:"space-evenly",margin:"25px"}}>
          <AddCityCard emitter={this._emitter} /> 
        </div>
        <div className="wrapper">
        {
          this.state.cities.map(city => {
            return <div className="item" > <Suspense fallback={ <Loader
              type="Oval"
              color="#3f51b5"
              height={50}
              width={100}
            />}><CityCard key={city} emitter={this._emitter} cityId={city}/></Suspense></div>
          })
        }
        </div>
      </div>
    );
  }
}

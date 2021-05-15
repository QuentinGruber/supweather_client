import React from "react";
import { EventEmitter } from "events";
import AddCityCard from "../../components/AddCityCard/AddCityCard";
import axios from "axios";
import CityCard from "../../components/CityCard/CityCard";
import NavBar from "../../components/Navbar/NavBar";

export default class Home extends React.Component<
  {},
  {cities:any[]}
> {
  _emitter: any;
  constructor(props: any) {
    super(props);
    this._emitter = new EventEmitter();
    this.state = { cities: [] };

    this._emitter.on("addedCity",(cityId:number)=>{
      const cities = this.state.cities
      cities.push(cityId)
      this.setState({cities:cities})
      this.fetchCities()
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
      this.fetchCities()
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
        <NavBar />
        <div style={{display:"flex",justifyContent:"space-evenly",margin:"25px"}}>
          <AddCityCard emitter={this._emitter} /> 
        </div>
        <div className="wrapper">
        {
          this.state.cities.map(city => {
            return <div className="item" ><CityCard key={city} emitter={this._emitter} cityId={city}/></div>
          })
        }
        </div>
      </div>
    );
  }
}

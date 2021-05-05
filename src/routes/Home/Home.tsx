import React from "react";
import { EventEmitter } from "events";
import AddCityCard from "../../components/AddCityCard/AddCityCard";
import axios from "axios";
import CityCard from "../../components/CityCard/CityCard";

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
    })
  }

  async componentDidMount(){
    const cities = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/cities`,{withCredentials:true})).data
    console.log(cities)
   this.setState({cities:cities})
  }
  render() {
    return (
      <div className="Home">
        {
          this.state.cities.map(city => {
            return <CityCard key={city} emitter={this._emitter} cityId={city}/>
          })
        }
        <AddCityCard emitter={this._emitter} /> 
      </div>
    );
  }
}

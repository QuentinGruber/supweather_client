import { render } from "@testing-library/react";
import axios from "axios";
import React from "react";

    interface Coord {
        lon: number;
        lat: number;
    }

    interface Weather {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    interface Main {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    }

    interface Wind {
        speed: number;
        deg: number;
        gust: number;
    }

    interface Rain {
        h: number;
    }

    interface Clouds {
        all: number;
    }

    interface Sys {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    }

    interface CityData {
        coord: Coord;
        weather: Weather[];
        base: string;
        main: Main;
        visibility: number;
        wind: Wind;
        rain: Rain;
        clouds: Clouds;
        dt: number;
        sys: Sys;
        timezone: number;
        id: number;
        name: string;
        cod: number;
    }

    interface CityDataObject {
      data: CityData
    }

export default class CityCard extends React.Component<{emitter:any,cityId:number},{cityData:CityDataObject}> {
  constructor(props:any){
    super(props)
    this.state = {cityData:{} as CityDataObject}
  }
  async componentDidMount(
  )
  {
    const {data :cityData} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather/?cityId=${this.props.cityId}`,{withCredentials:true})
    this.setState({cityData: cityData}) 
  }
  render(){
    const { data:citydata } = this.state.cityData
    return(
    <div className="CityCard">
      <h1>{citydata?.name}</h1>
    </div>
    )
  }
}
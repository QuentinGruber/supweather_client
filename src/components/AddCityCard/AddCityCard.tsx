import { render } from "@testing-library/react";
import axios from "axios";
import React from "react";


export default class AddCityCard extends React.Component<{},{cityList:any[]}> {
  constructor(props:any){
    super(props)
    this.state = {cityList:[]
    }
  }
  async getCities():Promise<any>{
    return await axios.get(`${process.env.REACT_APP_SERVER_URL}/cities/?countryCode=FR`,{withCredentials:true})
  }
  AddCity(){
    alert((document.getElementById("cities-select") as any).value)
  }  
  async componentDidMount(
  )
  {
    const cityList = (await this.getCities()).data.data
    this.setState({cityList: cityList}) 
  }
  render(){
    return <div className="AddCityCard">
    <select name="cities" id="cities-select">
      <option value="">--Choose a city to add--</option>
      {this.state.cityList?.map((city:any) => {
        return  <option key={city.id} value={city.id}>{city.name}</option> 
      })}
    </select>
    <button onClick={()=>{this.AddCity()}} >add city</button>
  </div>;
  }
}
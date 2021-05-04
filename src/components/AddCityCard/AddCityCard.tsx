import axios from "axios";
import React from "react";

export async function AddCityCard() { // TODO: une class
  async function getCities():Promise<any>{
    return await axios.get(`${process.env.REACT_APP_SERVER_URL}/cities/?countryCode=FR`)
  }
  function AddCity(){
    alert((document.getElementById("cities-select") as any).value)
  }  
  return <div className="AddCityCard">
    <select name="cities" id="cities-select">
      <option value="">--Choose a city to add--</option>
      {(await getCities()).map((city:any) => {
         <option value={city.id}>{city.name}</option> 
      })}
    </select>
    <button onClick={()=>{AddCity()}} >add city</button>
  </div>;
}

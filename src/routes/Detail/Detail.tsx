import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import DayList from "../../components/DayList/DayList";


function Detail(props:any) {
  const location = useLocation();
  const { cityData } = location.state as any

  return( 
  <div className="Detail">
    <NavBar />
    <DayList cityData={cityData} cnt={2} />
  </div>)
}

export default Detail;

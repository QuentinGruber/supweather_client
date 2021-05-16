import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import { useLocation } from "react-router-dom";
import DayList from "../../components/DayList/DayList";

function Detail(props: any) {
  const location = useLocation();
  const { cityData } = location.state as any;
  return (
    <div className="Detail">
      <NavBar />
      <DayList cityData={cityData} cityName={cityData.name} cnt={2} />
    </div>
  );
}

export default Detail;

import axios from "axios"
import React, { useEffect, useState } from "react"
import DayCard from "../DayCard/DayCard";
import "./DayListStyles.css"
interface DayListProps {
    cityData:any;
    cnt:number;
}

export default function DayList(props:DayListProps){
    const { lat, lon } = props.cityData.coord;
    const [daily,setDaily] = useState(undefined)
    useEffect(()=>{
         axios.get(`${process.env.REACT_APP_SERVER_URL}/weather/daily?lat=${lat}&lon=${lon}`,{withCredentials:true})
         .then((cityData)=>{ 
             console.log(cityData)
             setDaily(cityData.data)
            })
    },[])
   
    return(
        <div className="wrapper">
        {daily? (daily as any).data.daily.map((day:any) => {
            return <div className="item"><DayCard dailyData={day} key={Math.random()} /></div>
        })
        :<p>no definito</p>}
        </div>
    )
}
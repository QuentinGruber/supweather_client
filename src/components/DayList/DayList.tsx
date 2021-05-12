import axios from "axios"
import React, { useEffect, useState } from "react"
import DayCard from "../DayCard/DayCard";

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
        <>
        {daily? (daily as any).data.daily.map((day:any) => {
            return <DayCard dailyData={day} key={Math.random()} />
        })
        :<p>no definito</p>}
        </>
    )
}
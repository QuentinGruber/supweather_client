import axios from "axios"
import React, { Suspense, useEffect, useState } from "react"
import "./DayListStyles.css"
import Loader from "react-loader-spinner";
const DayCard = React.lazy(() => import("../DayCard/DayCard"));
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
            return <div className="item"><Suspense fallback={<Loader
                type="Oval"
                color="#3f51b5"
                height={50}
                width={100}
              />}><DayCard dailyData={day} key={Math.random()} /></Suspense></div>
        })
        :<Loader
        type="Oval"
        color="#3f51b5"
        height={100}
        width={100}
      />}
        </div>
    )
}
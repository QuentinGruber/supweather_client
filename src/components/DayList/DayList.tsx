import axios from "axios"
import React, { Suspense, useEffect, useState } from "react"
import "./DayListStyles.css"
import Loader from "react-loader-spinner";
const DayCard = React.lazy(() => import("../DayCard/DayCard"));
interface DayListProps {
    cityData:any;
    cnt:number;
    cityName:string;
}

function getUtcDayString(dayId:number):string{
    switch (dayId) {
            case 0:    
            return "Sunday"
            case 1:    
            return "Monday"
            case 2:    
            return "Tuesday"
            case 3:    
            return "Wenesday";
            case 4:    
            return "Tuesday";
            case 5:    
            return "Friday";
            case 6:    
            return "Saturday";
            case 7:    
            return "Sunday";
        default:
            return "unknown"
    }

}

function getUtcMonthString(monthId:number):string{
    switch (monthId) {
            case 0:    
            return "January"
            case 1:    
            return "February"
            case 2:    
            return "Mars"
            case 3:    
            return "April";
            case 4:    
            return "May";
            case 5:    
            return "June";
            case 6:    
            return "Jully";
            case 7:    
            return "August";
            case 8:    
            return "September";
            case 9:    
            return "October";
            case 10:    
            return "November";
            case 11:    
            return "December";
        default:
            return "unknown"
    }

}

function generateDateText(date:Date):string{
    const dayNumber = date.getDate()
    const month = getUtcMonthString(date.getUTCMonth())
    const day = getUtcDayString(date.getUTCDay())
    return (`${day} ${dayNumber} ${month}`)
}
function generateDates() {
    const Dates = []
    const currentDate = new Date(Date.now())
    const dayInMillis = 24 * 3600 * 1000
    let idk = 0;
    for (let index = 0; index < 8; index++) {
        Dates.push(generateDateText((new Date(Date.now() + idk))))
        idk += dayInMillis
    }
    console.log("DAAAAAAAAAAAATES")
    console.log(Dates)
    return Dates
}

export default function DayList(props:DayListProps){
    const { lat, lon } = props.cityData.coord;
    const [daily,setDaily] = useState(undefined)
    const dates:any[] = generateDates()
    useEffect(()=>{
         axios.get(`${process.env.REACT_APP_SERVER_URL}/weather/daily?lat=${lat}&lon=${lon}`,{withCredentials:true})
         .then((cityData)=>{ 
             console.log(cityData)
             setDaily(cityData.data)
            })
    },[])
   
    return(
        <>
        <h1  className="cityName"
>{props.cityName}</h1>
        <div className="wrapper">
        {daily? (daily as any).data.daily.map((day:any,index:number) => {
            return <div className="item"><Suspense fallback={<Loader
                type="Oval"
                color="#3f51b5"
                height={50}
                width={100}
              />}><DayCard date={dates[index]} dailyData={day} key={Math.random()} /></Suspense></div>
        })
        :<Loader
        type="Oval"
        color="#3f51b5"
        height={100}
        width={100}
      />}
        </div>
        </>
    )
}
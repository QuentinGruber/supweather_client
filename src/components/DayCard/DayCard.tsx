import React from "react"
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography } from '@material-ui/core';


interface DayCardProps {
    dailyData:any;
}

function convertToDegreCelsius(tempInkalvin:number):string{
  return `${(tempInkalvin - 273.15).toFixed(1)}°`
};

export default function DayCard(props:DayCardProps){
    console.log(props.dailyData)
    const { wind_speed:wind, humidity , rain , pressure , sunrise , sunset , temp:{day:dayTemp, morn:mornTemp}, feels_like:{day:dayFeelsLike, morn:mornFeelsLike}} = props.dailyData
    const weatherDescription = props.dailyData.weather[0].description
    return( <Card style={{width:"300px"}}>
    <CardHeader
      title={"DATE"}
    />
    <CardContent >
    <img
    style={{width: "150px"}}
      src={process.env.PUBLIC_URL+"assets/cloudy_dark.png"}
    />
    <h6>{weatherDescription}</h6>
    </CardContent>
     <CardContent>
     <Typography>
      Morning : {convertToDegreCelsius(mornTemp)} Feels Like : {convertToDegreCelsius(mornFeelsLike)}
      </Typography>
      <Typography>
      Day : {convertToDegreCelsius(dayTemp)} Feels Like : {convertToDegreCelsius(dayFeelsLike)}
      </Typography>
      <Typography>
      Pressure : {pressure} Humidity : {humidity} Wind :{wind} Sunrise: {sunrise} Sunset: {sunset}
      </Typography>
      <Typography>
      Rain : {rain}mm
      </Typography>
    </CardContent>
  </Card>)
}
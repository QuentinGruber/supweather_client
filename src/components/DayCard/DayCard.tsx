import React from "react"
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography } from '@material-ui/core';
import { getAssociatedImage } from "../../utils/utils";


interface DayCardProps {
    dailyData:any;
    date:any
}

function convertToDegreCelsius(tempInkalvin:number):string{
  return `${(tempInkalvin - 273.15).toFixed(1)}°C`
};

function convertUnixTohoursMinutes(unixTime:number):string{
  const date = new Date (unixTime)
  console.log(date)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${minutes}`
}

export default function DayCard(props:DayCardProps){
    const { dt:dateTime, wind_deg:deg, wind_speed:wind, humidity , rain , pressure , sunrise , sunset , temp:{day:dayTemp, morn:mornTemp}, feels_like:{day:dayFeelsLike, morn:mornFeelsLike}} = props.dailyData
    const weatherDescription = props.dailyData.weather[0].description
    const iconId = props.dailyData.weather[0].icon
    return( <Card style={{width:"300px"}}>
    <CardHeader
      title={props.date}
    />
    <CardContent >
    <img
    style={{width: "150px"}}
    src={`${process.env.PUBLIC_URL}assets/${getAssociatedImage(iconId)}`}
    />
    <h2>{weatherDescription}</h2>
    </CardContent>
     <CardContent>
     <Typography>
      Morning : {convertToDegreCelsius(mornTemp)} Feels Like : {convertToDegreCelsius(mornFeelsLike)}
      </Typography>
      <Typography>
      Day : {convertToDegreCelsius(dayTemp)} Feels Like : {convertToDegreCelsius(dayFeelsLike)}
      </Typography>
      <Typography>
      Pressure : {pressure} hPA
      </Typography>
      <Typography>
      Humidity : {humidity} %
      </Typography>
      <Typography>
        Orientation : {deg}°
      </Typography>
      <Typography>
        Wind : {wind} km/h
      </Typography>
      <Typography>
        Sunrise : {convertUnixTohoursMinutes(sunrise)}
      </Typography>
      <Typography>
        Sunset : {convertUnixTohoursMinutes(sunset)}
      </Typography>
      <Typography>
      Rain : {rain}mm
      </Typography>
    </CardContent>
  </Card>)
}
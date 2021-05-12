import React from "react"
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography } from '@material-ui/core';


interface DayCardProps {
    dailyData:any;
}
export default function DayCard(props:DayCardProps){
    console.log(props.dailyData)
    return( <Card style={{width:"300px"}}>
    <CardHeader
      title={"cityData.name"}
      subheader={"this.convertToDegreCelsius(cityData.main.temp)"}
    />
    <CardContent >
    <img
    style={{width: "150px"}}
      src={process.env.PUBLIC_URL+"assets/cloudy_dark.png"}
    />
    <h6>cloud</h6>
    </CardContent>
     <CardContent>
      {"this.convertToDegreCelsius(cityData.main.temp)"}
      <Typography>
      Feels Like : {"this.convertToDegreCelsius(cityData.main.feels_like)"}
      </Typography>
      <Typography>
      Min : {"this.convertToDegreCelsius(cityData.main.temp_min)"}
      </Typography>
      <Typography>
      Max : {"this.convertToDegreCelsius(cityData.main.temp_max)"}
      </Typography>
    </CardContent>
  </Card>)
}
import { Button, Card } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

    interface Coord {
        lon: number;
        lat: number;
    }

    interface Weather {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    interface Main {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    }

    interface Wind {
        speed: number;
        deg: number;
        gust: number;
    }

    interface Rain {
        h: number;
    }

    interface Clouds {
        all: number;
    }

    interface Sys {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    }

    interface CityData {
        coord: Coord;
        weather: Weather[];
        base: string;
        main: Main;
        visibility: number;
        wind: Wind;
        rain: Rain;
        clouds: Clouds;
        dt: number;
        sys: Sys;
        timezone: number;
        id: number;
        name: string;
        cod: number;
    }

    interface CityDataObject {
      data: CityData
    }

    
export default class CityCard extends React.Component<{emitter:any,cityId:number},{cityData:CityDataObject,hoverDelete:boolean}> {
  constructor(props:any){
    super(props)
    this.state = {cityData:{} as CityDataObject,hoverDelete:false}
    this.toogleDeleteState = this.toogleDeleteState.bind(this)
  }
  
  convertToDegreCelsius(tempInkalvin:number):string{
    return `${(tempInkalvin - 273.15).toFixed(1)}°`
  }

  toogleDeleteState(){
    this.setState({hoverDelete:!this.state.hoverDelete})
  }

  async componentDidMount(
  )
  {
    const {data :cityData} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather/?cityId=${this.props.cityId}`,{withCredentials:true})
    this.setState({cityData: cityData}) 
  }

  render(){
    const { data:cityData } = this.state.cityData
    console.log(cityData)
    return(
      <>
      {cityData?(
      <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={()=>this.props.emitter.emit("removeCity",cityData.id)} onMouseLeave={this.toogleDeleteState} onMouseEnter={this.toogleDeleteState}>
            {!this.state.hoverDelete?<DeleteIcon />:
            <DeleteForeverIcon />}
          </IconButton>
        }
        title={cityData.name}
        subheader={this.convertToDegreCelsius(cityData.main.temp)}
      />
      <CardContent >
      <img
      style={{width: "100px"}}
        src={process.env.PUBLIC_URL+"assets/cloudy_dark.png"}
      />
      </CardContent>
       <CardContent>
        {this.convertToDegreCelsius(cityData.main.temp)}
        <Typography>
        Feels Like : {this.convertToDegreCelsius(cityData.main.feels_like)}
        </Typography>
        <Typography>
        Min : {this.convertToDegreCelsius(cityData.main.temp_max)}
        </Typography>
        <Typography>
        Max : {this.convertToDegreCelsius(cityData.main.temp_min)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button>see more</Button>
      </CardActions>
    </Card>):null}
    </>
    )
  }
}
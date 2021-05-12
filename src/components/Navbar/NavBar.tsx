import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from "@material-ui/core";
import { withRouter, useHistory  } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import axios from "axios";

function NavBar() {
  const history = useHistory();

  function goHome(){
    history.push("/home")
  }
  async function disconnect(){
    try {
      const {
        data: { csrfToken },
      } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/csrf`, {
        withCredentials: true,
      });
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/user/disconnect`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
          },
          withCredentials: true,
        }
      );
      history.push("/");
    } catch (e) {
      alert(`${e.response?.data.error}`);
    }
  }
    

  return (
  <AppBar position="static">
  <Toolbar>
  <Grid
      justify="space-between"
      container 
    >
    <IconButton onClick={()=>goHome()} edge="start" color="inherit" aria-label="menu">
      <HomeIcon />
    </IconButton>
    <Typography variant="h6" >
      Supweather
    </Typography>
    <Button onClick={disconnect} color="inherit">Disconnect</Button>
    </Grid>
  </Toolbar>
</AppBar>)
}

export default (withRouter as any)(NavBar);


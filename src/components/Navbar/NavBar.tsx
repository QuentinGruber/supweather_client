import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Grid, Switch } from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import axios from "axios";

interface NavBarProps {
  landingMode?: boolean;
  emitter: any;
}

function NavBar(props: NavBarProps) {
  const history = useHistory();
  const [nightTheme, setNightTheme] = useState(
    localStorage.getItem("nightTheme")
      ? localStorage.getItem("nightTheme") === "true"
      : false
  );
  function goHome() {
    history.push("/home");
  }
  async function disconnect() {
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
  const { landingMode } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container>
          {landingMode ? null : (
            <IconButton
              onClick={() => goHome()}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          )}
          <Typography variant="h6">Supweather</Typography>
          <div>
            <>{`${nightTheme ? "Dark" : "Light"} theme`}</>
            <Switch
              checked={nightTheme}
              onChange={() => {
                localStorage.setItem("nightTheme", String(!nightTheme));
                props.emitter.emit("changeTheme", !nightTheme);
                setNightTheme(!nightTheme);
              }}
              color="secondary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {landingMode ? null : (
              <Button onClick={disconnect} color="inherit">
                Disconnect
              </Button>
            )}
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default (withRouter as any)(NavBar);

import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { EventEmitter } from "events";
import "./LandingStyles.css"
import NavBar from "../../components/Navbar/NavBar";
export default class Landing extends React.Component<
  {},
  { displayRegisterForm: boolean }
> {
  _emitter: any;
  constructor(props: any) {
    super(props);
    this._emitter = new EventEmitter();
    this.state = { displayRegisterForm: true };
    this._emitter.on("toogleAuthForm", () => {
      this.setState({ displayRegisterForm: !this.state.displayRegisterForm });
    });
  }
  render() {
    return (
      <div className="Landing">
        <NavBar landingMode={true} emitter={this._emitter} />
        <div className="AuthForm">
        {this.state.displayRegisterForm ? (
          <RegisterForm emitter={this._emitter} />
        ) : (
          <LoginForm emitter={this._emitter} />
        )}
        </div>
      </div>
    );
  }
}

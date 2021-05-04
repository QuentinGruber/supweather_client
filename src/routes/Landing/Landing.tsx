import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { EventEmitter } from "events";
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
        <h1>c'est la landing trop coool</h1>
        {this.state.displayRegisterForm ? (
          <RegisterForm emitter={this._emitter} />
        ) : (
          <LoginForm emitter={this._emitter} />
        )}
      </div>
    );
  }
}

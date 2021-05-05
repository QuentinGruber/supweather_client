import React from "react";
import { EventEmitter } from "events";
import AddCityCard from "../../components/AddCityCard/AddCityCard";
export default class Home extends React.Component<
  {},
  {}
> {
  _emitter: any;
  constructor(props: any) {
    super(props);
    this._emitter = new EventEmitter();
    this.state = { displayRegisterForm: true };
  }
  render() {
    return (
      <div className="Home">
        <AddCityCard /> 
      </div>
    );
  }
}

import React from 'react';


export default class LoginForm extends React.Component<{emitter:any},{}> {
  render(){
    return (
    <div className="LoginForm">
        <p>login</p>
        <button onClick={()=>{this.props.emitter.emit("toogleAuthForm")}}>i want to register</button>
    </div>
  );
    }
}

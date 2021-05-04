import React from 'react';


export default class RegisterForm extends React.Component<{emitter:any},{}> {
  render(){
    return (
    <div className="RegisterForm">
        <p>Register</p>
        <button onClick={()=>{this.props.emitter.emit("toogleAuthForm")}}>i want to login</button>
    </div>
  );
    }
}

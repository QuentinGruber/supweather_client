import React from 'react';
import {
    Formik,
    Form,
    Field,
  }from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
  interface LoginFormValues {
    email: string;
    password?: string;
  }

class LoginForm extends React.Component<{emitter:any},{}> {
    _formDefaultValues:LoginFormValues  
    constructor(props:any){
          super(props)
          this._formDefaultValues = {email:"",password:""}
      }
      async onLoginFormSubmit(values:LoginFormValues,actions:any){
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/sign_in`,values,{withCredentials:true});
            (this.props as any).history.push("/home");
          } catch (e) {
              alert(`${e.response.data.error}`)
          }
      }
  render(){
    return (
    <div className="RegisterForm">
        <p>Login</p>
        <Formik
         initialValues={this._formDefaultValues}
         onSubmit={(values,actions)=>{this.onLoginFormSubmit(values,actions)}}
       >
         <Form>
           <label htmlFor="email">Email</label>
           <Field id="email" name="email" placeholder="JohnDoe@gmail.com" />

           <label htmlFor="password">Password</label>
           <Field id="password" name="password" placeholder="Strong password" />
           <button type="submit">Login</button>
         </Form>
       </Formik>
        <button onClick={()=>{this.props.emitter.emit("toogleAuthForm")}}>i want to register</button>
    </div>
  );
    }
}
export default (withRouter as any)(LoginForm)
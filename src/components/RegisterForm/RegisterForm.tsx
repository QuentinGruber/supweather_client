import React from 'react';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  }from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
  interface RegisterFormValues {
    username: string;
    password?: string;
    email: string;
  }

  interface props {
    emitter:any
  }
class RegisterForm extends React.Component<{emitter:any},{}> {
    _formDefaultValues:RegisterFormValues  
    constructor(props:any){
          super(props)
          this._formDefaultValues = {username:"",email:"",password:""}
      }
      async onRegisterFormSubmit(values:RegisterFormValues,actions:any){
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/sign_up`,values,{withCredentials:true})
          if(response.status === 200){
            (this.props as any).history.push("/home")
          }
          else{
            alert("error while registering, try again in a few minutes...")
          }
      }
  render(){
    return (
    <div className="RegisterForm">
        <p>Register</p>
        <Formik
         initialValues={this._formDefaultValues}
         onSubmit={(values,actions)=>{this.onRegisterFormSubmit(values,actions)}}
       >
         <Form>
           <label htmlFor="username">Username</label>
           <Field id="username" name="username" placeholder="John Doe" />

           <label htmlFor="email">Email</label>
           <Field id="email" name="email" placeholder="JohnDoe@gmail.com" />

           <label htmlFor="password">Password</label>
           <Field id="password" name="password" placeholder="Strong password" />
           <button type="submit">Register</button>
         </Form>
       </Formik>
        <button onClick={()=>{this.props.emitter.emit("toogleAuthForm")}}>i want to login</button>
    </div>
  );
    }
}
export default (withRouter as any)(RegisterForm)
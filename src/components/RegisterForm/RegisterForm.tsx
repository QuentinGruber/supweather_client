import React from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
interface RegisterFormValues {
  username: string;
  password?: string;
  email: string;
}

class RegisterForm extends React.Component<{ emitter: any }, {}> {
  _formDefaultValues: RegisterFormValues;
  constructor(props: any) {
    super(props);
    this._formDefaultValues = { username: "", email: "", password: "" };
  }
  async onRegisterFormSubmit(values: RegisterFormValues, actions: any) {
    try {
      const {
        data: { csrfToken },
      } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/csrf`, {
        withCredentials: true,
      });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/sign_up`,
        values,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
          },
          withCredentials: true,
        }
      );
      (this.props as any).history.push("/home");
    } catch (e) {
      alert(`${e.response?.data.error}`);
    }
  }
  render() {
    return (
      <div className="RegisterForm">
        <p>Register</p>
        <Formik
          initialValues={this._formDefaultValues}
          onSubmit={(values, actions) => {
            this.onRegisterFormSubmit(values, actions);
          }}
        >
          <Form>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" placeholder="John Doe" />

            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="JohnDoe@gmail.com" />

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="Strong password"
            />
            <button type="submit">Register</button>
          </Form>
        </Formik>
        <button
          onClick={() => {
            this.props.emitter.emit("toogleAuthForm");
          }}
        >
          i want to login
        </button>
      </div>
    );
  }
}
export default (withRouter as any)(RegisterForm);

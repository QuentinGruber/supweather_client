import React from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardHeader, InputLabel } from "@material-ui/core";

interface LoginFormValues {
  email: string;
  password?: string;
}

class LoginForm extends React.Component<{ emitter: any }, {}> {
  _formDefaultValues: LoginFormValues;
  constructor(props: any) {
    super(props);
    this._formDefaultValues = { email: "", password: "" };
  }
  async onLoginFormSubmit(values: LoginFormValues, actions: any) {
    try {
      const {
        data: { csrfToken },
      } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/csrf`, {
        withCredentials: true,
      });

      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/sign_in`,
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
      alert(`${e.response.data.error}`);
    }
  }
  render() {
    return (
      <Card className="RegisterForm">
                <div className="Formik">
        <Formik
          initialValues={this._formDefaultValues}
          onSubmit={(values, actions) => {
            this.onLoginFormSubmit(values, actions);
          }}
        >
          <Form>
          <CardHeader title={"Login"} />
          <div className="formField">

            <InputLabel htmlFor="email">Email</InputLabel>
            <Field id="email" name="email" placeholder="JohnDoe@gmail.com" />
            </div>

            <div className="formField">

            <InputLabel htmlFor="password">Password</InputLabel>
            <Field
              id="password"
              name="password"
              placeholder="Strong password"
            />
               </div>
            <Button className="submitButton"
 type="submit" variant="contained" color="primary">Login</Button>
          </Form>
        </Formik>
        </div>

        <Button
        className="submitButton"
        variant="outlined" color="primary"
          onClick={() => {
            this.props.emitter.emit("toogleAuthForm");
          }}
        >
          i want to register
        </Button>
      </Card>
    );
  }
}
export default (withRouter as any)(LoginForm);

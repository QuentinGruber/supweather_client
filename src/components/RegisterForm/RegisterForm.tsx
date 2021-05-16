import React from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardHeader, InputLabel } from "@material-ui/core";
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
      <Card className="RegisterForm">
        <div className="Formik">
          <Formik
            initialValues={this._formDefaultValues}
            onSubmit={(values, actions) => {
              this.onRegisterFormSubmit(values, actions);
            }}
          >
            <Form>
              <CardHeader title={"Register"} />
              <div className="formField">
                <InputLabel htmlFor="username">Username</InputLabel>
                <Field id="username" name="username" placeholder="John Doe" />
              </div>
              <div className="formField">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field
                  id="email"
                  name="email"
                  placeholder="JohnDoe@gmail.com"
                />
              </div>

              <div className="formField">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Field
                  id="password"
                  name="password"
                  placeholder="Strong password"
                />
              </div>

              <Button
                className="submitButton"
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </Form>
          </Formik>
        </div>
        <Button
          className="submitButton"
          onClick={() => {
            this.props.emitter.emit("toogleAuthForm");
          }}
          variant="outlined"
          color="primary"
        >
          i want to login
        </Button>
      </Card>
    );
  }
}
export default (withRouter as any)(RegisterForm);

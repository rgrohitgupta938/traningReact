import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class Login extends Component {
  state = {
    user: { name: "", password: "" },
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.user[input.name] = input.value;
    this.setState(s1);
  };
  async login(url, obj) {
    try {
      let response = await http.post(url, obj);
      let { data } = response;
      auth.login(data);
      console.log(data);
      window.location = data
        ? data.role === "manager"
          ? "/admin"
          : data.role === "customer"
          ? "/customer"
          : "/login"
        : "/login";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        let errors = {};
        errors.error = ex.response.data;
        console.log(errors.error);
        this.setState({ errors: errors });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.login("/login", this.state.user);
  };
  render() {
    const { name, password } = this.state.user;
    const { errors } = this.state;
    return (
      <div className="container">
        <h3 className="text-center">Welcome to GBI Bank</h3>
        <h5 className="text-center">Login</h5>
        {errors && errors.error && (
          <span className="text-danger text-center">
            {errors.error} Check the Name and Password
          </span>
        )}
        <div className="form-group row m-2">
          <div className="col-5"></div>
          <div className="col-1">
            <label>User Name :</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={this.handleChange}
              placeholder="Enter Name"
              value={name}
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-5"></div>
          <div className="col-1">
            <label>Password</label>
          </div>
          <div className="col-6">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Enter Password"
              value={password}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            borderRadius: "0",
          }}
        >
          <button
            className="btn btn-primary fw-bold"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default Login;

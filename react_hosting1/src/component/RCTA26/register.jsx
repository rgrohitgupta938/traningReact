import React, { Component } from "react";
class Register extends Component {
  state = {
    new: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
    repassword: "",
    errors: {},
  };
  render() {
    const { name, role, email, password } = this.state.new;
    const { repassword, errors } = this.state;
    return (
      <div className="container">
        <h3>Register</h3>
        <div className="form-group">
          <label>
            Name<span className="required-asterisk text-danger">*</span>
          </label>
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
        <div className="form-group">
          <label>
            Password<span className="required-asterisk text-danger">*</span>
          </label>
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
        <div className="form-group">
          <label>
            Confirm Password
            <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="repassword"
            name="repassword"
            onChange={this.handleChange}
            placeholder="Re-Enter your password"
            value={repassword}
          />
        </div>
      </div>
    );
  }
}
export default Register;

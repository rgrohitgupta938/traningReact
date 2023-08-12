import React, { Component } from "react";
import http from "../../../services/httpService";
class AddCustomer extends Component {
  state = {
    customer: { name: "", password: "" },
    repassword: "",
    errors: {},
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "repassword") {
      this.setState({ repassword: value });
    } else {
      this.setState((prevState) => ({
        customer: {
          ...prevState.customer,
          [name]: value,
        },
      }));
    }
  };

  async addCust(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Customer Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      let st =
        ex.response && ex.response.status !== 200 ? alert("Error occured") : "";
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { customer } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(customer);
      this.addCust("/register", customer);
      alert("Customer Successfully added");
      this.props.history.push("/admin");
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let { name, password } = this.state.customer;
    let { customer, repassword } = this.state;
    let errors = {};
    errors.name = this.validateName(name);
    errors.password = this.validatePassword(password);
    errors.repassword = this.validateRePassword(repassword, password);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateName = (name) => {
    return !name
      ? "Name must be entered"
      : name.length < 8
      ? "Name should have atleast 8 characters"
      : "";
  };
  validateRePassword = (repassword, password) => {
    return !repassword
      ? "Re-Enter the Password"
      : repassword !== password
      ? "Password Do Not Match"
      : "";
  };
  validatePassword = (password) => {
    let { repassword } = this.state;
    if (!password) {
      return "Password can not be blank.Minimum length should be 7 characters";
    } else if (password.length < 7) {
      return "Password should have at least 7 characters";
    } else {
      let hasLowerCase = false;
      let hasUpperCase = false;
      let hasDigit = false;

      for (let i = 0; i < password.length; i++) {
        const char = password[i];
        if (char >= "a" && char <= "z") {
          hasLowerCase = true;
        } else if (char >= "A" && char <= "Z") {
          hasUpperCase = true;
        } else if (char >= "0" && char <= "9") {
          hasDigit = true;
        }
      }

      if (!hasLowerCase) {
        return "Password must include at least one lowercase letter";
      } else if (!hasUpperCase) {
        return "Password must include at least one uppercase letter";
      } else if (!hasDigit) {
        return "Password must include at least one digit";
      }

      return "";
    }
  };
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "name":
        s1.errors.name = this.validateName(input.value);
        break;
      case "password":
        s1.errors.password = this.validatePassword(input.value);
        break;
      case "repassword":
        s1.errors.repassword = this.validateRePassword(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  render() {
    const { name, password } = this.state.customer;
    const { repassword, errors } = this.state;
    return (
      <div className="container">
        <h4 className="m-2">New Customer</h4>
        <div className="form-group m-2">
          <label className="m-2">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Customer Name"
            value={name}
            onBlur={this.handleValidate}
          />
          {errors && errors.name && (
            <span className="text-danger">{errors.name}</span>
          )}
        </div>
        <div className="form-group m-2">
          <label className="m-2">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={this.handleChange}
            placeholder=""
            value={password}
            onBlur={this.handleValidate}
          />
          {errors && errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <div className="form-group m-2">
          <label className="m-2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="repassword"
            name="repassword"
            onChange={this.handleChange}
            placeholder=""
            value={repassword}
            onBlur={this.handleValidate}
          />
          {errors && errors.repassword && (
            <span className="text-danger">{errors.repassword}</span>
          )}
        </div>
        <button className="btn btn-primary m-2" onClick={this.handleSubmit}>
          Create
        </button>
      </div>
    );
  }
}
export default AddCustomer;

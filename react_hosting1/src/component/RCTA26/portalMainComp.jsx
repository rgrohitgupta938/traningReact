import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import Logout from "./logout";
import Admin from "./admin";
import auth from "../../services/authService";
import Register from "./register";
class PortalMainComp extends Component {
  render() {
    const user = auth.getUser();
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default PortalMainComp;

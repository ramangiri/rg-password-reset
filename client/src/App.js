import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import ForgotPass from "./components/ForgotPass";
import ResetPassword from "./components/ResetPass";
import RegisterUser from "./components/Register";
import UserLogin from "./components/UserLogin";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="container px-0">
        <UserProvider>
          <Switch>
            <Route
              path="/register"
              component={RegisterUser}
              exact={true}
            ></Route>
            <Route path="/dashboard" component={Dashboard} exact={true}></Route>
            <Route
              path="/forgot-password"
              component={ForgotPass}
              exact={true}
            ></Route>
            <Route
              path="/reset-password/:randomstring"
              component={ResetPassword}
              exact={true}
            ></Route>
            <Route path="/" component={UserLogin} exact={true}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;

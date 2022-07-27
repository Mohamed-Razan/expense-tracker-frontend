import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login/Login"
import Register from "./components/signup/Signup";
import Home from "./components/home.component";
import Expense from "./components/expense/Expense";
import User from "./components/user/User";
import Category from "./components/category/Category";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserPage: false,
      showAdminPage: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserPage: user.roles.includes("ROLE_USER") && !user.roles.includes("ROLE_ADMIN"),
        showAdminPage: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showUserPage, showAdminPage } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            Piggy Bank
          </Link>
          <div className="navbar-nav mr-auto">
            {showUserPage && (
              <li className="nav-item">
                <Link to={"/expense"} className="nav-link">
                  Expense
                </Link>
              </li>
            )}

            {showAdminPage && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  User
                </Link>
              </li>
            )}

            {showAdminPage && (
              <li className="nav-item">
                <Link to={"/category"} className="nav-link">
                  Category
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/expense" component={Expense} />
            <Route exact path="/admin" component={User} />
            <Route exact path="/category" component={Category} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import UserRegisterPage from '../pages/UserRegisterPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from "../pages/HomePage";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../components/TopBar";
import UserPage from "../pages/UserPage";
import { useSelector } from "react-redux";
import SaveReportPage from "../pages/SaveReportPage";
import AllUsersPage from "../pages/AllUsersPage";
import AllReportsPage from "../pages/AllReportsPage";

/* alias is used in import. Thus, there is no need to make changes
in the codes below in HashRouter-BrowserRouter transitions. */

/* HashRouter was used instead of BrowserRouter.
BrowserRouter communicates with the backend on every page load. */

const App = () => {

  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn
  }))

  return (
    <div>
      <Router>
        {/* <TopBar isLoggedIn={isLoggedIn} onLogoutSucces={this.onLogoutSucces} username={username} /> */}
        <TopBar />
        <LanguageSelector />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn && <Route path="/login" component={LoginPage} />}
          {/* login page will not open if logged in */}
          {!isLoggedIn && <Route path="/register" component={UserRegisterPage} />}
          {/* register page will not open if logged in */}
          {isLoggedIn && <Route path="/reports/save" component={SaveReportPage} />}
          {isLoggedIn && <Route path="/users/getAllUsers" component={AllUsersPage} />}
          {isLoggedIn && <Route path="/reports/getAllReports" component={AllReportsPage} />}
          <Route path="/users/:username" component={UserPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

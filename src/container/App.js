import React, { useEffect } from 'react';
import UserRegisterPage from '../pages/UserRegisterPage';
import LoginPage from '../pages/LoginPage';
import HomePage from "../pages/HomePage";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../components/TopBar";
import UserPage from "../pages/UserPage";
import { useSelector } from "react-redux";
import SaveReportPage from "../pages/SaveReportPage";
import OtherUsersPage from "../pages/OtherUsersPage";
import AllReportsPage from "../pages/AllReportsPage";
import ReportPage from "../pages/ReportPage";
import { changeLanguage } from '../api/apiCalls';
import Footer from '../components/Footer';
import MyReportsPage from '../pages/MyReportsPage';

/* alias is used in import. Thus, there is no need to make changes
in the codes below in HashRouter-BrowserRouter transitions. */

/* HashRouter was used instead of BrowserRouter.
BrowserRouter communicates with the backend on every page load. */

const App = () => {

  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn
  }))

  useEffect(() => {
    changeLanguage();
  }, []);

  return (
    <div>
      <Router>
        {/* <TopBar isLoggedIn={isLoggedIn} onLogoutSucces={this.onLogoutSucces} username={username} /> */}
        <div style={{ marginBottom: '65px' }}>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={LoginPage} />}
            {/* login page will not open if logged in */}
            {!isLoggedIn && <Route path="/register" component={UserRegisterPage} />}
            {/* register page will not open if logged in */}
            {isLoggedIn && <Route path="/reports/save" component={SaveReportPage} />}
            {isLoggedIn && <Route path="/reports/getMyReports" component={MyReportsPage} />}
            {isLoggedIn && <Route path="/users/getAllUsers" component={OtherUsersPage} />}
            {isLoggedIn && <Route path="/reports/getAllReports" component={AllReportsPage} />}
            {isLoggedIn && <Route path="/reports/:id" component={ReportPage} />}
            {isLoggedIn && <Route path="/users/:username" component={UserPage} />}
            <Redirect to='/' />
          </Switch>
        </div>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;

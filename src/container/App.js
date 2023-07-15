import React from "react";
import UserRegisterPage from '../pages/UserRegisterPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../component/LanguageSelector';
import HomePage from "../pages/HomePage";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../component/TopBar";

/* alias is used in import. Thus, there is no need to make changes
in the codes below in HashRouter-BrowserRouter transitions. */

/* HashRouter was used instead of BrowserRouter.
BrowserRouter communicates with the backend on every page load. */

function App() {
  return (
    <div>
      <Router>
        <TopBar />
        <LanguageSelector />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={UserRegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

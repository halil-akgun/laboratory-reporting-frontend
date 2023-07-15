import React from "react";
import UserRegisterPage from '../pages/UserRegisterPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../component/LanguageSelector';
import HomePage from "../pages/HomePage";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

/* HashRouter was used instead of BrowserRouter.
BrowserRouter communicates with the backend on every page load. */

function App() {
  return (
    <div>
      <HashRouter>
        <LanguageSelector />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={UserRegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Redirect to='/' />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

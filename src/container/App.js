import React from "react";
import UserRegisterPage from '../pages/UserRegisterPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../component/LanguageSelector';
import HomePage from "../pages/HomePage";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../component/TopBar";
import UserPage from "../pages/UserPage";

/* alias is used in import. Thus, there is no need to make changes
in the codes below in HashRouter-BrowserRouter transitions. */

/* HashRouter was used instead of BrowserRouter.
BrowserRouter communicates with the backend on every page load. */

class App extends React.Component {

  state = {
    isLoggedIn: false,
    username: undefined
  }

  onLoginSucces = (username) => {
    this.setState({
      username,
      isLoggedIn: true
    })
  }

  onLogoutSucces = () => {
    this.setState({
      username: undefined,
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <div>
        <Router>
          <TopBar isLoggedIn={isLoggedIn} onLogoutSucces={this.onLogoutSucces} username={username} />
          <LanguageSelector />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/register" component={UserRegisterPage} />}
            {/* register page will not open if logged in */}
            {!isLoggedIn && <Route path="/login" component={props => {
              return <LoginPage {...props} onLoginSucces={this.onLoginSucces} />
            }} />} {/* login page will not open if logged in */}
            <Route path="/user/:username" component={UserPage} />
            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

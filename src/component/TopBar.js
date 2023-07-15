import React, { Component } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { WithTranslation, withTranslation } from 'react-i18next';

/* Link: With 'Link' we don't have to use '#' in links.
If we will use BrowserRouter in the future,
we will not have to update the links. */

class TopBar extends Component {
    render() {
        const { t } = this.props;

        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        {/* <a className="navbar-brand" href="#/"> */}
                        <img src={logo} width='50' alt='logo' />
                        LABORATORY REPORTING APPLICATION
                    </Link>
                    <ul className="navbar-nav ms-auto">
                        <li>
                            <Link className="nav-link" to="/login">
                                {t('Login')}
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/register">
                                {t('Register')}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}


export default withTranslation()(TopBar);
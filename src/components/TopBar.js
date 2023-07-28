import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';

/* Link: With 'Link' we don't have to use '#' in links.
If we will use BrowserRouter in the future,
we will not have to update the links. */

const TopBar = (props) => {

    const { t } = useTranslation();

    const { username, isLoggedIn } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }));

    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    };

    let links = (
        <ul className="navbar-nav ms-auto mb-auto">
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
    )

    if (isLoggedIn) {
        links = (
            <ul className="navbar-nav ms-auto mb-auto">
                <li>
                    <Link className="nav-link" to={`/users/${username}`}>
                        {username}
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/">
                        <span onClick={onLogoutSuccess}>{t('Logout')}</span>
                    </Link>
                </li>
            </ul>
        )
    }

    return (
        <div className="shadow-sm bg-light mb-2">
            <nav className="navbar navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    {/* <a className="navbar-brand" href="#/"> */}
                    <img src={logo} width='35' alt='logo' />
                    LABORATORY REPORTING APPLICATION
                </Link>
                {links}
            </nav>
        </div>
    );
}

export default TopBar;
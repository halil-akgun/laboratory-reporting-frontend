import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault';

/* Link: With 'Link' we don't have to use '#' in links.
If we will use BrowserRouter in the future,
we will not have to update the links. */

const TopBar = (props) => {

    const { t } = useTranslation();

    const { username, isLoggedIn, name, surname, image } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        name: store.name,
        surname: store.surname,
        image: store.image
    }));

    const menuArea = useRef(null);

    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        };
    }, [isLoggedIn]);

    const menuClickTracker = event => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }

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
            <ul className="navbar-nav ms-auto mt-auto">
                <li className='nav-item dropdown'>
                    <div ref={menuArea} className='d-flex' style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                        <ProfileImageWithDefault image={image} width='33' height='33' className='rounded-circle m-auto' />
                        <span className='nav-link ms-2 dropdown-toggle px-0'>{name} {surname}</span>
                    </div>
                    <div className={`dropdown-menu ${menuVisible ? 'show' : ''} p-0 shadow`} style={{ right: 0 }} >
                        <Link className="dropdown-item p-2" to={`/reports/save`}>
                            <i className="fa-solid fa-folder-plus me-2 text-success"></i>
                            {t('Save Report')}
                        </Link>
                        <Link className="dropdown-item p-2" to={`/reports/getMyReports`}>
                            <i className="fa-solid fa-file me-2 pe-1 text-success"></i>
                            {t('My Reports')}
                        </Link>
                        <Link className="dropdown-item p-2" to={`/reports/getAllReports`}>
                            <i className="fa-solid fa-folder me-2 text-success"></i>
                            {t('All Reports')}
                        </Link>
                        <Link className="dropdown-item p-2" to={`/users/getAllUsers`}>
                            <i className="fa-solid fa-user-group me-1 text-success"></i>
                            {t('Other Users')}
                        </Link>
                        <Link className="dropdown-item p-2" to={`/users/${username}`}>
                            <i className="fa-solid fa-user me-2 text-info"></i>
                            {t('My Profile')}
                        </Link>
                        <Link className="dropdown-item p-2" to="/">
                            <i className="fa-solid fa-power-off me-2 text-danger"></i>
                            <span onClick={onLogoutSuccess}>{t('Logout')}</span>
                        </Link>
                    </div>
                </li>
            </ul>
        )
    }

    return (
        <div className="shadow-sm bg-light mb-2">
            <nav className="navbar navbar-light container py-2 px-3 navbar-expand">
                <Link className="navbar-brand" to="/">
                    {/* <a className="navbar-brand" href="#/"> */}
                    <span className='d-flex align-items-center'>
                        <img src={logo} height='36' alt='logo' className='me-2' />
                        LABORATORY
                    </span>
                </Link>
                {links}
            </nav>
        </div>
    );
}

export default TopBar;

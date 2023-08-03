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

        let dropdownClass = 'dropdown-menu p-0 shadow';
        if (menuVisible) {
            dropdownClass += ' show';
        }

        links = (
            <ul className="navbar-nav ms-auto mb-auto">
                <li className='nav-item dropdown'>
                    <div ref={menuArea} className='d-flex' style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                        <ProfileImageWithDefault image={image} width='33' height='33' className='rounded-circle m-auto' />
                        <span className='nav-link dropdown-toggle'>{name} {surname}</span>
                    </div>
                    <div className={dropdownClass}>
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
            <nav className="navbar navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    {/* <a className="navbar-brand" href="#/"> */}
                    <img src={logo} width='35' alt='logo' />
                    LABORATORY
                </Link>
                {links}
            </nav>
        </div>
    );
}

export default TopBar;

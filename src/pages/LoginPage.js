import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from "react-i18next";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/authActions';

const LoginPage = props => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { t } = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined);
    }, [username, password]);
    // The warning message disappears when changing
    // username or password after an invalid login attempt.

    const onClickLogin = async event => {
        event.preventDefault();
        const creds = {
            username,
            password
        }

        const { history } = props;
        const { push } = history;

        setError(undefined);

        try {
            await dispatch(loginHandler(creds))
            push('/'); // redirect after successful login
        } catch (apiError) {
            setError(t('Login failed. Please check your credentials.'));
        }
    };

    const pendingApiCall = useApiProgress('post', "/auth");

    const buttonEnabled = username && password;

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <form>
                        <h1 className="text-center mb-4">{t('Login')}</h1>
                        <Input label={t('Username')} onChange={event => setUsername(event.target.value)} />
                        <Input label={t('Password')} type="password" onChange={event => setPassword(event.target.value)} />
                        {error && <div className="alert alert-danger"> {error} </div>}
                        <br />
                        <div className="text-center">
                            <ButtonWithProgress
                                disabled={!buttonEnabled || pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                onClick={onClickLogin}
                                text={t('Login')}
                            />
                        </div>
                    </form>
                </div>
                <div className='col-md-4'></div>
            </div>

        </div>
    );
}

export default LoginPage;

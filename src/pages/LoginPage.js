import React, { Component } from 'react';
import Input from '../component/input';
import { WithTranslation, withTranslation } from "react-i18next";
import { login } from '../api/apiCalls';
import ButtonWithProgress from '../component/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';

class LoginPage extends Component {

    state = {
        username: null,
        password: null,
        error: null
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        })
    }

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const creds = {
            username,
            password
        }
        this.setState({
            error: null
        })
        try {
            await login(creds)
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }
    }

    render() {
        const { t, pendingApiCall } = this.props;
        const { error, username, password } = this.state;

        const buttonEnabled = username && password;

        return (
            <div className='container'>
                <frorm>
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input label={t('Username')} name="username" onChange={this.onChange} />
                    <Input label={t('Password')} name="password" type="password" onChange={this.onChange} />
                    {error && <div className="alert alert-danger"> {this.state.error} </div>}
                    <br />
                    <div className="text-center">
                        <ButtonWithProgress
                            disabled={!buttonEnabled || pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            onClick={this.onClickLogin}
                            text={t('Login')}
                        />
                    </div>
                </frorm>
            </div>
        );
    }
}


const LoginPageWithTranslation = withTranslation()(LoginPage);

export default withApiProgress(LoginPageWithTranslation, '/auth');
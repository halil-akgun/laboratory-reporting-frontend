import React from "react";
import { register } from '../api/apiCalls';
import Input from "../component/input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from '../component/ButtonWithProgress';
import { withApiProgress } from "../shared/ApiProgress";

class UserRegisterPage extends React.Component {

    state = {
        name: null,
        surname: null,
        username: null,
        hospitalIdNumber: null,
        password: null,
        passwordRepeat: null,
        agreedClicked: false,
        errors: {}
    };

    onChange = event => {
        // const name = event.target.name;
        // const value = event.target.value;

        const { t } = this.props;
        const { name, value } = event.target;
        const errors = { ...this.state.errors }
        errors[name] = undefined

        if (name === "password" || name === "passwordRepeat") {
            if (name === "password" && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t("Password mismatch.");
            } else if (name === "passwordRepeat" && value !== this.state.password) {
                errors.passwordRepeat = t("Password mismatch.");
            } else errors.passwordRepeat = undefined;
        }

        this.setState({
            [name]: value,
            errors // short version of errors: errors
        })
    }

    onChangeAgree = event => {
        this.state.agreedClicked = event.target.checked;
        this.setState({
            agreedClicked: event.target.checked
        });
    };

    onClickRegister = event => {
        event.preventDefault();
        // The browser's automatic sending of form content is blocked.
        // The content should be taken from the state, not the form.

        const { username, name, surname, hospitalIdNumber, password } = this.state;

        const body = {
            // username: username,
            // If the variable names of key and value are the same, it is sufficient to write one of them.
            username,
            name,
            surname,
            hospitalIdNumber,
            password
        };

        register(body)
            .then(response => {
            }) // then/catch is used because axios.post works asynchronously. "await" could also be used.
            .catch(error => {
                if (error.response.data.validationErrors) {
                    this.setState({ errors: error.response.data.validationErrors })
                }
            });
    }


    render() {
        const { errors, agreedClicked } = this.state;
        const { username, name, surname, hospitalIdNumber, password, passwordRepeat } = errors;
        const { pendingApiCall, t } = this.props;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Register')}</h1>

                    <Input name="name" label={t('Name')} error={name} onChange={this.onChange} />
                    <Input name="surname" label={t('Surname')} error={surname} onChange={this.onChange} />
                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange} />
                    <Input name="hospitalIdNumber" label={t('Hospital ID Number')} error={hospitalIdNumber} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password" />

                    <input type="checkbox" onChange={this.onChangeAgree} /> {t('I accept the accuracy of the above information.')}
                    <br />
                    <br />
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickRegister}
                            disabled={!agreedClicked || pendingApiCall || passwordRepeat !== undefined}
                            pendingApiCall={pendingApiCall}
                            text={t('Register')}
                        />
                    </div>
                </form>
            </div>
        )
    }
}


const UserRegisterPageWithApiProgress = withApiProgress(UserRegisterPage, "/assistants/save");
const UserRegisterPageWithTranslation = withTranslation()(UserRegisterPageWithApiProgress);

export default UserRegisterPageWithTranslation;
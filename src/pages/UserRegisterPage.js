import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { registerHandler } from "../redux/authActions";

const UserRegisterPage = props => {

    const [form, setForm] = useState({
        name: null,
        surname: null,
        username: null,
        hospitalIdNumber: null,
        password: null,
        passwordRepeat: null,
    })
    const [agreedClicked, setAgreedClicked] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const onChange = event => {

        const { name, value } = event.target;

        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    }

    const onChangeAgree = event => {
        setAgreedClicked(event.target.checked);
    };

    const onClickRegister = async event => {
        event.preventDefault();
        // The browser's automatic sending of form content is blocked.
        // The content should be taken from the state, not the form.

        const { history } = props;
        const { push } = history;
        const { username, name, surname, hospitalIdNumber, password } = form;

        const body = {
            // username: username,
            // If the variable names of key and value are the same, it is sufficient to write one of them.
            username,
            name,
            surname,
            hospitalIdNumber,
            password
        };

        try {
            await dispatch(registerHandler(body));
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        } // "await" is used because axios.post works asynchronously. "then/catch" could also be used.
    }

    const { t } = useTranslation();

    const { username: usernameError, name: nameError, surname: surnameError, hospitalIdNumber: hospitalIdNumberError, password: passwordError } = errors;
    const pendingApiCallRegister = useApiProgress('post', "/users/save");
    const pendingApiCallLogin = useApiProgress("'post', /auth");

    const pendingApiCall = pendingApiCallLogin || pendingApiCallRegister;

    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t("Password mismatch.");
    }

    return (
        <div className="container mt-4">
            <form>
                <h1 className="text-center mb-4">{t('Register')}</h1>

                <Input name="name" label={t('Name')} error={nameError} onChange={onChange} />
                <Input name="surname" label={t('Surname')} error={surnameError} onChange={onChange} />
                <Input name="username" label={t('Username')} error={usernameError} onChange={onChange} />
                <Input name="hospitalIdNumber" label={t('Hospital ID Number')} error={hospitalIdNumberError} onChange={onChange} />
                <Input name="password" label={t('Password')} error={passwordError} onChange={onChange} type="password" />
                <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeatError} onChange={onChange} type="password" />

                <input type="checkbox" onChange={onChangeAgree} /> {t('I accept the accuracy of the above information.')}
                <br />
                <br />
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickRegister}
                        disabled={!agreedClicked || pendingApiCall || passwordRepeatError !== undefined}
                        pendingApiCall={pendingApiCall}
                        text={t('Register')}
                    />
                </div>
            </form>
        </div>
    )
}

export default UserRegisterPage;
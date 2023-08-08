import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess } from '../redux/authActions';

const ProfileCard = props => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedSurname, setUpdatedSurname] = useState("");
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedHospitalIdNumber, setUpdatedHospitalIdNumber] = useState("");
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => {
            const updatedErrors = { ...previousValidationErrors };

            if (updatedName) {
                delete updatedErrors['name'];
            }
            if (updatedSurname) {
                delete updatedErrors['surname'];
            }
            if (updatedUsername) {
                delete updatedErrors['username'];
            }
            if (updatedHospitalIdNumber) {
                delete updatedErrors['hospitalIdNumber'];
            }
            if (newImage) {
                delete updatedErrors['image'];
            }
            return updatedErrors;
        });
    }, [updatedName, updatedSurname, updatedUsername, updatedHospitalIdNumber, newImage])

    const { username, name, surname, hospitalIdNumber, image } = user;
    const { t } = useTranslation();

    useEffect(() => {
        if (!inEditMode) {
            setNewImage(undefined);
            setUpdatedName(undefined);
            setUpdatedSurname(undefined);
            setUpdatedUsername(undefined);
            setUpdatedHospitalIdNumber(undefined);
        } else {
            setUpdatedName(name);
            setUpdatedSurname(surname);
            setUpdatedUsername(username);
            setUpdatedHospitalIdNumber(hospitalIdNumber);
        }
    }, [inEditMode, username, name, surname, hospitalIdNumber])

    const onClickSave = async () => {
        let imageTemp;
        if (newImage) {
            imageTemp = newImage.split(',')[1];
        }

        const body = {
            image: imageTemp,
            name: updatedName,
            surname: updatedSurname,
            username: updatedUsername,
            hospitalIdNumber: updatedHospitalIdNumber,
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data.object);
            dispatch(updateSuccess(response.data.object));
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        }
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const pendingApiCall = useApiProgress('put', '/users/' + username);

    const { name: nameError, surname: surnameError, username: usernameError, hospitalIdNumber: hospitalIdNumberError, image: imageError } = validationErrors;

    return (
        <div className='row'>
            <div className='col-md-2 col-lg-3'></div>
            <div className='col-md-8 col-lg-6'>
                <div className='card text-center'>
                    <div className='card-header'>
                        <ProfileImageWithDefault
                            className='rounded-circle shadow'
                            width="200"
                            height="200"
                            image={image}
                            tempimage={newImage}
                        />
                    </div>
                    <div className='card-body'>
                        {!inEditMode &&
                            <> <span className='fs-5 ps-2'>
                                {name} {surname}
                            </span><br />
                                <span className='fs-6 ps-2'>
                                    @{username}
                                </span><br />
                                <span className='fs-6 ps-2'>
                                    {hospitalIdNumber}
                                </span></>}
                        {inEditMode && (
                            <div>
                                <Input
                                    label={t('Name')}
                                    name="name"
                                    defaultValue={name}
                                    onChange={event => { setUpdatedName(event.target.value); }}
                                    error={nameError} />
                                <Input
                                    name="surname"
                                    label={t('Surname')}
                                    defaultValue={surname}
                                    onChange={(event) => { setUpdatedSurname(event.target.value) }}
                                    error={surnameError} />
                                <Input
                                    name="username"
                                    label={t('Username')}
                                    defaultValue={username}
                                    onChange={(event) => { setUpdatedUsername(event.target.value) }}
                                    error={usernameError} />
                                <Input
                                    name="hospitalIdNumber"
                                    label={t('Hospital ID Number')}
                                    defaultValue={hospitalIdNumber}
                                    onChange={(event) => { setUpdatedHospitalIdNumber(event.target.value) }}
                                    error={hospitalIdNumberError} />
                                <Input
                                    label={t('Choose A Profile Picture')}
                                    type='file'
                                    onChange={onChangeFile}
                                    error={imageError} />
                            </div>
                        )}
                    </div>
                </div>
                {inEditMode &&
                    <div className='text-center mt-3 mb-3'>
                        <ButtonWithProgress
                            className='btn btn-primary'
                            onClick={onClickSave}
                            disabled={pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={
                                <>
                                    <i className="ms-2 me-2 fa-solid fa-floppy-disk fa-sm"></i>
                                    {t("Save")}
                                </>
                            }
                        />
                        <button
                            className='btn btn-light ms-2'
                            onClick={() => setInEditMode(false)}
                            disabled={pendingApiCall}>
                            <i className="me-2 fa-solid fa-xmark fa-sm"></i>
                            {t("Cancel")}
                        </button>
                    </div>}
                {!inEditMode &&
                    <div className='text-center mt-3 mb-3'>
                        {editable && <button className='btn btn-success' onClick={() => setInEditMode(true)}>
                            <i className="me-2 fa-sharp fa-solid fa-pen fa-sm"></i>
                            {t("Edit")}
                        </button>}
                    </div>}
            </div>
            <div className='col-md-2 col-lg-3'></div>
        </div>
    );
};

export default ProfileCard;



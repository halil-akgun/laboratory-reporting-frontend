import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';

const ProfileCard = props => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedSurname, setUpdatedSurname] = useState("");
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedHospitalIdNumber, setUpdatedHospitalIdNumber] = useState("");
    const [updatedPassword, setUpdatedPassword] = useState("");
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();

    const { user } = props;
    const { username, name, surname, hospitalIdNumber, image } = user;
    const { t } = useTranslation();

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedName(undefined);
            setUpdatedSurname(undefined);
            setUpdatedUsername(undefined);
            setUpdatedHospitalIdNumber(undefined);
            setUpdatedPassword(undefined);
        } else {
            setUpdatedName(name);
            setUpdatedSurname(surname);
            setUpdatedUsername(username);
            setUpdatedHospitalIdNumber(hospitalIdNumber);
            setUpdatedPassword(undefined);
        }
    }, [inEditMode])

    const onClickSave = () => {
        console.log(updatedName, updatedSurname, updatedUsername, updatedHospitalIdNumber, updatedPassword);
    }


    const pathUsername = routeParams.username;
    let message = 'we cannot edit';
    if (pathUsername === loggedInUsername) {
        message = 'we can edit';
    }

    return (
        <div>
            <div className='card text-center'>
                <div className='card-header'>
                    <ProfileImageWithDefault
                        className='rounded-circle shadow'
                        width="200"
                        height="200"
                        image={image} />
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
                            <Input label={t('Name')} defaultValue={name} onChange={event => { setUpdatedName(event.target.value); }} />
                            <Input name="surname" label={t('Surname')} defaultValue={surname} onChange={(event) => { setUpdatedSurname(event.target.value) }} />
                            <Input name="username" label={t('Username')} defaultValue={username} onChange={(event) => { setUpdatedUsername(event.target.value) }} />
                            <Input name="hospitalIdNumber" label={t('Hospital ID Number')} defaultValue={hospitalIdNumber} onChange={(event) => { setUpdatedHospitalIdNumber(event.target.value) }} />
                            <Input name="password" label={t('Password')} type="password" onChange={(event) => { setUpdatedPassword(event.target.value) }} />
                            <Input name="passwordRepeat" label={t('Password Repeat')} type="password" />
                            <br />
                            <div>
                                <button className='btn btn-primary me-2' onClick={onClickSave}>
                                    <i class="me-2 fa-solid fa-floppy-disk fa-sm"></i>
                                    {t("Save")}
                                </button>
                                <button className='btn btn-light' onClick={() => setInEditMode(false)}>
                                    <i class="me-2 fa-solid fa-xmark fa-sm"></i>
                                    {t("Cancel")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {!inEditMode &&
                <div className='text-center mt-3'>
                    <button className='btn btn-success' onClick={() => setInEditMode(true)}>
                        <i className="me-2 fa-sharp fa-solid fa-pen fa-sm"></i>
                        {t("Edit")}
                    </button>
                </div>}
        </div>
    );
};

export default ProfileCard;



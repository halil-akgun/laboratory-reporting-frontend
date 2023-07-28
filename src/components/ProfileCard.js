import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

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

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername])

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
        const body = {
            image: newImage,
            name: updatedName,
            surname: updatedSurname,
            username: updatedUsername,
            hospitalIdNumber: updatedHospitalIdNumber,
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data.object);
        } catch (error) {
            console.log(username);
            console.log(body);
            console.log("Error while updating user:", error);
        }
    }

    const onChangeFile = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const pendingApiCall = useApiProgress('put', '/users/' + username);

    return (
        <div>
            <div className='card text-center'>
                <div className='card-header'>
                    <ProfileImageWithDefault
                        className='rounded-circle shadow'
                        width="200"
                        height="200"
                        image={image}
                        tempImage={newImage}
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
                            <Input label={t('Name')} defaultValue={name} onChange={event => { setUpdatedName(event.target.value); }} />
                            <Input name="surname" label={t('Surname')} defaultValue={surname} onChange={(event) => { setUpdatedSurname(event.target.value) }} />
                            <Input name="username" label={t('Username')} defaultValue={username} onChange={(event) => { setUpdatedUsername(event.target.value) }} />
                            <Input name="hospitalIdNumber" label={t('Hospital ID Number')} defaultValue={hospitalIdNumber} onChange={(event) => { setUpdatedHospitalIdNumber(event.target.value) }} />
                            <br />
                            <input type='file' onChange={onChangeFile} />
                            <div>
                                <ButtonWithProgress
                                    className='btn btn-primary'
                                    onClick={onClickSave}
                                    disabled={pendingApiCall}
                                    pendingApiCall={pendingApiCall}
                                    text={
                                        <>
                                            <i className="me-2 fa-solid fa-floppy-disk fa-sm"></i>
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {!inEditMode &&
                <div className='text-center mt-3'>
                    {editable && <button className='btn btn-success' onClick={() => setInEditMode(true)}>
                        <i className="me-2 fa-sharp fa-solid fa-pen fa-sm"></i>
                        {t("Edit")}
                    </button>}
                </div>}
        </div>
    );
};

export default ProfileCard;



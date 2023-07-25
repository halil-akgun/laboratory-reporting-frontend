import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';

const ProfileCard = props => {

    const [inEditMode, setInEditMode] = useState(false);
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }))
    const routeParams = useParams();

    const { t } = useTranslation();

    const { user } = props;
    const { username, name, surname, hospitalIdNumber, image } = user;

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
                            <Input label='Change' />
                            <div>
                                <button className='btn btn-primary me-2'>
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

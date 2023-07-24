import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import defaultPicture from '../assets/profile.png'

const ProfileCard = props => {

    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }))
    const routeParams = useParams();

    const { user } = props;
    const { username, name, surname, hospitalIdNumber, image } = user;

    const pathUsername = routeParams.username;
    let message = 'we cannot edit';
    if (pathUsername === loggedInUsername) {
        message = 'we can edit';
    }

    let imageSource = defaultPicture;
    if (image) {
        imageSource = image;
    }

    return (
        <div className='card text-center'>
            <div className='card-header'>
                <img
                    className='rounded-circle shadow'
                    width="200"
                    alt={`${username}'s profile picture`} src={imageSource} />
            </div>
            <div className='card-body'>
                <span className='fs-5 ps-2'>
                    {name} {surname}
                </span><br />
                <span className='fs-6 ps-2'>
                    {username}
                </span>
            </div>
        </div>
    );
};

export default ProfileCard;

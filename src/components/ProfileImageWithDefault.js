import React from 'react';
import defaultPicture from '../assets/profile.png'

const ProfileImageWithDefault = (props) => {

    const { image } = props;
    let imageSource = defaultPicture;
    if (image) {
        imageSource = image;
    }

    return (
        <img
            {...props}
            alt={`profile picture`} src={imageSource} />
    );
};

export default ProfileImageWithDefault;

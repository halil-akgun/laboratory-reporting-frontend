import React from 'react';
import defaultPicture from '../assets/no-image.jpg'

const ReportImageWithDefault = (props) => {

    const { image, tempimage } = props;
    let imageSource = defaultPicture;
    if (image) {
        imageSource = 'images/report/' + image;
    }

    return (
        <img
            alt={`report picture`}
            src={tempimage || imageSource}
            width={ !(tempimage || image) && "50px"}
            {...props}
            onError={event => event.target.src = defaultPicture}
        />
    );
};

export default ReportImageWithDefault;
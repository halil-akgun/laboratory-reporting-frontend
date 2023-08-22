import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/modal.js';
import React from 'react';
import defaultPicture from '../assets/no-image.jpg'

const ReportImageWithDefault = (props) => {

    const { image, tempimage } = props;
    let imageSource = defaultPicture;
    if (image) {
        imageSource = 'images/report/' + image;
    }

    return (
        <div className='text-center'>
            <img
                style={{ cursor: 'zoom-in' }}
                data-bs-target='#image'
                data-bs-toggle='modal'
                alt={`report`}
                src={tempimage || imageSource}
                {...props}
                onError={event => event.target.src = defaultPicture}
            />

            <div className='modal fade' id='image' tabIndex={-1} aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <img src={tempimage || imageSource} className='w-100' alt={`report`} />
                </div>
            </div>
        </div>

    );
};

export default ReportImageWithDefault;
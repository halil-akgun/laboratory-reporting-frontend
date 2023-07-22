import React from 'react';
import defaultPicture from '../assets/profile.png'
import { Link } from 'react-router-dom';

const UserListItem = (props) => {

    const { user } = props;
    const { username, name, surname, image } = user;
    let imageSource = defaultPicture;
    if (image) {
        imageSource = image;
    }

    return (
        <Link to={`/users/${username}`} className='list-group-item list-group-item-action' >
            <table>
                <tr>
                    <td>
                        <img
                            className='rounded-circle'
                            width="55"
                            alt={`${username}'s profile picture`} src={imageSource} />
                    </td>
                    <td>
                        <span className='fs-5 ps-2'>
                            {name} {surname}
                        </span><br />
                        <span className='fs-6 ps-2'>
                            {username}
                        </span>
                    </td>
                </tr>
            </table>
        </Link>
    );
};

export default UserListItem;
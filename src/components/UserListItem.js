import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const UserListItem = (props) => {

    const { user } = props;
    const { username, name, surname, image } = user;

    return (
        <Link to={`/users/${username}`} className='list-group-item list-group-item-action' >
            <table>
                <tr>
                    <td>
                        <ProfileImageWithDefault
                            className='rounded-circle'
                            width="55"
                            height="55"
                            image={image} />
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
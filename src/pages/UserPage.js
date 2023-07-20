import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const UserPage = props => {

    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }))
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    let message = 'we cannot edit';
    if (pathUsername === loggedInUsername) {
        message = 'we can edit';
    }

    return (
        <div className='container'>
            {message}
        </div>
    );
};

export default UserPage;

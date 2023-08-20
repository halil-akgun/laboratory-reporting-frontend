import React from 'react';
import UserList from '../components/UserList';

const OtherUsersPage = () => {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-2 col-lg-3'></div>
                <div className='col-md-8 col-lg-6'>
                    <UserList />
                </div>
                <div className='col-md-2 col-lg-3'></div>
            </div>
        </div>
    );
};

export default OtherUsersPage;
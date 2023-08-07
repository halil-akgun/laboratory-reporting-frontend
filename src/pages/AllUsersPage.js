import React from 'react';
import UserList from '../components/UserList';

const AllUsersPage = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <UserList />
                </div>
                <div className='col-md-2'></div>
            </div>
        </div>
    );
};

export default AllUsersPage;
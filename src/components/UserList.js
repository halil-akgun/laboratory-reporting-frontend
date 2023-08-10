import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useSelector } from 'react-redux';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';

const UserList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 5,
        number: 0
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const { username, password } = useSelector(store => ({
        username: store.username,
        password: store.password
    }));

    const pendingApiCall = useApiProgress('get', '/users/getAllUsers?page');

    useEffect(() => {
        loadUsers();
    }, [])

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    };

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    };

    const loadUsers = async pageNumber => {
        setLoadFailure(false);
        try {
            const response = await getUsers(pageNumber, page.size, username, password);
            setPage(response.data);
        } catch {
            setLoadFailure(true);
        }
    };

    const { t } = useTranslation();
    const { content: users, first, last } = page;
    let actionDiv = (
        <div>
            {first === false && (<button className='btn btn-sm btn-light' onClick={onClickPrevious}>{t("Previous")}</button>)}
            {last === false && (<button className='btn btn-sm btn-light float-end' onClick={onClickNext}>{t("Next")}</button>)}
        </div>
    );
    if (pendingApiCall) {
        actionDiv = (
            <Spinner />
        );
    };
    return (
        <div className='card mt-4'>
            <h3 className='card-header text-center'>
                {t("Users")}
            </h3>
            <div className='list-group list-group-flush'>
                {
                    users.map(user => (
                        <UserListItem key={user.username} user={user} />
                    )
                    )
                }
            </div>
            {actionDiv}
            {loadFailure && <div className='text-center text-danger'>{t('Load Failure')}</div>}
        </div>
    );
}

export default UserList;


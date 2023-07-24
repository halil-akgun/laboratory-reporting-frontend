import React, { useState, useEffect } from 'react';
import ProfileCard from '../component/ProfileCard';
import { getUser } from '../api/apiCalls'
import { useTranslation } from 'react-i18next';


const UserPage = props => {

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    const { username } = props.match.params;
    const { t } = useTranslation();


    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
                setNotFound(false);
            } catch (error) {
                setNotFound(true);
            }
        }
        loadUser();
    }, [username]);
    /* useEffect runs whenever username is changed */

    if (notFound) {
        return (
            <div className='container'>
                <div className="text-center alert alert-danger" role="alert">
                    <div className='mb-3 mt-2'>
                        <i className="fa-solid fa-circle-exclamation fa-2xl" style={{ color: '#9f2325' }}></i>
                    </div>
                    {t("User not found.")}
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <ProfileCard user={user} />
        </div>
    );
};

export default UserPage;

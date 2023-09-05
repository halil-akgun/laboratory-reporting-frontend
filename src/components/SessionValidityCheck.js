import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import Modal from './Model';
import { useTranslation } from 'react-i18next';
import { checkSessionValidity } from '../api/apiCalls';

const SessionValidityCheck = () => {
  const [isOpen, setOpen] = useState(false);
  const [isSessionActive, setSessionActive] = useState(1);
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));

  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };


  useEffect(() => {
    let intervalId;

    if (isLoggedIn) {
      const checkValidity = async () => {
        const response = await checkSessionValidity();
        setSessionActive(response.data.isSessionActive);
      };

      intervalId = setInterval(() => {
        checkValidity();
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

  }, [isLoggedIn]);

  useEffect(() => {

    if (!isSessionActive) {
      onLogoutSuccess();
      setOpen(true);
      setSessionActive(true);
    }

  }, [isSessionActive]);


  // handle close popup
  const handleClose = () => {
    setOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title={t('Your session has expired.')}
      onClickOk={handleClose}
      visible={isOpen}
      showCancelButton={false}
      message={
        <div>
          {t("Your session has expired because it has expired or a new session has been opened.")}
        </div>
      }
    />
  );
};

export default SessionValidityCheck;

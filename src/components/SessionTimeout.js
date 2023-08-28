import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import Modal from './Model';
import { useTranslation } from 'react-i18next';

const SessionTimeout = () => {
  const [events] = useState(['click', 'load', 'scroll']);
  const [second, setSecond] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();
  const { isLoggedIn: isAuthenticated } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));

  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let timeStamp = useRef();
  let warningInactiveInterval = useRef();
  let startTimerInterval = useRef();

  // warning timer
  let warningInactive = useCallback((timeString) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(() => {
      const maxTime = 2;
      const popTimeInSeconds = 30;

      const currentTime = new Date();
      const storedTime = new Date(timeString);
      const timeDiff = currentTime - storedTime;

      const secondsPassed = Math.floor(timeDiff / 1000);

      if ((maxTime * 60) - secondsPassed <= popTimeInSeconds) {
        setSecond((maxTime * 60) - secondsPassed);
        setOpen(true);
      }

      if (secondsPassed >= (maxTime * 60)) {
        clearInterval(warningInactiveInterval.current);
        // setOpen(false);
        localStorage.removeItem('lastTimeStamp');
        onLogoutSuccess();
      }
    }, 1000);
  }, [isAuthenticated]);


  // start inactive check
  let timeChecker = useCallback(() => {
    startTimerInterval.current = setTimeout(() => {
      let storedTimeStamp = localStorage.getItem('lastTimeStamp');
      warningInactive(storedTimeStamp);
    }, 60000);
  }, [warningInactive]);


  // reset interval timer
  const resetTimer = useCallback(() => {
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);

    if (isAuthenticated) {
      timeStamp.current = new Date().toISOString();
      localStorage.setItem('lastTimeStamp', timeStamp.current);
    } else {
      clearInterval(warningInactiveInterval.current);
      localStorage.removeItem('lastTimeStamp');
    }
    if (isAuthenticated) {
      timeChecker();
    }
    setOpen(false);
  }, [isAuthenticated, timeChecker, onLogoutSuccess]);


  useEffect(() => {
    if (isAuthenticated) {
      resetTimer();
    }
  }, [isAuthenticated]);


  // handle close popup
  const handleClose = () => {
    setOpen(false);
    resetTimer();
  };
  const handleCloseAfterLoggedOut = () => {
    setOpen(false);
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    if (isAuthenticated) {
      timeChecker();
    }

    return () => {
      clearTimeout(startTimerInterval.current);
    };
  }, [resetTimer, events, timeChecker, isAuthenticated]);


  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title={isAuthenticated ?
        t('Your session is about to expire!')
        :
        t("Your session has expired.")
      }
      onClickOk={isAuthenticated ? onLogoutSuccess : handleCloseAfterLoggedOut}
      okButton={isAuthenticated ?
        t('Log out now.')
        :
        t("OK")
      }
      countdown={isAuthenticated && second}
      onClickCancel={handleClose}
      visible={isOpen}
      showCancelButton={isAuthenticated}
      message={
        <div>
          <strong>
            {isAuthenticated ?
              t("Your session is about to expire. You'll be automatically signed out.")
              :
              t("Your session has been automatically logged out due to inactivity for 2 minutes.")
            }
          </strong>
        </div>
      }
    />
  );
};

export default SessionTimeout;


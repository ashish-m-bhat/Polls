'use client';
import React from 'react'
import Button from '../UI/Button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { fetchUserInfo } from '@/utils/helper';
import styles from '../../styles/ListPolls.module.css';

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserDetails: React.Dispatch<any>;
};

function SignIn({ isLoggedIn, setIsLoggedIn, setUserDetails }: Props) {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoggedIn(true);
      const userInfo = await fetchUserInfo(tokenResponse.access_token);
      setUserDetails(userInfo);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const signBtnHandler = () => {
    if (isLoggedIn)   {
      setIsLoggedIn(false);
      setUserDetails(null);
      googleLogout();
    } else {
      googleLogin();
    }
  };

  return (
    <div  className={styles.login__section}>
      {!isLoggedIn && <Button onClick={signBtnHandler} className={styles.login__btn} >Login</Button>}
    </div>
  )
}

export default SignIn
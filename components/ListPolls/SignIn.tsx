'use client';
import React from 'react'
import Button from '../UI/Button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { fetchUserInfo } from '@/utils/helper';
import styles from '../../styles/ListPolls.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import { logIn, logOut, setUserInfo } from '@/store/auth-slice';
import { User } from '@/utils/types';


function SignIn() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);


  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      dispatch(logIn());
      try {
        const { data } = await fetchUserInfo(access_token);
        const userInfo: User = {
          email: data.email,
          name: data.name,
          accessToken: access_token,
          picture: data.picture,
          isLoggedIn
        };
        dispatch(setUserInfo(userInfo))
      } catch (error) {
        dispatch(logOut());
        alert('Something went wrong, please try again.')
      }

    },
    onError: errorResponse => console.log(errorResponse),
  });

  const signBtnHandler = () => {
    if (isLoggedIn) {
      dispatch(logOut());
      googleLogout();
    } else {
      googleLogin();
    }
  };

  return (
    <div className={styles.login__section}>
      {!isLoggedIn && <Button onClick={signBtnHandler} className={styles.login__btn} >Login</Button>}
    </div>
  )
}

export default SignIn
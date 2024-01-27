'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Poll } from '@/utils/types';
import { ListPolls } from '..';
import Button from '../UI/Button';
import styles from '../../styles/ListPolls.module.css';
import SignIn from '../ListPolls/SignIn';
import { Provider } from 'react-redux';
import { store, useAppSelector } from '@/store';

function HomePageWrapper({ pollsList }: { pollsList: Poll[] }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <Provider store={store}>
                <Home pollsList={pollsList} />
            </Provider>
        </GoogleOAuthProvider>

    )
}
function Home({ pollsList }: { pollsList: Poll[] }) {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const createPollHandler = () => {
        if (isLoggedIn) router.push('/create-poll');
        else alert('You have to login to create a poll');
    };

    return (
        <div className={styles.homepage}>
            <SignIn />
            <Button onClick={createPollHandler}>
                Create Poll
            </Button>
            <ListPolls pollsList={pollsList} />
        </div>
    )
}
export default HomePageWrapper;
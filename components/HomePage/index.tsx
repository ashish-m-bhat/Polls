'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Poll } from '@/utils/types';
import { ListPolls } from '..';
import Button from '../UI/Button';
import styles from '../../styles/ListPolls.module.css';
import SignIn from '../ListPolls/SignIn';
import { useAppSelector } from '@/store';
import { storeWrapper } from '../StoreWrapper';

function HomePage({ pollsList }: { pollsList: Poll[] }) {
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
    );
}

export default storeWrapper(HomePage);
'use client';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Poll } from '@/utils/types';
import Button from '../UI/Button';
import { useRouter } from 'next/navigation';
import styles from '../../styles/ListPolls.module.css';
import DisplayPoll from './DisplayPoll';
import SignIn from './SignIn';


function ListPolls({ pollsList }: { pollsList: Poll[] }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState<any>(null);
    const router = useRouter();

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <div className={styles.homepage}>
                <SignIn
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserDetails={setUserDetails}
                />
                <Button onClick={() => router.push('/create-poll')}>
                    Create Poll
                </Button>

                <div className={styles.polls}>
                    {
                        pollsList.map((poll, index) => {
                            if (!poll.isActive) return <></>;
                            return (
                                <DisplayPoll poll={poll} index={index} key={poll.id} />
                            );
                        })
                    }
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default ListPolls;

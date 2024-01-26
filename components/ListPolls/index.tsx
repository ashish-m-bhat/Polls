'use client';
import React from 'react';
import { Poll } from '@/utils/types';
import Button from '../UI/Button';
import { useRouter } from 'next/navigation';
import styles from '../../styles/ListPolls.module.css';
import DisplayPoll from './DisplayPoll';


function ListPolls({ pollsList }: { pollsList: Poll[] }) {
    const router = useRouter();
    return (
        <div className={styles.homepage}>
            <Button onClick={() => router.push('/create-poll')}>
                Create Poll
            </Button>

            <div className={styles.polls}>
                {
                    pollsList.map((poll, index) => {
                        if (!poll.isActive) return <></>;
                        return (
                            <DisplayPoll poll={poll} index={index} key={poll.pollId} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ListPolls;

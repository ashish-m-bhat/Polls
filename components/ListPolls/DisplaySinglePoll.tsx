'use client';
import React from 'react'
import DisplayPoll from '@/components/ListPolls/DisplayPoll'
import { Poll } from '@/utils/types';
import { storeWrapper } from '@/components/StoreWrapper';
import styles from '../../styles/ListPolls.module.css';
import SignIn from './SignIn';

function DisplaySinglePoll({ pollData }: { pollData: Poll }) {
    return (
        <div className={styles['display-single-poll']}>
            <SignIn />
            <DisplayPoll poll={pollData} />
        </div >
    )
}

export default storeWrapper(DisplaySinglePoll);
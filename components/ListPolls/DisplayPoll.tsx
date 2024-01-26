import React from 'react';
import styles from '../../styles/ListPolls.module.css';
import { Option, Poll } from '@/utils/types';
import Card from '../UI/Card';
import { votePoll } from '@/utils/helper';

const optionsMarkings = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D'
};

const getOptionMarking = (index: number) => {
    return optionsMarkings[index as keyof typeof optionsMarkings];
};

function DisplayPoll({ poll, index }: { poll: Poll, index: number }) {

    return (
        <Card>
            <div className={styles.poll}>
                {/* Question */}
                <p>{index + 1}. {poll.question}</p>

                <DisplayOptions poll={poll} />
            </div>
        </Card>
    )
}

function DisplayOptions({ poll }: { poll: Poll }) {
    const onPollVote = (option: Option) => {
        votePoll(poll, option);
    };

    return (
        <div className={styles.options}>
            {poll.options.map((option, index) => (
                <p className={styles.option} key={option.id} onClick={() => onPollVote(option)}>
                    {getOptionMarking(index + 1)}. {option.value}
                </p>
            ))}
        </div>
    )
}

export default DisplayPoll;

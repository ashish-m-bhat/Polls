import React, { useEffect, useState } from 'react';
import styles from '../../styles/ListPolls.module.css';
import { Option, Poll } from '@/utils/types';
import Card from '../UI/Card';
import { votePoll } from '@/utils/helper';
import { useAppSelector } from '@/store';

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
    const { isLoggedIn, email, polls } = useAppSelector((state) => state.auth);
    const [votingDone, setVotingDone] = useState(false);
    const [selectedOptionId, setSelectedOptionId] = useState('');

    // Once we get the details of the polls this user has participated on, check if this poll is already voted
    useEffect(() => {
        setVotingDone(poll.id in polls);
        setSelectedOptionId(polls[poll.id])
    }, [polls]);

    const getVotePercentage = (option: Option) => {
        const newOptionVoteCount = option.id === selectedOptionId ? option.voteCount + 1 : option.voteCount;
        return Math.round((newOptionVoteCount * 100) / (poll.voteCount + 1));
    };

    // votePoll() will send a POST request which will modify the poll object to increase vote count of the poll & the selected option
    // Not to be called if user isn't logged in or if the logged in user is already done voting this poll
    const onPollVote = (option: Option) => {
        if (!isLoggedIn) {
            alert('You have to login to create a poll');
            return;
        }
        if (poll.id in polls) {
            alert('You\'vealready voted');
            return;
        }
        if (votingDone) return;
        setSelectedOptionId(option.id);
        setVotingDone(true);
        votePoll(poll, option, email);
    };

    return (
        <div className={styles.options}>
            {poll.options.map((option, index) => {
                const votePercent = getVotePercentage(option);
                return (
                    <div className={`${styles.option} ${votingDone ? styles['option-selected'] : ''} `} key={option.id}>
                        <p
                            key={option.id}
                            className={`${styles['inner-option']} ${votingDone ? styles.voted : ''}`}
                            style={votingDone ? {
                                background: `linear-gradient(
                                to right,
                                #6dae06 ${votePercent}%,
                                transparent ${votePercent}%
                              )`} : {}}
                            onClick={() => onPollVote(option)}
                        >
                            {getOptionMarking(index + 1)}. {option.value}
                            {/* Show percentages */}
                            {votingDone &&
                                <span className={styles.percentage}>
                                    <span style={{ marginRight: '18px' }} >{selectedOptionId === option.id && 'You'}</span> {votePercent}%
                                </span>
                            }
                        </p>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default DisplayPoll;

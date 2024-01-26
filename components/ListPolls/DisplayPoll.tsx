import React from 'react';
import styles from '../../styles/ListPolls.module.css';
import { Poll } from '@/utils/types';
import Card from '../UI/Card';

function DisplayPoll({ poll, index }: { poll: Poll, index: number }) {
    return (
        <Card>
            <div className={styles.poll}>
                {/* Question */}
                <p>{index + 1}. {poll.question}</p>

                {/* Options */}
                <div className={styles.options}>
                    {poll.options.map((option) => (
                        <p className={styles.option} key={option.id}>
                            {option.value}
                        </p>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default DisplayPoll;

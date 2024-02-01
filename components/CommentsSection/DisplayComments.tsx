import React from 'react';
import { Comment, PollId } from '@/utils/types';
import DisplayComment from './DisplayComment';
import styles from '../../styles/Comments.module.css';
import { useAppSelector } from '@/store';

// sort((a, b) => a.creationDate - b.creationDate)

function DisplayComments({ pollId }: { pollId: PollId }) {
    const comments = useAppSelector((state) => state.comments);

    return (
        <div className={styles.list__comments}>
            {Object.keys(comments).map((key) => {
                const comment = comments[key];
                return (
                    <DisplayComment
                        key={key}
                        comment={comment}
                        pollId={pollId}
                    />
                )
            })}
        </div>
    )
}

export default DisplayComments
import React from 'react';
import { Comment, PollId } from '@/utils/types';
import styles from '../../styles/Comments.module.css';
import DisplayComment from './DisplayComment';

function ViewReplies({ replies, pollId }: { replies: { [key: string]: Comment }, pollId: PollId }) {
    return (
        <div className={styles.list__replies}>
            {Object.keys(replies).map((key) => {
                const reply = replies[key];
                return (
                    <DisplayComment key={key} comment={reply} pollId={pollId} />
                );
            })}
        </div>
    )
}

export default ViewReplies
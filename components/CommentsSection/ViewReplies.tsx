import React from 'react';
import { Reply } from '@/utils/types';
import ViewReply from './ViewReply';
import styles from '../../styles/Comments.module.css';

function ViewReplies({ replies }: { replies: { [key: string]: Reply } }) {
    return (
        <div className={styles.list__replies}>
            {Object.keys(replies).map((key) =>{
                const reply = replies[key];
                return (
                  <ViewReply key={key} reply={reply} />
                )
            })}
        </div>
    )
}

export default ViewReplies
import React from 'react';
import { Reply } from '@/utils/types';
import styles from '../../styles/Comments.module.css';

function ViewReply({ reply }: { reply: Reply }) {
    return (
        <div className={styles.reply}>
            {reply.value}
        </div>
    )
}

export default ViewReply
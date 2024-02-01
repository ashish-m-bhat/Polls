import React from 'react';
import { Comment } from '@/utils/types';
import DisplayComment from './DisplayComment';
import styles from '../../styles/Comments.module.css';

// sort((a, b) => a.creationDate - b.creationDate)

function DisplayComments({ comments }: { comments: Comment[] }) {
    return (
        <div className={styles.list__comments}>
            {comments.map((comment) => {
                return (
                    <DisplayComment key={comment.id} comment={comment} />
                )
            })}
        </div>
    )
}

export default DisplayComments
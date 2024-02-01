'use client';
import React, { useRef, useState } from 'react';
import styles from '../../styles/Comments.module.css';
import { Comment, PollId } from '@/utils/types';
import DisplayComments from './DisplayComments';
import { addComment } from '@/utils/helper';

function CommentsSection({ pollId, comments }: { pollId: PollId, comments: Comment[] }) {
    const [currentComments, setCurrentComments] = useState(comments);
    const commentInputRef = useRef<HTMLInputElement>(null);

    const addCommentHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const isLoggedIn = 0;
        if (!isLoggedIn) {
            alert('You have to login to comment on a poll');
            return;
        }
        const newComment: Comment = {
            id: Date.now().toString(),
            pollId,
            value: commentInputRef!.current!.value,
            creationDate: Date.now(),
            children: [],
            email: ''
        };
        commentInputRef!.current!.value = '';
        await addComment(newComment);
        setCurrentComments(val => [newComment, ...val]);
    };

    return (
        <div className={styles['CommentsSection']}>
            <DisplayComments comments={currentComments} />
            <form className={styles['comment__input__section']} onSubmit={addCommentHandler}>
                <input ref={commentInputRef} className={styles['input']} />
                <button>Send</button>
            </form>
        </div>
    );
}

export default CommentsSection;

'use client';
import React, { useEffect, useRef } from 'react';
import styles from '../../styles/Comments.module.css';
import { Comment, CommentId, PollId } from '@/utils/types';
import DisplayComments from './DisplayComments';
import { addCommentToDB } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store';
import { addComment, setComments } from '@/store/comments-slice';
import { storeWrapper } from '../StoreWrapper';
import { ANONYMOUS } from '@/utils/constants';


function CommentsSection({ pollId, commentsFromServer }: { pollId: PollId, commentsFromServer: { [key: CommentId]: Comment } }) {
    const dispatch = useAppDispatch();
    const commentInputRef = useRef<HTMLInputElement>(null);
    const userInfo = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(setComments(commentsFromServer));
        commentInputRef.current?.focus();
    }, []);

    const addCommentHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!commentInputRef.current?.value) return;

        const isLoggedIn = 1;
        if (!isLoggedIn) {
            alert('You have to login to comment on a poll');
            return;
        }
        const newComment: Comment = {
            id: Date.now().toString(),
            pollId,
            value: commentInputRef!.current!.value,
            creationDate: Date.now(),
            children: {},
            rootComment: true,
            commentor: {
                email: userInfo.email || ANONYMOUS,
                name: userInfo.name || ANONYMOUS,
                picture: userInfo.picture || ''
            },
        };
        commentInputRef!.current!.value = '';
        dispatch(addComment(newComment));
        await addCommentToDB(newComment);
    };

    return (
        <div className={styles['CommentsSection']}>
            <DisplayComments pollId={pollId} />
            <form className={styles['comment__input__section']} onSubmit={addCommentHandler}>
                <input ref={commentInputRef} className={styles['input']} />
                <button>Send</button>
            </form>
        </div>
    );
}

export default storeWrapper(CommentsSection);

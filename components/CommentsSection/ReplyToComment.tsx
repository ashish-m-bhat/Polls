import React, { Dispatch, SetStateAction, useRef } from 'react';
import styles from '../../styles/Comments.module.css';
import { useAppDispatch } from '@/store';
import { Comment, PollId, Reply } from '@/utils/types';
import { addReplyToComment } from '@/store/comments-slice';
import { addCommentReplyToDB } from '@/utils/helper';

type Props = {
    pollId: PollId,
    comment: Comment,
    setReplyInputVisible: Dispatch<SetStateAction<boolean>>,
}

function ReplyToComment({ pollId, comment, setReplyInputVisible }: Props) {
    const replyInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();


    const onClickReply = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!replyInputRef.current?.value) return;

        const newReply: Reply = {
            parentCommentId: comment.id,
            id: Date.now().toString(),
            pollId,
            value: replyInputRef!.current!.value,
            creationDate: Date.now(),
            rootComment: false,
            email: '',
            children: null // always null for replies
        };
        dispatch(addReplyToComment(newReply)); // redux
        setReplyInputVisible(false);
        replyInputRef!.current!.value = '';
        await addCommentReplyToDB(pollId, newReply); // API
    };

    return (
        (<form className={styles.reply__form} onSubmit={onClickReply}>
            <input type='text' ref={replyInputRef} className={styles.reply__input} />
            <button onClick={onClickReply} className={styles.reply__btn} >Reply</button>
            <button onClick={() => setReplyInputVisible(false)} className={styles.reply__btn} >Cancel</button>
        </form>)
    )
}

export default ReplyToComment;
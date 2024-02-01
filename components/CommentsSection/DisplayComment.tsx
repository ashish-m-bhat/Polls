import React, { useRef, useState } from 'react';
import { Comment, PollId } from '@/utils/types';
import styles from '../../styles/Comments.module.css';
import ReplyToComment from './ReplyToComment';
import ViewReplies from './ViewReplies';
import { checkIfObjectIsEmpty } from '@/utils/helper';

function DisplayComment({ comment, pollId }: { comment: Comment, pollId: PollId }) {
    console.log(comment.value, comment);

    const [repliesVisible, setRepliesVisible] = useState(false);
    const [replyInputVisible, setReplyInputVisible] = useState(false);

    return (
        <div>
            {/* Comment */}
            <div className={styles.comment}>
                <p>{comment.value}</p>
            </div>

            {/* View Replies & Reply CTAs */}
            <div className={styles.comment__cta}>
                {comment.children && checkIfObjectIsEmpty(comment.children) &&
                    <span className={styles['view-replies']} onClick={() => setRepliesVisible(val => !val)}>
                        {repliesVisible ? 'Hide' : 'View'} replies
                    </span>
                }

                {!replyInputVisible && <span className={styles.reply__cta} onClick={() => setReplyInputVisible(val => !val)}>
                    Reply
                </span>
                }
            </div>

            {repliesVisible && comment.children && <ViewReplies replies={comment.children} />}
            {/* Reply Form */}
            {replyInputVisible && <ReplyToComment pollId={pollId} comment={comment} setReplyInputVisible={setReplyInputVisible} />}
        </div>
    )
}

export default DisplayComment;

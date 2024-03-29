import React, { useRef, useState } from 'react';
import { Comment, PollId } from '@/utils/types';
import styles from '../../styles/Comments.module.css';
import ReplyToComment from './ReplyToComment';
import ViewReplies from './ViewReplies';
import { checkIfObjectIsEmpty, getRepliesCount } from '@/utils/helper';
import { ANONYMOUS } from '@/utils/constants';

function DisplayComment({ comment, pollId }: { comment: Comment, pollId: PollId }) {

    const [repliesVisible, setRepliesVisible] = useState(false);
    const [replyInputVisible, setReplyInputVisible] = useState(false);

    const {
        name: commentorName = ANONYMOUS,
        picture: commentorPfp
    } = comment.commentor

    return (
        <div>
            {/* Comment */}
            <div className={styles.comment}>
                <img
                    src={commentorPfp || "/default_pfp.webp"}
                    className={styles.profile__img}
                />
                <div className={styles.nameComment} >
                    <span className={styles.name}>{commentorName}</span>
                    <span>{comment.value}</span>
                </div>
            </div>

            {/* View Replies & Reply CTAs */}
            <div className={styles.comment__cta}>
                {!checkIfObjectIsEmpty(comment.children) &&
                    <span className={styles['view-replies']} onClick={() => setRepliesVisible(val => !val)}>
                        {repliesVisible ? 'Hide replies' :
                            `View ${getRepliesCount(comment)} replies`
                        }
                    </span>
                }

                {!replyInputVisible && <span className={styles.reply__cta} onClick={() => setReplyInputVisible(val => !val)}>
                    Reply
                </span>
                }
            </div>

            {repliesVisible && <ViewReplies replies={comment.children} pollId={pollId} />}
            {/* Reply Form */}
            {replyInputVisible && <ReplyToComment pollId={pollId} comment={comment} setReplyInputVisible={setReplyInputVisible} />}
        </div>
    )
}

export default DisplayComment;

import React, { useRef, useState } from 'react';
import { Comment } from '@/utils/types';
import styles from '../../styles/Comments.module.css';

function DisplayComment({ comment }: { comment: Comment }) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const replyInputRef = useRef<HTMLInputElement>(null);

    // const onClickReply = (event:React.FormEvent) => {
    //     event.preventDefault();
    //     const newReply:Comment = {
    //         id: Date.now().toString(),
    //         value: replyInputRef!.current!.value,
    //         children: []
    //     };
    //     replyInputRef!.current!.value = '';
    // };

    return (
        <div>
            <div className={styles.comment}>
                <p>{comment.value}</p>
            </div>
            {/* <div className={styles.comment__cta} onClick={() => setShowReplyInput(val => !val)}>
                reply
            </div>
            {showReplyInput &&
                (<form>
                    <input type='text' ref={replyInputRef}/>
                    <button onClick={onClickReply}>Reply</button>
                </form>)
            } */}
        </div>
    )
}

export default DisplayComment;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentId } from '@/utils/types';
import { checkIfObjectIsEmpty } from '@/utils/helper';

const initialState: { [key: CommentId]: Comment } = {};

// comments for a particular poll
export const comments = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<{ [key: CommentId]: Comment }>) => {
            return action.payload;
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state[action.payload.id] = (action.payload);
        },
        addReplyToComment(state, action: PayloadAction<Comment>) {
            // add the reply to the parent comment object
            const newReply = action.payload;

            function findParentCommentRecursively(comments: { [key: string]: Comment }) {
                for (let key of Object.keys(comments)) {
                    const currentComment = comments[key];
                    if (currentComment.id === newReply.parentCommentId) {
                        currentComment.children[newReply.id] = newReply;
                        break;
                    }
                    if (!checkIfObjectIsEmpty(currentComment.children)) {
                        findParentCommentRecursively(currentComment.children);
                    }
                }
            }
            findParentCommentRecursively(state)
        }
    }
});

export const { addComment, setComments, addReplyToComment } = comments.actions;

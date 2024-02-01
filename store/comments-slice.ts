import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentId, Reply } from '@/utils/types';

const initialState: { [key: CommentId]: Comment } = {};

// comments for a particular poll
export const comments = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<{ [key: CommentId]: Comment }>) => {
            // action.payload.forEach((comment) => {
            //     state[comment.id] = comment;
            // });
            return action.payload;
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state[action.payload.id] = (action.payload);
        },
        addReplyToComment(state, action: PayloadAction<Reply>) {
            // add the reply to the parent comment object
            const reply = action.payload;
            state[reply.parentCommentId].children[reply.id] = reply;
        }
    }
});

export const { addComment, setComments, addReplyToComment } = comments.actions;

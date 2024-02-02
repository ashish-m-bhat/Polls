import { Comment, CommentId } from "./types";

export const checkIfObjectIsEmpty = (object: Object) => {
    return !Object.keys(object).length;
}

// For a given comment, traverse through the children {} to find their length
export const getRepliesCount = (commentToCheckCount: Comment) => {

    let count = Object.keys(commentToCheckCount.children).length; // direct comments

    // traverse through a comment's children
    // add the count of each comment's children {}'s length
    function traverse(comments: { [key: string]: Comment }) {
        for (let key of Object.keys(comments)) {
            const currentComment = comments[key];
            count += Object.keys(currentComment.children).length;

            if (!checkIfObjectIsEmpty(currentComment.children)) {
                traverse(currentComment.children);
            }
        }
    }
    traverse(commentToCheckCount.children);
    return count;
};

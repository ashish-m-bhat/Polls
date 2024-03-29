import React from 'react';
import { CommentsSection, DisplaySinglePoll } from '@/components';
import { fetchComments, fetchPollDetails } from '@/utils/api-middlewares'
import { PollId } from '@/utils/types';

async function PollDetailsPage({ params: { pollId } }: { params: { pollId: PollId } }) {
    const pollData = await fetchPollDetails(pollId);
    const commentsFromServer = await fetchComments(pollId);

    return (
        <div>
            <DisplaySinglePoll pollData={pollData} />
            <CommentsSection pollId={pollId} commentsFromServer={commentsFromServer} />
        </div>
    )
}

export default PollDetailsPage;

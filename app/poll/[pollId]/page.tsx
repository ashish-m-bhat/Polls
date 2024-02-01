import React from 'react';
import { CommentsSection, DisplaySinglePoll } from '@/components';
import { fetchComments, fetchPollDetails } from '@/utils/helper'
import { PollId } from '@/utils/types';

async function PollDetailsPage({ params: { pollId } }: { params: { pollId: PollId } }) {
    const pollData = await fetchPollDetails(pollId);
    const comments = await fetchComments(pollId);

    return (
        <div>
            <DisplaySinglePoll pollData={pollData} />
            <CommentsSection pollId={pollId} comments={comments} />
        </div>
    )
}

export default PollDetailsPage;

import React from 'react';
import { DisplaySinglePoll } from '@/components';
import { fetchPoll } from '@/utils/helper'

async function page({ params: { pollId } }: { params: { pollId: string } }) {
    const pollData = await fetchPoll(pollId);

    // get poll details
    return (
        <div>
            <DisplaySinglePoll pollData={pollData} />
        </div>
    )
}

export default page
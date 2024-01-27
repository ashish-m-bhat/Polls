import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Option, Poll } from "./types";

export const createPoll = async (poll: Poll, router: AppRouterInstance) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-poll`, {
            method: 'POST',
            body: JSON.stringify(poll),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('data', data);
        alert('Poll created');
        router.push('/');
    } catch (error) {
        console.log('error:', error);
    }

};

export const fetchAllPolls = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/polls`, { cache: 'no-store' });
        return response.json();
    } catch (error) {
        console.log('failed to fetch polls:', error);
    }
};

export const votePoll = async (poll: Poll, selectedOption: Option) => {
    const modifiedPoll = {
        ...poll,
        voteCount: poll.voteCount + 1,
        options: poll.options.map(option => {
            if (option.id === selectedOption.id) {
                return ({
                    ...selectedOption,
                    voteCount: selectedOption.voteCount + 1
                })
            } else {
                return option
            }
        })
    };


    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vote`, {
            method: 'POST',
            body: JSON.stringify(modifiedPoll),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log('voting failed:', error);
    }

};
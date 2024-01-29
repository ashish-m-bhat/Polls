import axios from 'axios';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Option, Poll } from "./types";
import { CREATE_POLL_ENDPOINT, LIST_ALL_POLLS_ENDPOINT, REGISTER_USER_VOTE, USER_POLL_DETAILS, VOTE_ENDPOINT } from "./constants";
import { revalidateTagByServerAction } from '@/actions/revalidate';

export const createPoll = async (poll: Poll, router: AppRouterInstance) => {
    try {
        await fetch(CREATE_POLL_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(poll),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // revalidate the / page to fetch latest polls
        await revalidateTagByServerAction("all-polls");
        alert('Poll created');
        router.push('/');

    } catch (error) {
        console.log('error:', error);
    }
};

export const fetchAllPolls = async () => {
    try {
        const response = await fetch(LIST_ALL_POLLS_ENDPOINT, {
            cache: 'no-store',
            next: {
                tags: ['all-polls']
            }
        });
        return response.json();
    } catch (error) {
        console.log('failed to fetch polls:', error);
    }
};

export const registerUserVote = async (pollId: string, selectedOptionId: string, userEmail: string) => {
    try {
        fetch(REGISTER_USER_VOTE, {
            method: 'POST',
            body: JSON.stringify({ pollId, selectedOptionId, userEmail }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => revalidateTagByServerAction('user-poll-details'));
    } catch (error) {
        console.log('Failed to register user vote');
    }
};

export const votePoll = async (poll: Poll, selectedOption: Option) => {
    // modify poll with added vote count for poll & option
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
        await fetch(VOTE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(modifiedPoll),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('voting failed:', error);
    }
};

export const fetchUserInfo = async (accessToken: string) => {
    return await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const fetchUserPollDetails = async (email: string) => {
    try {
        const response = await fetch(`${USER_POLL_DETAILS}?email=${email}`, {
            next: {
                tags: ['user-poll-details']
            }
        });
        return await response.json();
    } catch (error) {
        console.log('failed to get user poll details');
    }
};

import axios from 'axios';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Option, Poll } from "./types";
import { CREATE_POLL_ENDPOINT, LIST_ALL_POLLS_ENDPOINT, VOTE_ENDPOINT } from "./constants";

export const createPoll = async (poll: Poll, router: AppRouterInstance) => {
    try {
        const response = await fetch(CREATE_POLL_ENDPOINT, {
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
        const response = await fetch(LIST_ALL_POLLS_ENDPOINT, { cache: 'no-store' });
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
        await fetch(VOTE_ENDPOINT, {
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

export const fetchUserInfo = async (accessToken: string) => {
    return await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
};

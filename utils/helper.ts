import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Poll } from "./types";

export const createPoll = async (poll:Poll, router: AppRouterInstance) => {
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

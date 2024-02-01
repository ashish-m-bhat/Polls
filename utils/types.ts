import React, { ReactNode } from "react";

export type PollId =  string;
export type OptionId = string;
export type CommentId = string;

export interface Poll {
    id: PollId;
    isActive: boolean;
    question: string;
    options: Option[];
    voteCount: number;
    creator: string;
    creationDate: number; // unix timestamp
    closeDate: number; // unix timestamp
};

export interface Option {
    pollId: PollId;
    id: OptionId;
    value: string;
    voteCount: number;
};

export interface User {
    isLoggedIn: boolean;
    accessToken: string;
    email: string;
    name: string;
    picture: string;
    polls: any;
};

export interface Comment {
    id: CommentId;
    pollId: PollId;
    email: string;
    value: string;
    children: Comment[];
    creationDate: number; // unix timestamp
};

export interface Button {
    onClick?: (event: React.MouseEvent) => void;
    children: ReactNode;
    icon?: ReactNode;
    endIcon?: ReactNode;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
};

export interface Card {
    children: ReactNode;
    className?: string;
 };

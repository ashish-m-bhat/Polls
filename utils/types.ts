import React, { ReactNode } from "react";

type PollId =  string;
type OptionId = string;

export interface Poll {
    id: PollId;
    isActive: boolean;
    question: string;
    options: Option[];
    voteCount: number;
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

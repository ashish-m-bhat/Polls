import React, { ReactNode } from "react";
export interface Poll {
    pollId: string;
    isActive: boolean;
    question: string;
    options: Option[];
    voteCount: number;
    creationDate: number; // unix timestamp
    closeDate: number; // unix timestamp
};

export interface Option {
    pollId: string;
    id: string;
    value: string;
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

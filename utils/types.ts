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

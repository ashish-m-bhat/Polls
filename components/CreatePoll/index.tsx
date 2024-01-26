'use client';
import { Option, Poll } from "@/utils/types";
import React, { FormEvent, useState } from "react";
import styles from '../../styles/createPoll.module.css';
import { useRouter } from "next/navigation";

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const DAYS_TO_CLOSE = 1;

function CreatePoll() {
    const pollId = Date.now().toString();
    const [options, setOptions] = useState<Option[]>([]);
    const [questionInput, setQuestionInput] = useState("");
    const [optionInput, setOptionInput] = useState("");
    const router = useRouter();

    // Take the input, create a p tag and append it to the options div.
    const createOption = (event: React.MouseEvent) => {
        event.preventDefault();
        const newOptionElement = document.createElement("p");
        newOptionElement.innerText = optionInput;
        const newOption: Option = {
            pollId: pollId,
            id: `${pollId}_option_${options.length + 1}`,
            value: optionInput
        };

        setOptions((val) => [...val, newOption]);
        setOptionInput("");
        document.getElementById("options")!.appendChild(newOptionElement);
    };

    const createPoll = async (event: FormEvent) => {
        event.preventDefault();
        const poll = {
            pollId,
            isActive: true,
            question: questionInput,
            voteCount: 0,
            options: options,
            creationDate: Date.now(),
            closeDate: Date.now() + 86400 * 1000 * DAYS_TO_CLOSE,
        };
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

    return (
        <div className={styles['createPoll']}>
            <form className={styles['form']} onSubmit={createPoll}>
                {/* Question */}
                <label>
                    <input
                        type="text"
                        placeholder="Question"
                        value={questionInput}
                        onChange={({ target: { value } }) => setQuestionInput(value)}
                    />
                </label>

                {/* Options */}
                {questionInput && (
                    <>
                        <div id="options"></div>
                        {options.length !== MAX_OPTIONS && (
                            <>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={`option ${options.length + 1}`}
                                        value={optionInput}
                                        onChange={({ target: { value } }) => setOptionInput(value)}
                                    />
                                </label>

                                {/* Add option */}
                                <button
                                    onClick={createOption}
                                    disabled={!optionInput || options.length === MAX_OPTIONS}
                                >
                                    {" "}
                                    +{" "}
                                </button>
                            </>
                        )}
                    </>
                )}

                {/* Create poll CTA */}
                <button
                    type="submit"
                    onClick={createPoll}
                    disabled={options.length < MIN_OPTIONS}
                >
                    Create poll
                </button>
            </form>
        </div>
    );
}

export default CreatePoll;

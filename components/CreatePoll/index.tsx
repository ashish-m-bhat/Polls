'use client';
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPoll } from "@/utils/helper";
import { Option, Poll } from "@/utils/types";
import { useAppSelector } from "@/store";
import Button from "../UI/Button";
import styles from '../../styles/CreatePoll.module.css';
import { storeWrapper } from "../StoreWrapper";

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const DAYS_TO_CLOSE = 1;

function CreatePoll() {
    const pollIdRef = useRef(Date.now().toString());
    const pollId = pollIdRef.current;

    const [options, setOptions] = useState<Option[]>([]);
    const [questionInput, setQuestionInput] = useState("");
    const [optionInput, setOptionInput] = useState("");
    const router = useRouter();
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    useEffect(() => {
        !isLoggedIn && router.push('/');
    }, []);

    // Take the input, create a p tag and append it to the options div.
    const createOption = (event: React.MouseEvent) => {
        event.preventDefault();
        const newOptionElement = document.createElement("p");
        newOptionElement.innerText = optionInput;
        const newOption: Option = {
            pollId,
            id: `${pollId}_option_${options.length + 1}`,
            value: optionInput,
            voteCount: 0,
        };

        setOptions((val) => [...val, newOption]);
        setOptionInput("");
        document.getElementById("options")!.appendChild(newOptionElement);
    };

    const createPollHandler = async (event: FormEvent) => {
        event.preventDefault();
        const poll: Poll = {
            id: pollId,
            isActive: true,
            question: questionInput,
            voteCount: 0,
            options: options,
            creationDate: Date.now(),
            closeDate: Date.now() + 86400 * 1000 * DAYS_TO_CLOSE,
        };
        createPoll(poll, router);
    }
    return (
        <div className={styles['createPoll']}>
            <form className={styles['form']} onSubmit={createPollHandler}>
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
                <Button
                    type="submit"
                    onClick={createPollHandler}
                    disabled={options.length < MIN_OPTIONS}
                >
                    Create poll
                </Button>
            </form>
        </div>
    );
}

export default storeWrapper(CreatePoll);
'use client';
import React from "react";
import { store } from "@/store";
import { Provider } from "react-redux";
import CreatePollForm from "./CreatePollForm";

function CreatePoll() {
    return (
        <Provider store={store}>
            <CreatePollForm />
        </Provider>
    );
}

export default CreatePoll;

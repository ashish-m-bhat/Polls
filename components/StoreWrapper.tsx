'useClient';
import { store } from "@/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Provider } from "react-redux";

export function storeWrapper<T>(InnerComponent: React.ComponentType<T>) {
    return function (props: T) {
        return (
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                <Provider store={store}>
                    {/* @ts-ignore */}
                    <InnerComponent {...props} />
                </Provider>
            </GoogleOAuthProvider>
        );
    }
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/utils/types';

const initialState: User = {
    isLoggedIn: false,
    accessToken: '',
    email: '',
    name: '',
    picture: ''
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true;
        },
        logOut: () => {
            return initialState;
        },
        setUserInfo: (state, action: PayloadAction<User>) => {
            const { accessToken, email, name, picture } = action.payload;
            return {
                ...state,
                accessToken,
                email,
                name,
                picture,
            }

        }
    }

});

export const { logIn, logOut, setUserInfo } = auth.actions;

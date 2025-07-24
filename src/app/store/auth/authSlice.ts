import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
    name: string;
    age: string;
    passions: string[];
    photos: string[];
    isAuth: boolean;
}

const initialState: IAuthState = {
    name: '',
    age: '',
    passions: [],
    photos: [],
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setAge(state, action: PayloadAction<string>) {
            state.age = action.payload;
        },
        setPassions(state, action: PayloadAction<string[]>) {
            state.passions = action.payload;
        },
        setPhotos(state, action: PayloadAction<string[]>) {
            state.photos = action.payload;
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
    },
});

export const { setName, setAge, setPassions, setPhotos } = authSlice.actions;
export const AuthReducer = authSlice.reducer;

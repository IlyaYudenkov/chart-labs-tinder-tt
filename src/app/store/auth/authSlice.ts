import { ISelfUser } from '@/entities/User/model/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISelfUser = {
    name: '',
    age: '',
    passions: [],
    photos: [],
    isVerified: false,
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
        setIsVerified(state, action: PayloadAction<boolean>) {
            state.isVerified = action.payload;
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
    },
});

export const { setName, setAge, setPassions, setPhotos, setIsVerified, setIsAuth } =
    authSlice.actions;
export const AuthReducer = authSlice.reducer;

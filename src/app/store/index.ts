import { configureStore } from '@reduxjs/toolkit';
import { StepReducer } from './step/stepSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AuthReducer } from './auth/authSlice';

export const store = configureStore({
    reducer: {
        step: StepReducer,
        auth: AuthReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

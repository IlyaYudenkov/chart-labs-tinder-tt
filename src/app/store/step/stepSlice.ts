import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStepState {
    currentStepIndex: number;
}

const initialState: IStepState = {
    currentStepIndex: 0,
};

const stepSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        setCurrentStepIndex: (state, action: PayloadAction<number>) => {
            state.currentStepIndex = action.payload;
        },
        nextStep: (state) => {
            state.currentStepIndex = Math.min(state.currentStepIndex + 1, 3);
        },
        prevStep: (state) => {
            state.currentStepIndex = Math.max(state.currentStepIndex - 1, 0);
        },
    },
});
export const { setCurrentStepIndex, nextStep, prevStep } = stepSlice.actions;
export const StepReducer = stepSlice.reducer;

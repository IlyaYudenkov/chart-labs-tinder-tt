import { StepName } from '../components/StepName';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { StepPassions } from '../components/StepPassions';
import { useEffect } from 'react';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';

export const SignUpForm = () => {
    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        const storedIndex = sessionStorage.getItem('currentStepIndex');
        if (storedIndex) dispatch(setCurrentStepIndex(+storedIndex));
    }, []);

    return (
        <div>
            {currentStepIndex === 0 && <StepName />}
            {currentStepIndex === 1 && <StepPassions />}
        </div>
    );
};

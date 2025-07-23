import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect } from 'react';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { SelectName } from '@/features/SelectName';
import { SelectPassions } from '@/features/SelectPassions';
import { UploadTabsSwitcher } from '@/features/UploadImages/ui/UploadTabsSwitcher';

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
            {currentStepIndex === 0 && <SelectName />}
            {currentStepIndex === 1 && <SelectPassions />}
            {currentStepIndex === 2 && <UploadTabsSwitcher />}
        </div>
    );
};

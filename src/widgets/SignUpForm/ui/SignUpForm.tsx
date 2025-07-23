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
        if (storedIndex) {
            dispatch(setCurrentStepIndex(+storedIndex));
        }
    }, []);

    useEffect(() => {
        const storedIndex = sessionStorage.getItem('currentStepIndex');
        const hasName = !!sessionStorage.getItem('name');

        // Приоритет: если данных нет — откат на нужный шаг, иначе берем storedIndex
        if (!hasName) {
            dispatch(setCurrentStepIndex(0));
        } else if (storedIndex) {
            dispatch(setCurrentStepIndex(+storedIndex));
        }
    }, [dispatch]);

    return (
        <div>
            {currentStepIndex === 0 && <SelectName />}
            {currentStepIndex === 1 && <SelectPassions />}
            {currentStepIndex === 2 && <UploadTabsSwitcher />}
        </div>
    );
};

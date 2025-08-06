import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { NameAgeInputForm } from '@/features/NameAgeInputForm';
import { SelectPassions } from '@/features/SelectPassions';
import { UploadTabsSwitcher } from '@/features/UploadImages/ui/UploadTabsSwitcher';
import { AUTH_SS_KEY, CURRENT_STEP_INDEX_SS_KEY, NAME_SS_KEY } from '@/shared/data/ssKeys.data';
import { Loader } from '@/shared/UI/Loader';
import { setIsAuth } from '@/app/store/auth/authSlice';

const steps = [
    <NameAgeInputForm key="step-0" />,
    <SelectPassions key="step-1" />,
    <UploadTabsSwitcher key="step-2" />,
];

export const SignUpForm = () => {
    //STATE
    const [isLoading, setIsLoading] = useState(true);

    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        const storedIndex = sessionStorage.getItem(CURRENT_STEP_INDEX_SS_KEY);
        if (storedIndex) {
            dispatch(setCurrentStepIndex(+storedIndex));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const isAuth = JSON.parse(sessionStorage.getItem(AUTH_SS_KEY));
        dispatch(setIsAuth(isAuth));
    }, []);

    useEffect(() => {
        const storedIndex = sessionStorage.getItem(CURRENT_STEP_INDEX_SS_KEY);
        const hasName = !!sessionStorage.getItem(NAME_SS_KEY);

        if (!hasName) {
            dispatch(setCurrentStepIndex(0));
        } else if (storedIndex) {
            dispatch(setCurrentStepIndex(+storedIndex));
        }
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className="relative h-full">
            {steps.map((step, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out
                        ${i === currentStepIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90 z-0 pointer-events-none'}
                    `}
                >
                    {step}
                </div>
            ))}
        </div>
    );
};

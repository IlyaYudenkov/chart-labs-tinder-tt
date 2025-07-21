import { Button } from '@/shared/UI/Button/ui/Button';
import { useCallback, useEffect, useState } from 'react';
import { PASSIONS_DATA_ARRAY } from '../data/signUpForm.data';
import { PassionButton } from './PassionButton';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { setPassions } from '@/app/store/auth/authSlice';

export const StepPassions = () => {
    //STATE
    const [selected, setSelected] = useState<string[]>([]);

    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const { passions } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        const storedPassions = sessionStorage.getItem('passions');
        if (storedPassions) {
            setSelected(JSON.parse(storedPassions));
        } else if (passions) {
            setSelected(passions);
        }
    }, [passions]);

    useEffect(() => {
        if (selected.length > 0) {
            sessionStorage.setItem('passions', JSON.stringify(selected));
        }
    }, [selected]);

    //FUNCTIONS
    const togglePassion = useCallback((passion: string) => {
        setSelected((prev) =>
            prev.includes(passion) ? prev.filter((p) => p !== passion) : [...prev, passion],
        );
    }, []);

    const handleSavePassions = useCallback(() => {
        if (selected.length) {
            dispatch(setPassions(selected));
            dispatch(setCurrentStepIndex(currentStepIndex + 1));
            sessionStorage.setItem('currentStepIndex', String(currentStepIndex + 1));
        }
    }, [selected, currentStepIndex, dispatch]);

    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-[7px] pt-0 pb-6 px-6 border-b border-gray-blue-muted">
                <h2 className="text-secondary text-[28px] font-bold">Passions</h2>
                <p className="text-dark-gray-blue">
                    Let everyone know what you’re passionate about, by adding it to your profile.
                </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center px-6 mb-5">
                {PASSIONS_DATA_ARRAY.map((el) => (
                    <PassionButton
                        key={el}
                        label={el}
                        disabled={selected.length >= 5 && !selected.includes(el)}
                        isSelected={selected.includes(el)}
                        onClick={() => togglePassion(el)}
                    />
                ))}
            </div>
            <div className="fixed flex justify-center bottom-0 p-6 bg-primary w-full border-t border-gray-blue-muted">
                <Button
                    title={`Continue (${selected.length}/5)`}
                    className="w-full"
                    onClick={handleSavePassions}
                />
            </div>
        </div>
    );
};

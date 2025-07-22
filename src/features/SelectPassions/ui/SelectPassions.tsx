import { Button } from '@/shared/UI/Button/ui/Button';
import { useCallback, useEffect, useState } from 'react';
import { PassionButton } from '../components/PassionButton';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { setPassions } from '@/app/store/auth/authSlice';
import { PASSIONS_DATA_ARRAY } from '../data/selectPassions.data';

export const SelectPassions = () => {
    //STATE
    const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const { passions } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        const storedPassions = sessionStorage.getItem('passions');
        if (storedPassions) {
            setSelectedPassions(JSON.parse(storedPassions));
        } else if (passions) {
            setSelectedPassions(passions);
        }
    }, [passions]);

    useEffect(() => {
        if (selectedPassions.length > 0) {
            sessionStorage.setItem('passions', JSON.stringify(selectedPassions));
        }
    }, [selectedPassions]);

    //FUNCTIONS
    const togglePassion = useCallback((passion: string) => {
        setSelectedPassions((prev) =>
            prev.includes(passion) ? prev.filter((p) => p !== passion) : [...prev, passion],
        );
    }, []);

    const handleSavePassions = useCallback(() => {
        if (selectedPassions.length) {
            dispatch(setPassions(selectedPassions));
            dispatch(setCurrentStepIndex(currentStepIndex + 1));
            sessionStorage.setItem('currentStepIndex', String(currentStepIndex + 1));
        }
    }, [selectedPassions, currentStepIndex, dispatch]);

    return (
        <div className="flex flex-col gap-4 pb-7">
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
                        disabled={selectedPassions.length >= 5 && !selectedPassions.includes(el)}
                        isSelected={selectedPassions.includes(el)}
                        onClick={() => togglePassion(el)}
                    />
                ))}
            </div>
            <div className="fixed flex justify-center bottom-0 p-6 bg-primary w-full border-t border-gray-blue-muted">
                <Button
                    title={`Continue (${selectedPassions.length}/5)`}
                    className="w-full"
                    onClick={handleSavePassions}
                />
            </div>
        </div>
    );
};

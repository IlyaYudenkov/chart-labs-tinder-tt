import { Button } from '@/shared/UI/Button/ui/Button';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/store';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { setPassions } from '@/app/store/auth/authSlice';
import { PassionButton } from '@/entities/Passion';
import { PASSIONS_DATA_ARRAY } from '@/entities/Passion/data/passions.data';
import { CURRENT_STEP_INDEX_SS_KEY, PASSIONS_SS_KEY } from '@/shared/data/ssKeys.data';

export const SelectPassions = () => {
    //STATE
    const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

    //RTK
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        const stored = sessionStorage.getItem(PASSIONS_SS_KEY);
        if (stored) {
            setSelectedPassions(JSON.parse(stored));
            dispatch(setPassions(JSON.parse(stored)));
        }
    }, []);

    //FUNCTION
    const togglePassion = (passion: string) => {
        setSelectedPassions((prev) =>
            prev.includes(passion) ? prev.filter((p) => p !== passion) : [...prev, passion],
        );
    };

    const handleContinue = () => {
        if (!selectedPassions.length) return;
        sessionStorage.setItem(PASSIONS_SS_KEY, JSON.stringify(selectedPassions));

        dispatch(setPassions(selectedPassions));
        dispatch(setCurrentStepIndex(2));
        sessionStorage.setItem(CURRENT_STEP_INDEX_SS_KEY, '2');
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex flex-col gap-2 px-6 pb-4 border-b border-gray-200">
                <h2 className="text-[28px] font-bold text-black">Passions</h2>
                <p className="text-dark-gray-blue">
                    Let everyone know what you’re passionate about, by adding it to your profile.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="flex flex-wrap justify-center gap-2">
                    {PASSIONS_DATA_ARRAY.map((item) => (
                        <PassionButton
                            key={item}
                            label={item}
                            isSelected={selectedPassions.includes(item)}
                            disabled={
                                selectedPassions.length >= 5 && !selectedPassions.includes(item)
                            }
                            onClick={() => togglePassion(item)}
                        />
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 w-full p-6 bg-white border-t border-gray-200">
                <Button
                    title={`Continue (${selectedPassions.length}/5)`}
                    className="w-full"
                    onClick={handleContinue}
                />
            </div>
        </div>
    );
};

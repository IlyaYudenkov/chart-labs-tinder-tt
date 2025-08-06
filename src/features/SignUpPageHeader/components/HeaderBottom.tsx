import XMark from '@/shared/assets/images/XMark/XMarkIcon.svg';
import ArrowLeft from '@/shared/assets/images/Arrow/ArrowWOLeft.svg';
import { Button } from '@/shared/UI/Button/ui/Button';
import { EButtonVariants } from '@/shared/UI/Button/model/button.model';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { CURRENT_STEP_INDEX_SS_KEY } from '@/shared/data/ssKeys.data';

export const HeaderBottom = () => {
    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const dispatch = useAppDispatch();

    //FUNCTION
    const updateStepIndex = (index: number) => {
        dispatch(setCurrentStepIndex(index));
        sessionStorage.setItem(CURRENT_STEP_INDEX_SS_KEY, String(index));
    };

    return (
        <div className="px-6">
            {currentStepIndex === 0 && <Button icon={XMark} variant={EButtonVariants.DEFAULT} />}
            {currentStepIndex > 0 && (
                <div className="flex justify-between">
                    <Button
                        icon={ArrowLeft}
                        variant={EButtonVariants.DEFAULT}
                        onClick={() => updateStepIndex(currentStepIndex - 1)}
                    />
                    {currentStepIndex === 1 && (
                        <Button
                            title="Skip"
                            variant={EButtonVariants.DEFAULT}
                            className="text-dark-gray-blue font-bold"
                            onClick={() => updateStepIndex(currentStepIndex + 1)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

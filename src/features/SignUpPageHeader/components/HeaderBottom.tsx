import XMark from '@/shared/assets/images/XMark/XMarkIcon.svg';
import ArrowLeft from '@/shared/assets/images/Arrow/ArrowWOLeft.svg';
import { Button } from '@/shared/UI/Button/ui/Button';
import { EButtonVariants } from '@/shared/UI/Button/model/button.model';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';

export const HeaderBottom = () => {
    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const dispatch = useAppDispatch();

    //FUNCTION
    const updateStepIndex = (index: number) => dispatch(setCurrentStepIndex(index));

    return (
        <div className="px-6 mb-[18px]">
            {currentStepIndex === 0 && <Button icon={XMark} variant={EButtonVariants.default} />}
            {currentStepIndex === 1 && (
                <div className="flex justify-between">
                    <Button
                        icon={ArrowLeft}
                        variant={EButtonVariants.default}
                        onClick={() => updateStepIndex(currentStepIndex - 1)}
                    />
                    <Button
                        title="Skip"
                        variant={EButtonVariants.default}
                        className="text-dark-gray-blue font-bold"
                        onClick={() => updateStepIndex(currentStepIndex + 1)}
                    />
                </div>
            )}
        </div>
    );
};

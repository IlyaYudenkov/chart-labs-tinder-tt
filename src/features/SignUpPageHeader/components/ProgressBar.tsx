import { useAppSelector } from '@/app/store';

export const ProgressBar = () => {
    const { currentStepIndex } = useAppSelector((state) => state.step);

    const totalSteps = 3;

    const progress = (currentStepIndex / totalSteps) * 100;

    return (
        <div className="relative w-full h-2 bg-gray-200">
            <div
                className="h-full bg-gradient-red-to-orange"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
            />
        </div>
    );
};

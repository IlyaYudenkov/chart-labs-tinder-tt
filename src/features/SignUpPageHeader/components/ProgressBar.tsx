import { useAppDispatch, useAppSelector } from '@/app/store';
import { setIsAuth } from '@/app/store/auth/authSlice';
import { useEffect, useMemo } from 'react';

const totalSteps = 3;

export const ProgressBar = () => {
    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const { photos } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    //MEMO
    const progress = useMemo(() => {
        const hasUploadedPhotos = photos.some((img) => !!img?.trim());
        return hasUploadedPhotos ? 100 : (currentStepIndex / totalSteps) * 100;
    }, [photos, currentStepIndex]);

    //EFFECT
    useEffect(() => {
        if (progress !== 100) {
            dispatch(setIsAuth(false));
            sessionStorage.setItem('auth', 'false');
        }
    }, [progress]);

    return (
        <div className="relative w-full h-2 bg-gray-200">
            <div
                className="h-full bg-gradient-red-to-orange"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
            />
        </div>
    );
};

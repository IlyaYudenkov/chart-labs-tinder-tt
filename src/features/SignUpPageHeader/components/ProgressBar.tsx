import { useAppDispatch, useAppSelector } from '@/app/store';
import { setIsAuth } from '@/app/store/auth/authSlice';
import { AUTH_SS_KEY } from '@/shared/data/ssKeys.data';
import { useEffect, useMemo, useState } from 'react';

const TOTAL_STEPS = 3;

export const ProgressBar = () => {
    //STATE
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    //RTK
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const { photos } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    //MEMO
    const hasUploadedPhotos = useMemo(() => photos.some((img) => !!img?.trim()), [photos]);

    const progress = useMemo(() => {
        return hasUploadedPhotos ? 100 : (currentStepIndex / TOTAL_STEPS) * 100;
    }, [hasUploadedPhotos, currentStepIndex]);

    //EFFECT
    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted || photos.length === 0) return;

        const isIncomplete = !hasUploadedPhotos && currentStepIndex < TOTAL_STEPS;

        if (isIncomplete) {
            dispatch(setIsAuth(false));
            sessionStorage.setItem(AUTH_SS_KEY, 'false');
        }
    }, [hasMounted, hasUploadedPhotos, currentStepIndex, photos.length]);

    return (
        <div className="relative w-full h-2 bg-gray-200">
            <div
                className="h-full bg-gradient-red-to-orange"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
            />
        </div>
    );
};

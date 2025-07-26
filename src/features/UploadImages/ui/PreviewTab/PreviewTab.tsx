import { useAppSelector } from '@/app/store';
import { DefaultSwipeSlider } from '@/features/SwipeSlider';
import { PHOTOS_SS_KEY } from '@/shared/data/ssKeys.data';
import { useEffect, useMemo, useState } from 'react';

export const PreviewTab = () => {
    // STATE
    const [userImages, setUserImages] = useState<string[]>([]);

    // RTK
    const { photos, name, age, isVerified } = useAppSelector((state) => state.auth);

    //MEMO
    const parsedImagesSS = useMemo(
        () => JSON.parse(sessionStorage.getItem(PHOTOS_SS_KEY) || '[]'),
        [],
    );

    // EFFECT
    useEffect(() => {
        let finalImages: string[] = [];
        if (photos && photos.length) {
            finalImages = photos;
        } else if (parsedImagesSS) {
            if (Array.isArray(parsedImagesSS)) finalImages = parsedImagesSS;
        }
        const filteredImages = finalImages.filter((img) => img && img.trim() !== '');
        setUserImages(filteredImages);
    }, [photos]);
    return (
        <div className="rounded-[8px] p-3">
            {userImages.length ? (
                <DefaultSwipeSlider
                    age={age}
                    images={userImages}
                    name={name}
                    isVerified={isVerified}
                    hasHelpIcon
                />
            ) : (
                <div className="h-[85vh] flex items-center justify-center">
                    <p className="text-2xl text-center">No images uploaded yet!</p>
                </div>
            )}
        </div>
    );
};

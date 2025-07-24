import { useAppSelector } from '@/app/store';
import { SwipeSlider } from '@/features/SwipeSlider';
import { useEffect, useMemo, useState } from 'react';

export const PreviewTab = () => {
    // STATE
    const [userImages, setUserImages] = useState<string[]>([]);

    // RTK
    const { photos, name, passions } = useAppSelector((state) => state.auth);

    //MEMO
    const parsedImagesSS = useMemo(() => JSON.parse(sessionStorage.getItem('images') || '[]'), []);

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
        <div className="rounded-[8px] overflow-hidden p-3">
            {userImages.length ? (
                <SwipeSlider
                    images={userImages}
                    name={name}
                    passions={passions}
                    age={123}
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

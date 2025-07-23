import { useAppSelector } from '@/app/store';
import { Slider } from '@/shared/UI/Slider';
import { useEffect, useState } from 'react';

export const PreviewTab = () => {
    // STATE
    const [userImages, setUserImages] = useState<string[]>([]);

    // RTK
    const { photos, name, passions } = useAppSelector((state) => state.auth);

    // EFFECT
    useEffect(() => {
        const imagesSS = sessionStorage.getItem('images');

        if (photos && photos.length) {
            setUserImages(photos);
        } else if (imagesSS) {
            const parsed = JSON.parse(imagesSS);
            if (Array.isArray(parsed)) setUserImages(parsed);
        }
    }, [photos]);

    return (
        <div className="rounded-[8px] overflow-hidden p-3">
            {userImages.length ? (
                <Slider images={userImages} name={name} passions={passions} age={123} hasHelpIcon />
            ) : (
                <div className="h-[85vh] flex items-center justify-center">
                    <p className="text-2xl text-center">No images uploaded yet!</p>
                </div>
            )}
        </div>
    );
};

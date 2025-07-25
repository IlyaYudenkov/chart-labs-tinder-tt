import { ChangeEvent, useEffect, useState } from 'react';
import { EButtonVariants } from '@/shared/UI/Button/model/button.model';
import { Button } from '@/shared/UI/Button/ui/Button';
import PlusIcon from '@/shared/assets/images/Plus/PlusIcon.svg';
import XMarkSmall from '@/shared/assets/images/XMark/XMarkSmallIcon.svg';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setPhotos } from '@/app/store/auth/authSlice';

interface IInputImage {
    selectedImage?: string;
    onImageChange?: (file: string | null) => void;
}

export const InputImage = ({ selectedImage, onImageChange }: IInputImage) => {
    //STATE
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    //RTK
    const { photos } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        if (selectedImage) {
            setPreviewUrl(selectedImage);
            setIsVisible(true);
        }
    }, [selectedImage]);

    //FUNCTION
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setPreviewUrl(base64);
                setIsVisible(true);
                onImageChange?.(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClear = () => {
        setIsVisible(false);

        setTimeout(() => {
            setPreviewUrl('');
            onImageChange?.(null);
            dispatch(setPhotos(photos.filter((photo) => photo !== selectedImage)));
        }, 300);
    };

    return (
        <div
            className={`w-30 h-40 relative bg-light-gray-blue rounded-[8px] ${!previewUrl ? 'border-4 border-dashed border-gray-blue-light' : ''}`}
        >
            {!previewUrl && (
                <span className="absolute top-0 right-0 w-[5px] h-[5px] bg-gradient-red-to-orange rounded-full" />
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${previewUrl ? '-z-10' : 'z-10'}`}
            />

            {previewUrl && (
                <div
                    className={`flex justify-center items-center absolute inset-0 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <img
                        src={previewUrl}
                        alt="preview"
                        className="w-full h-full object-contain rounded-[8px]"
                    />
                </div>
            )}

            <Button
                icon={previewUrl ? XMarkSmall : PlusIcon}
                variant={previewUrl ? EButtonVariants.xMark : EButtonVariants.plus}
                onClick={previewUrl ? handleClear : undefined}
                className="absolute bottom-0 right-[-4px] max-w-7 max-h-7"
            />
        </div>
    );
};

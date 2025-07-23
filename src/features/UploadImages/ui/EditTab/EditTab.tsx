import { useAppDispatch } from '@/app/store';
import { setPhotos } from '@/app/store/auth/authSlice';
import { Button } from '@/shared/UI/Button/ui/Button';
import { Input } from '@/shared/UI/Input/Input';
import { Modal } from '@/shared/UI/Modal';
import { useEffect, useMemo, useState } from 'react';

interface IEditTab {
    images?: string[];
    setImages?: (val: string[]) => void;
}

export const EditTab = ({ images, setImages }: IEditTab) => {
    //STATE
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    //RTK
    const dispatch = useAppDispatch();

    //MEMO
    const filteredImages = useMemo(() => {
        return (images ?? []).filter((img) => img !== null && img !== '');
    }, [images]);

    // EFFECT
    useEffect(() => {
        const storedImages = JSON.parse(sessionStorage.getItem('images') || '[]');
        if (storedImages.length > 0) {
            setImages(storedImages);
        }
    }, []);

    // FUNCTION
    const handleImageChange = (index: number, file: File | string | null) => {
        const updatedImages = [...images];

        if (file) {
            if (typeof file === 'string') {
                updatedImages[index] = file;
                setImages?.(updatedImages);
                setIsWarning(false);
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string;
                    updatedImages[index] = base64;
                    const filtered = updatedImages.filter((img) => img && img.trim() !== '');
                    setImages?.(filtered);
                    sessionStorage.setItem('images', JSON.stringify(filtered));
                    setIsWarning(false);
                };
                reader.readAsDataURL(file);
            }
        } else {
            updatedImages[index] = '';
            const filtered = updatedImages.filter((img) => img && img.trim() !== '');
            setImages?.(filtered);
            sessionStorage.setItem('images', JSON.stringify(filtered));
            if (!filtered.length) setIsWarning(true);
        }
    };

    const handleAddMedia = () => {
        if (!filteredImages.length) return setIsWarning(true);
        sessionStorage.setItem('images', JSON.stringify(filteredImages));
        setIsOpenModal(true);
        dispatch(setPhotos(filteredImages));
        setTimeout(() => setIsOpenModal(false), 1000);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 justify-center max-w-100 mx-auto px-2 py-2.5">
                {[...Array(9)].map((_, index) => (
                    <Input.Image
                        key={index}
                        selectedImage={images[index] || null}
                        onImageChange={(file) => handleImageChange(index, file)}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-7 items-center">
                <p className="text-[15px] text-dark-gray-blue text-center font-medium px-3">
                    Add a video, pic or Loop to get 4% closer to completing your profile and you may
                    even get more Likes.
                </p>
                <div className="flex flex-col items-center gap-1 w-full ">
                    <Button
                        title="Add media"
                        className="w-full max-w-[312px]"
                        onClick={handleAddMedia}
                    />
                    {isWarning && (
                        <span className="text-red-400 font-medium ">
                            Please add at least one image
                        </span>
                    )}
                </div>
                <div className="flex justify-between w-full bg-primary px-4 py-3 mb-3 border-t border-b border-gray-blue-muted">
                    <span className="text-graphite">Smart Photos</span>
                    <Input.Checkbox />
                </div>
            </div>
            <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <p className="text-bright-red font-bold text-center text-xl">
                    Photos have been added successfully!
                </p>
            </Modal>
        </div>
    );
};

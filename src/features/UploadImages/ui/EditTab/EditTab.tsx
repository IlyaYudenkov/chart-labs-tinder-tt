import { Button } from '@/shared/UI/Button/ui/Button';
import { Input } from '@/shared/UI/Input/Input';
import { useEffect, useMemo, useState } from 'react';

interface IEditTab {
    images?: string[];
    setImages?: (val: string[]) => void;
}

export const EditTab = ({ images, setImages }: IEditTab) => {
    //STATE
    const [isWarning, setIsWarning] = useState<boolean>(false);

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
                setImages(updatedImages);
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Image = reader.result as string;
                    updatedImages[index] = base64Image;
                    setImages(updatedImages);
                };
                reader.readAsDataURL(file);
            }
            setIsWarning(false);
        } else {
            updatedImages[index] = '';
            setImages(updatedImages);
            sessionStorage.setItem('images', JSON.stringify(updatedImages));
            if (!filteredImages.length) return setIsWarning(true);
        }
    };

    const handleAddMedia = () => {
        sessionStorage.setItem('images', JSON.stringify(images));
        if (!filteredImages.length) return setIsWarning(true);
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-2 px-2 py-2.5">
                {images.map((img, index) => (
                    <Input.Image
                        key={index}
                        selectedImage={img}
                        onImageChange={(file) => handleImageChange(index, file)}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-7 items-center">
                <p className="text-[15px] text-dark-gray-blue text-center font-medium">
                    Add a video, pic or Loop to get 4% closer to completing your profile and you may
                    even get more Likes.
                </p>
                <div className="flex flex-col items-center gap-1 w-full">
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
        </div>
    );
};

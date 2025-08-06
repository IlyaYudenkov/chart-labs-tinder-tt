import { useRef, useState } from 'react';
import { SliderProgressBar } from '../components/SliderProgressBar';
import { SlideOverlay } from '../components/SlideOverlay';

interface ISwipeSlider {
    images?: string[];
    name?: string;
    age?: string;
    isVerified?: boolean;
    hasHelpIcon?: boolean;
}

export const DefaultSwipeSlider = ({
    images,
    name,
    age,
    isVerified,
    hasHelpIcon,
}: ISwipeSlider) => {
    //STATE
    const [index, setIndex] = useState<number>(0);

    //REF
    const startX = useRef(0);
    const endX = useRef(0);

    //FUNCTION
    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!images) return;
        const distance = startX.current - endX.current;
        if (distance > 50 && index < images?.length - 1) {
            setIndex((prev) => prev + 1);
        } else if (distance < -50 && index > 0) {
            setIndex((prev) => prev - 1);
        }
    };

    if (!images) return;

    return (
        <div className="flex justify-center items-center relative w-full h-full overflow-hidden rounded-[8px] bg-white touch-pan-x">
            {images[index] && (
                <div
                    className="absolute inset-0 z-0 scale-[1.1] bg-cover bg-center blur-[24px]"
                    style={{ backgroundImage: `url(${images[index]})` }}
                />
            )}

            <div className="absolute inset-0 bg-black/30 z-0" />

            <SliderProgressBar activeIndex={index} total={images?.length} />

            <div
                className="flex h-full transition-transform duration-300 ease-in-out relative z-10"
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="flex-none w-full h-full flex items-center justify-center relative overflow-hidden"
                    >
                        <img
                            src={src}
                            alt={`slide-${i}`}
                            className="w-full h-full object-contain rounded-[8px]"
                        />
                        <SlideOverlay
                            name={name}
                            age={age}
                            isVerified={isVerified}
                            hasHelpIcon={hasHelpIcon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

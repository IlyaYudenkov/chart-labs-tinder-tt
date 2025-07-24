import { useRef, useState } from 'react';
import { SliderProgressBars } from '../../SliderProgressBar';
import { SlideOverlay } from '../components/SlideOverlay';

interface ISlider {
    images?: string[];
    name?: string;
    age?: number;
    passions?: string[];
    isVerified?: boolean;
    hasHelpIcon?: boolean;
}

export const Slider = ({ images, name, age, passions, isVerified, hasHelpIcon }: ISlider) => {
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
        const distance = startX.current - endX.current;
        if (distance > 50 && index < images.length - 1) {
            setIndex((prev) => prev + 1);
        } else if (distance < -50 && index > 0) {
            setIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="relative w-full h-screen max-h-[85vh] overflow-hidden bg-primary touch-pan-x rounded-[8px]">
            <SliderProgressBars
                activeIndex={index}
                total={images.length}
                className="h-1 absolute top-0 left-0 w-full px-2.5 pt-1 z-10"
                classNameEl="h-1"
            />
            <div
                className="flex h-full transition-transform duration-300 ease-in-out"
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
                            className="w-full h-full object-contain max-w-full max-h-full rounded-[8px]"
                        />
                        <SlideOverlay
                            name={name}
                            age={age}
                            passions={passions}
                            isVerified={isVerified}
                            hasHelpIcon={hasHelpIcon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

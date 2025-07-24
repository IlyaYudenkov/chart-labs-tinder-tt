import { useRef, useState } from 'react';
import { SlideOverlay } from '../components/SlideOverlay';
import { SlideActionBar } from '../components/SlideActionBar';
import { SliderProgressBars } from '../components/SliderProgressBar';

interface ISwipeSlider {
    images?: string[];
    name?: string;
    age?: number;
    passions?: string[];
    isVerified?: boolean;
    hasHelpIcon?: boolean;
    hasActionBar?: boolean;
}

export const SwipeSlider = ({
    images,
    name,
    age,
    passions,
    isVerified,
    hasHelpIcon,
    hasActionBar,
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
        const distance = startX.current - endX.current;
        if (distance > 50 && index < images.length - 1) {
            setIndex((prev) => prev + 1);
        } else if (distance < -50 && index > 0) {
            setIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="relative w-full h-screen max-h-[670px] overflow-hidden rounded-[8px] bg-primary touch-pan-x">
            {images[index] && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${images[index]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(24px)',
                        transform: 'scale(1.1)',
                    }}
                />
            )}

            <div className="absolute inset-0 bg-black/30 z-0" />

            <SliderProgressBars
                activeIndex={index}
                total={images.length}
                className="h-1 absolute top-0 left-0 w-full px-2.5 pt-1 z-10"
                classNameEl="h-1"
            />

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
                {hasActionBar && <SlideActionBar />}
            </div>
        </div>
    );
};

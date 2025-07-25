import { IUser } from '@/entities/User/model/user.model';
import { useMemo, useRef, useState } from 'react';
import { SliderProgressBars } from '../components/SliderProgressBar';
import { SlideOverlay } from '../components/SlideOverlay';

interface ISwipeSlider {
    users?: IUser[];
    hasHelpIcon?: boolean;
    hasActionBar?: boolean;
    hasProgressBar?: boolean;
}

export const SwipeSlider = ({
    users = [],
    hasHelpIcon,
    hasActionBar,
    hasProgressBar,
}: ISwipeSlider) => {
    const [index, setIndex] = useState(0);
    const startX = useRef(0);
    const endX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const distance = startX.current - endX.current;
        if (distance > 50 && index < users.length - 1) {
            setIndex((prev) => prev + 1);
        } else if (distance < -50 && index > 0) {
            setIndex((prev) => prev - 1);
        }
    };

    const currentUser = useMemo(() => users[index], [users, index]);

    return (
        <div className="relative w-full h-screen max-h-[670px] overflow-hidden rounded-[8px] bg-primary touch-pan-x">
            {currentUser && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${currentUser.photoUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(24px)',
                        transform: 'scale(1.1)',
                    }}
                />
            )}

            <div className="absolute inset-0 bg-black/30 z-0" />

            {hasProgressBar && (
                <SliderProgressBars activeIndex={index} total={currentUser.photoUrl.length} />
            )}

            <div
                className="flex h-full transition-transform duration-300 ease-in-out relative z-10"
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {users.map((user, i) => (
                    <div
                        key={user.id}
                        className="flex-none w-full h-full flex items-center justify-center relative overflow-hidden"
                    >
                        <img
                            src={user.photoUrl}
                            alt={`slide-${i}`}
                            className="w-full h-full object-contain max-w-full max-h-full rounded-[8px]"
                        />

                        <SlideOverlay
                            userId={currentUser.id}
                            name={currentUser.name}
                            age={currentUser.age}
                            passions={currentUser.passions}
                            isVerified={currentUser.isVerified}
                            hasHelpIcon={hasHelpIcon}
                            hasActionBar={hasActionBar}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

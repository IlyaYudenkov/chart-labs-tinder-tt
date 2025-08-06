import { cls } from '@/shared/lib/classes.lib';

interface ISliderProgressBar {
    className?: string;
    classNameEl?: string;
    total: number;
    activeIndex: number;
}

export const SliderProgressBar = ({
    className,
    classNameEl,
    total,
    activeIndex,
}: ISliderProgressBar) => {
    return (
        <div
            className={cls(
                `flex gap-1 absolute top-0 left-0 w-full h-1 px-2.5 pt-1 z-20`,
                className,
            )}
        >
            {Array.from({ length: total }).map((_, idx) => (
                <div
                    key={idx}
                    className={cls(
                        `flex-1 h-1 rounded-full transition-all duration-300`,
                        idx < activeIndex
                            ? 'bg-white'
                            : idx === activeIndex
                              ? 'bg-dark-gray-blue'
                              : 'bg-white',
                        classNameEl,
                    )}
                />
            ))}
        </div>
    );
};

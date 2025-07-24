import { cls } from '@/shared/lib/classes.lib';

interface ISliderProgressBar {
    className?: string;
    classNameEl?: string;
    total: number;
    activeIndex: number;
}

export const SliderProgressBars = ({
    className,
    classNameEl,
    total,
    activeIndex,
}: ISliderProgressBar) => {
    return (
        <div className={cls(`flex gap-1 w-full`, className)}>
            {Array.from({ length: total }).map((_, idx) => (
                <div
                    key={idx}
                    className={cls(
                        `rounded-full flex-1 transition-all duration-300`,
                        idx < activeIndex
                            ? 'bg-primary'
                            : idx === activeIndex
                              ? 'bg-dark-gray-blue'
                              : 'bg-primary',
                        classNameEl,
                    )}
                />
            ))}
        </div>
    );
};

import { Button } from '@/shared/UI/Button/ui/Button';
import { EButtonVariants } from '@/shared/UI/Button/model/button.model';

import RewindIcon from '@/shared/assets/images/Rewind/RewindIcon.svg';
import DislikeIcon from '@/shared/assets/images/Dislike/DislikeIcon.svg';
import SuperlikeIcon from '@/shared/assets/images/Superlike/SuperlikeIcon.svg';
import LikeIcon from '@/shared/assets/images/Like/Like.svg';
import BoostIcon from '@/shared/assets/images/Boost/BoostIcon.svg';
import { useMemo } from 'react';

interface ISlideActionBar {
    userId: number;
    onLike: () => void;
    onDislike: () => void;
    onRewind: () => void;
    onSuperlike: () => void;
}

export const SlideActionBar = ({
    userId,
    onLike,
    onDislike,
    onRewind,
    onSuperlike,
}: ISlideActionBar) => {
    const SLIDE_ACTION_BUTTONS = useMemo(() => {
        return [
            {
                id: 1,
                icon: RewindIcon,
                label: 'Rewind',
                iconSizes: { width: 46, height: 46 },
                onClick: onRewind,
                isPressedStyle: 'rotate-[-90deg]',
            },
            {
                id: 2,
                icon: DislikeIcon,
                label: 'Dislike',
                iconSizes: { width: 58, height: 58 },
                onClick: onDislike,
                isPressedStyle: 'rotate-[-360deg] duration-500',
            },
            {
                id: 3,
                icon: SuperlikeIcon,
                label: 'Superlike',
                iconSizes: { width: 46, height: 46 },
                onClick: onSuperlike,
                isPressedStyle: 'scale-200',
            },
            {
                id: 4,
                icon: LikeIcon,
                label: 'Like',
                iconSizes: { width: 58, height: 58 },
                onClick: onLike,
                isPressedStyle: 'animate-ping',
            },
            {
                id: 5,
                icon: BoostIcon,
                label: 'Boost',
                iconSizes: { width: 40, height: 40 },
                onClick: () => {},
                isPressedStyle: '',
            },
        ];
    }, [userId]);

    return (
        <div className="flex px-4 py-3 w-full bg-secondary z-20 select-none">
            <div className="flex justify-between items-center w-full">
                {SLIDE_ACTION_BUTTONS.map((btn) => (
                    <Button
                        key={btn.id}
                        icon={btn.icon}
                        onClick={btn.onClick}
                        iconSizes={btn.iconSizes}
                        variant={EButtonVariants.DEFAULT}
                        className="duration-200 ease-in-out active:scale-90"
                        isPressedStyle={btn.isPressedStyle}
                    />
                ))}
            </div>
        </div>
    );
};

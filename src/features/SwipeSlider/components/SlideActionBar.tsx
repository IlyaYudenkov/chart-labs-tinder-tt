import RewindIcon from '@/shared/assets/images/Rewind/RewindIcon.svg';
import DislikeIcon from '@/shared/assets/images/Dislike/DislikeIcon.svg';
import SuperlikeIcon from '@/shared/assets/images/Superlike/SuperlikeIcon.svg';
import LikeIcon from '@/shared/assets/images/Like/Like.svg';
import BoostIcon from '@/shared/assets/images/Boost/BoostIcon.svg';
import { Button } from '@/shared/UI/Button/ui/Button';
import { EButtonVariants } from '@/shared/UI/Button/model/button.model';

interface ISlideActionBar {
    userId: number;
}

export const SlideActionBar = ({ userId }: ISlideActionBar) => {
    const handleLike = (userId: number) => {};

    const handleDislike = (userId: number) => {};

    const handleSuperLike = (userId: number) => {};

    const SLIDE_ACTION_BUTTONS = [
        {
            id: 1,
            icon: RewindIcon,
            label: 'Rewind',
            iconSizes: { width: 46, height: 46 },
            onClick: () => {},
        },
        {
            id: 2,
            icon: DislikeIcon,
            label: 'Dislike',
            iconSizes: { width: 58, height: 58 },
            onClick: () => handleDislike(userId),
        },
        {
            id: 3,
            icon: SuperlikeIcon,
            label: 'Superlike',
            iconSizes: { width: 46, height: 46 },
            onClick: () => handleSuperLike(userId),
        },
        {
            id: 4,
            icon: LikeIcon,
            label: 'Like',
            iconSizes: { width: 58, height: 58 },
            onClick: () => handleLike(userId),
        },
        {
            id: 5,
            icon: BoostIcon,
            label: 'Boost',
            iconSizes: { width: 40, height: 40 },
            onClick: () => {},
        },
    ];

    return (
        <div className="flex justify-between mx-auto w-full px-4 py-3 z-20 bg-secondary">
            <div className="flex justify-between items-center w-full">
                {SLIDE_ACTION_BUTTONS.map((btn) => (
                    <Button
                        key={btn.id}
                        icon={btn.icon}
                        onClick={btn.onClick}
                        iconSizes={{ width: btn.iconSizes.width, height: btn.iconSizes.height }}
                        variant={EButtonVariants.default}
                        className="active:scale-70"
                    />
                ))}
            </div>
        </div>
    );
};

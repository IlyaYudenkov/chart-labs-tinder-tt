import VerifiedIcon from '@/shared/assets/images/Verified/VerifiedIcon.svg';
import HelpIcon from '@/shared/assets/images/Help/HelpIcon.svg';
import { SlideActionBar } from './SlideActionBar';
import { PassionItem } from '@/entities/Passion/components/PassionItem/PassionItem';

interface ISlideOverlay {
    userId?: number;
    name: string;
    age: string;
    isVerified?: boolean;
    hasHelpIcon?: boolean;
    hasPassions?: boolean;
    passions?: string[];
    onLike?: () => void;
    onDislike?: () => void;
    onSuperlike?: () => void;
    onRewind?: () => void;
}

export const SlideOverlay = ({
    userId,
    name,
    age,
    isVerified,
    hasPassions,
    passions,
    hasHelpIcon,
    onLike,
    onDislike,
    onSuperlike,
    onRewind,
}: ISlideOverlay) => {
    return (
        <div className="flex flex-col absolute bottom-0 left-0 w-full ">
            <div className="flex flex-col gap-10 p-4 bg-gradient-to-t from-secondary via-transparent to-transparent">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <p className="text-primary text-[32px] font-bold">
                            {name}&nbsp;
                            <span className="text-primary text-2xl font-normal ">{age}</span>
                        </p>
                        {isVerified && <img src={VerifiedIcon} alt="verified" />}
                    </div>
                    {hasHelpIcon && <img src={HelpIcon} alt="help" />}
                </div>
                {hasPassions && !!passions?.length && (
                    <div className="flex flex-wrap gap-1 ">
                        {passions.map((passion) => (
                            <PassionItem key={passion} label={passion} />
                        ))}
                    </div>
                )}
            </div>
            {userId && (
                <SlideActionBar
                    userId={userId}
                    onDislike={onDislike}
                    onLike={onLike}
                    onRewind={onRewind}
                    onSuperlike={onSuperlike}
                />
            )}
        </div>
    );
};

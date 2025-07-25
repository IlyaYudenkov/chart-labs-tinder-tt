import VerifiedIcon from '@/shared/assets/images/Verified/VerifiedIcon.svg';
import HelpIcon from '@/shared/assets/images/Help/HelpIcon.svg';
import { SlideActionBar } from './SlideActionBar';
import { PassionItem } from '@/entities/Passion/components/PassionItem/PassionItem';

interface ISlideOverlay {
    userId: number;
    name: string;
    age: string;
    isVerified?: boolean;
    hasHelpIcon?: boolean;
    hasActionBar?: boolean;
    passions?: string[];
}

export const SlideOverlay = ({
    userId,
    name,
    age,
    isVerified,
    passions,
    hasHelpIcon,
    hasActionBar,
}: ISlideOverlay) => {
    return (
        <div className="flex flex-col absolute bottom-0 left-0 w-full ">
            <div className="flex flex-col gap-10 p-4 bg-gradient-to-t from-secondary via-transparent to-transparent">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <p className="text-gray-blue text-[34px] font-bold">
                            {name}&nbsp;
                            <span className="text-gray-blue text-2xl font-normal ">{age}</span>
                        </p>
                        {isVerified && <img src={VerifiedIcon} alt="verified" />}
                    </div>
                    {hasHelpIcon && <img src={HelpIcon} alt="help" />}
                </div>

                {!!passions.length && (
                    <div className="flex flex-wrap gap-1 ">
                        {passions.map((passion) => (
                            <PassionItem key={passion} label={passion} />
                        ))}
                    </div>
                )}
            </div>
            {hasActionBar && <SlideActionBar userId={userId} />}
        </div>
    );
};

import VerifiedIcon from '@/shared/assets/images/Verified/VerifiedIcon.svg';
import HelpIcon from '@/shared/assets/images/Help/HelpIcon.svg';

interface ISlideOverlay {
    name: string;
    age: number;
    isVerified?: boolean;
    hasHelpIcon?: boolean;
    passions?: string[];
}

export const SlideOverlay = ({ name, age, isVerified, passions, hasHelpIcon }: ISlideOverlay) => {
    return (
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <p className="text-gray-blue text-[34px] font-bold">
                        {name} <span className="text-gray-blue text-2xl font-normal ">{age}</span>
                    </p>
                    {isVerified && <img src={VerifiedIcon} alt="verified" />}
                </div>
                {hasHelpIcon && <img src={HelpIcon} alt="help" />}
            </div>

            <div className="flex flex-wrap max-w-40" />
        </div>
    );
};

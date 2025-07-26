import { EButtonType, EButtonVariants } from '@/shared/UI/Button/model/button.model';
import { Button } from '@/shared/UI/Button/ui/Button';

interface IPassionButton {
    label: string;
    disabled?: boolean;
    isSelected: boolean;
    onClick: () => void;
}

export const PassionButton = ({ label, isSelected, onClick, disabled }: IPassionButton) => {
    return (
        <Button
            type={EButtonType.BUTTON}
            variant={EButtonVariants.DEFAULT}
            onClick={onClick}
            title={label}
            disabled={disabled}
            className={`px-4 pt-1 pb-1.5 rounded-full border border-gray-blue-light text-[15px] font-medium transition-colors duration-300 ease-in-out
            ${isSelected ? 'bg-gradient-red-to-orange text-primary border-transparent' : 'bg-primary text-dark-gray-blue'}
            ${disabled ? 'bg-gray-blue-disabled' : ''}`}
        />
    );
};

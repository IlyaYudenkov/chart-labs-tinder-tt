import { Link } from 'react-router-dom';
import { EButtonType, EButtonVariants, IIconSizes } from '../model/button.model';
import { cls } from '@/shared/lib/classes.lib';
import { useState } from 'react';

interface IButton {
    className?: string;
    classNameLink?: string;
    variant?: EButtonVariants;
    href?: string;
    title?: string;
    disabled?: boolean;
    dataHover?: string;
    icon?: string;
    iconSizes?: IIconSizes;
    type?: EButtonType;
    isPressedStyle?: string;

    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const Button = ({
    className,
    classNameLink,
    variant = EButtonVariants.GRADIENT,
    href,
    title,
    disabled,
    dataHover,
    icon,
    iconSizes,
    type = EButtonType.SUBMIT,
    isPressedStyle,

    onClick,
    onMouseEnter,
    onMouseLeave,
}: IButton) => {
    //STATE
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handleTouchStart = () => {
        setIsPressed(true);
    };

    const handleTouchEnd = () => {
        setIsPressed(false);
    };
    const html = (
        <button
            className={cls(
                'flex justify-center items-center duration-200 ease-in-out',
                className,
                variant,
                isPressed && isPressedStyle,
            )}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-hover={dataHover}
            type={type}
            disabled={disabled}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {title}
            {icon && (
                <img width={iconSizes?.width} height={iconSizes?.height} src={icon} alt="icon" />
            )}
        </button>
    );

    if (!href) return html;

    return (
        <Link className={classNameLink} to={!disabled ? href : '...'}>
            {html}
        </Link>
    );
};

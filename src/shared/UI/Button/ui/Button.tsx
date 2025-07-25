import { Link } from 'react-router-dom';
import { EButtonType, EButtonVariants, IIconSizes } from '../model/button.model';
import { cls } from '@/shared/lib/classes.lib';

interface IButton {
    className?: string;
    variant?: EButtonVariants;
    href?: string;
    title?: string;
    disabled?: boolean;
    dataHover?: string;
    icon?: string;
    iconSizes?: IIconSizes;
    type?: EButtonType;

    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const Button = ({
    className,
    variant = EButtonVariants.gradient,
    href,
    title,
    disabled,
    dataHover,
    icon,
    iconSizes,
    type = EButtonType.SUBMIT,

    onClick,
    onMouseEnter,
    onMouseLeave,
}: IButton) => {
    const html = (
        <button
            className={cls(
                'flex justify-center items-center duration-200 ease-in-out',
                className,
                variant,
            )}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-hover={dataHover}
            type={type}
            disabled={disabled}
        >
            {title}
            {icon && (
                <img width={iconSizes?.width} height={iconSizes?.height} src={icon} alt="icon" />
            )}
        </button>
    );

    if (!href) return html;

    return <Link to={!disabled ? href : '...'}>{html}</Link>;
};

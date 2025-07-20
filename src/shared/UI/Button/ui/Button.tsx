import { Link } from "react-router-dom"
import { EButtonType } from "../model/button.model"

interface IButton {
    href?: string
    title?: string,
    disabled?: boolean
    dataHover?: string,
    icon?: string,
    type?: EButtonType

    onClick?: () => void,
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}


export const Button = ({
    href,
    title,
    disabled,
    dataHover,
    icon,
    type = EButtonType.SUBMIT,

    onClick,
    onMouseEnter,
    onMouseLeave
}: IButton) => {
    const html = (
        <button
            className={!icon ? 'bg-gradient-to-r from-[#FD267A] to-[#FF6036] rounded-[22px] p-2 font-bold text-primary' : ''}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-hover={dataHover}
            type={type}
        >
            {title}
            {icon && <img src={icon} alt="icon"/>}
        </button>
    )

    if (!href) return html;

    return (
        <Link to={!disabled ? href : '...'}>
            {html}
        </Link>
    )
}
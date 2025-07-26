export enum EButtonType {
    SUBMIT = 'submit',
    RESET = 'reset',
    BUTTON = 'button',
}

export enum EButtonVariants {
    DEFAULT = '',
    GRADIENT = 'bg-gradient-red-to-orange rounded-[22px] p-2 font-bold text-primary active:scale-98 active:brightness-95 transition-transform transition-filter',
    PLUS = 'bg-gradient-red-to-orange border border-primary rounded-full p-[5px] font-bold text-primary active:brightness-95 transition-transform transition-filter',
    X_MARK = 'bg-primary border rounded-full  border border-gray-blue-light p-[5px]',
}

export interface IIconSizes {
    width: number;
    height: number;
}

import { ChangeEvent } from 'react';

interface IInputText {
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (val: string) => void;
    name?: string;
    warningText?: string;
    isWarning?: boolean;
    setIsWarning?: (val: boolean) => void;
}

export const InputText = ({
    placeholder,
    type = 'text',
    value,
    onChange,
    name,
    warningText,
    isWarning,
    setIsWarning,
}: IInputText) => {
    //FUNCTION
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        if (setIsWarning) setIsWarning(false);
    };

    return (
        <>
            <input
                className={`px-3.5 py-3 bg-gray-light border rounded-lg border-gray-blue
                    transition-colors duration-300 ease-in-out focus:outline-none focus:border-orange-400
                    ${isWarning ? 'border-red-400' : ''}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                name={name}
            />
            {isWarning && warningText && (
                <span className="text-red-400 font-medium mb-[-23px]">{warningText}</span>
            )}
        </>
    );
};

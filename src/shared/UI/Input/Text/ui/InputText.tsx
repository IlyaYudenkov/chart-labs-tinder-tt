import { ChangeEvent } from 'react';
import { EInputTextTypes } from '../model/inputText.model';

interface IInputText {
    placeholder?: string;
    type?: EInputTextTypes;
    value?: string | number;
    onChange?: (val: string) => void;
    name?: string;
    warningText?: string;
    setWarningText?: (val: string) => void;
}

export const InputText = ({
    placeholder,
    type = EInputTextTypes.TEXT,
    value,
    onChange,
    name,
    warningText,
    setWarningText,
}: IInputText) => {
    //FUNCTION
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        if (setWarningText) setWarningText('');
    };

    return (
        <>
            <input
                className={`px-3.5 py-3 bg-gray-light border rounded-lg border-gray-blue
                    transition-colors duration-300 ease-in-out focus:outline-none focus:border-orange-400
                    ${warningText ? 'border-red-400' : ''}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                name={name}
            />
            {warningText && <span className="text-red-400 font-medium ">{warningText}</span>}
        </>
    );
};

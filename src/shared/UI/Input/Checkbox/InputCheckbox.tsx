import { useEffect, useState } from 'react';

interface IInputCheckbox {
    isChecked?: boolean;
}

export const InputCheckbox = ({ isChecked }: IInputCheckbox) => {
    //STATE
    const [isOn, setIsOn] = useState<boolean>(false);

    //EFFECT
    useEffect(() => {
        setIsOn(isChecked);
    }, [isChecked]);

    return (
        <button
            onClick={() => setIsOn(!isOn)}
            className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300
        ${isOn ? 'bg-gradient-red-to-orange' : 'bg-gray-blue-muted'}`}
        >
            <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300
          ${isOn ? 'translate-x-5' : 'translate-x-0'}`}
            />
        </button>
    );
};

import { useAppDispatch, useAppSelector } from '@/app/store';
import { setAge, setName } from '@/app/store/auth/authSlice';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { Button } from '@/shared/UI/Button/ui/Button';
import { Input } from '@/shared/UI/Input/Input';
import { EInputTextTypes } from '@/shared/UI/Input/Text/model/inputText.model';
import {
    ERROR_ENTER_AGE,
    ERROR_ENTER_NAME,
    ERROR_INVALID_AGE,
} from '@/shared/data/inputError.data';
import { AGE_SS_KEY, CURRENT_STEP_INDEX_SS_KEY, NAME_SS_KEY } from '@/shared/data/ssKeys.data';
import { FormEvent, useEffect, useState } from 'react';

export const NameAgeInputForm = () => {
    // RTK
    const dispatch = useAppDispatch();
    const { name: userNameRTK, age: ageRTK } = useAppSelector((state) => state.auth);

    // STATE
    const [userName, setUserName] = useState<string>(userNameRTK || '');
    const [userAge, setUserAge] = useState<string>(ageRTK || '');
    const [userNameWarning, setUserNameWarning] = useState<string>('');
    const [userAgeWarning, setUserAgeWarning] = useState<string>('');

    //EFFECT
    useEffect(() => {
        const storedName = sessionStorage.getItem(NAME_SS_KEY);
        const storedAge = sessionStorage.getItem(AGE_SS_KEY);

        if (storedName) {
            dispatch(setName(storedName));
            setUserName(storedName);
        }
        if (storedAge) {
            dispatch(setAge(storedAge));
            setUserAge(storedAge);
        }
    }, []);

    // FUNCTION
    const handleSaveNameAge = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userName.trim()) return setUserNameWarning(ERROR_ENTER_NAME);
        if (!userAge.trim()) return setUserAgeWarning(ERROR_ENTER_AGE);

        if (+userAge > 100 || +userAge <= 15) return setUserAgeWarning(ERROR_INVALID_AGE);

        setUserNameWarning('');
        setUserAgeWarning('');

        dispatch(setName(userName));
        dispatch(setAge(userAge));
        dispatch(setCurrentStepIndex(1));

        sessionStorage.setItem(NAME_SS_KEY, userName);
        sessionStorage.setItem(AGE_SS_KEY, userAge);
        sessionStorage.setItem(CURRENT_STEP_INDEX_SS_KEY, String(1));
    };
    return (
        <form className="flex flex-col px-6" onSubmit={handleSaveNameAge}>
            <h2 className="text-secondary text-[28px] font-bold mt-4 mb-7">My first name is</h2>
            <div className="flex flex-col gap-3 justify-center w-full mb-4">
                <Input.Text
                    placeholder="Enter your name"
                    value={userName}
                    onChange={setUserName}
                    warningText={userNameWarning}
                    setWarningText={setUserNameWarning}
                />
                <Input.Text
                    placeholder="Enter your age"
                    type={EInputTextTypes.NUMBER}
                    value={userAge}
                    onChange={setUserAge}
                    warningText={userAgeWarning}
                    setWarningText={setUserAgeWarning}
                />
            </div>
            <div className="flex flex-col">
                <span className="text-dark-gray-blue text-[15px] font-medium">
                    This is how it will appear in Tinder
                </span>
                <Button title="Continue" />
            </div>
        </form>
    );
};

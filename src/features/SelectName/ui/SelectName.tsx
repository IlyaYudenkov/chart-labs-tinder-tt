import { useAppDispatch, useAppSelector } from '@/app/store';
import { setName } from '@/app/store/auth/authSlice';
import { setCurrentStepIndex } from '@/app/store/step/stepSlice';
import { Button } from '@/shared/UI/Button/ui/Button';
import { Input } from '@/shared/UI/Input/Input';
import { FormEvent, useEffect, useState } from 'react';

export const SelectName = () => {
    // RTK
    const dispatch = useAppDispatch();
    const { currentStepIndex } = useAppSelector((state) => state.step);
    const { name: userNameRTK } = useAppSelector((state) => state.auth);

    // STATE
    const [userName, setUserName] = useState(userNameRTK || '');
    const [isNameWarning, setIsNameWarning] = useState<boolean>(false);

    //EFFECT
    useEffect(() => {
        const storedName = sessionStorage.getItem('name');
        if (storedName) {
            dispatch(setName(storedName));
            setUserName(storedName);
        }
    }, [dispatch]);

    // FUNCTION
    const handleSaveName = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userName.trim()) return setIsNameWarning(true);

        if (userName.trim()) {
            setIsNameWarning(false);
            dispatch(setName(userName));
            sessionStorage.setItem('name', userName);
            dispatch(setCurrentStepIndex(currentStepIndex + 1));
            sessionStorage.setItem('currentStepIndex', String(currentStepIndex + 1));
        }
    };
    return (
        <form className="flex flex-col px-6" onSubmit={handleSaveName}>
            <h2 className="text-secondary text-[28px] font-bold mt-4 mb-7">My first name is</h2>
            <Input.Text
                placeholder="Luna"
                name="userName"
                value={userName}
                onChange={setUserName}
                warningText="Please enter the name"
                isWarning={isNameWarning}
                setIsWarning={setIsNameWarning}
            />
            <div className="flex flex-col mt-[23px]">
                <span className="text-dark-gray-blue text-[15px] font-medium">
                    This is how it will appear in Tinder
                </span>
                <Button title="Continue" />
            </div>
        </form>
    );
};

import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/UI/Modal';
import { Button } from '../Button/ui/Button';
import { PUBLIC_PAGES } from '@/app/routes/routes';
import { setIsAuth } from '@/app/store/auth/authSlice';
import { AUTH_SS_KEY } from '@/shared/data/ssKeys.data';

interface IPrivateRoute extends PropsWithChildren {}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
    //RTK
    const { isAuth: isAuthRTK } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    //NAVIGATE
    const navigate = useNavigate();

    //STATE
    const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);

    //EFFECT
    useEffect(() => {
        const isAuth = JSON.parse(sessionStorage.getItem(AUTH_SS_KEY) || 'false');
        dispatch(setIsAuth(isAuth));
        setIsAuthInitialized(true);
        if (isAuth) {
            sessionStorage.getItem('');
        }
    }, []);

    if (!isAuthInitialized) return null;

    if (!isAuthRTK) {
        return (
            <Modal isOpen>
                <div className="flex flex-col items-center">
                    <p className="mb-4 text-center font-bold">
                        This page is available for authorized users only
                    </p>
                    <div className="flex flex-col gap-4 items-center w-full">
                        <div className="flex gap-4 justify-center w-full">
                            <Button
                                href={PUBLIC_PAGES.SIGN_UP.path}
                                title="SIGN UP"
                                classNameLink="w-full"
                                className="w-full"
                            />
                            <Button
                                href={PUBLIC_PAGES.SIGN_IN.path}
                                title="SIGN IN"
                                classNameLink="w-full"
                                className="w-full"
                            />
                        </div>
                        <Button onClick={() => navigate(-1)} title="GET BACK" className="w-[80%]" />
                    </div>
                </div>
            </Modal>
        );
    }

    return <>{children}</>;
};

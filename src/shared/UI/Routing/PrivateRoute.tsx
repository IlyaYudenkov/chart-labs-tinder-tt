import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/UI/Modal';
import { Button } from '../Button/ui/Button';
import { PUBLIC_PAGES } from '@/app/routes/routes';
import { setIsAuth } from '@/app/store/auth/authSlice';

interface IPrivateRoute extends PropsWithChildren {}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
    const { isAuth: isAuthRTK } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isAuthInitialized, setIsAuthInitialized] = useState(false);

    useEffect(() => {
        const isAuth = JSON.parse(sessionStorage.getItem('auth') || 'false');
        dispatch(setIsAuth(isAuth));
        setIsAuthInitialized(true);
    }, [dispatch]);

    if (!isAuthInitialized) return null; // или спиннер

    if (!isAuthRTK) {
        return (
            <Modal isOpen>
                <div className="flex flex-col items-center">
                    <p className="mb-4 text-center font-bold">
                        This page is available for authorized users only
                    </p>
                    <div className="flex justify-between w-[70%]">
                        <Button onClick={() => navigate(-1)} title="GET BACK" />
                        <Button href={PUBLIC_PAGES.SIGN_IN.path} title="SIGN IN" />
                    </div>
                </div>
            </Modal>
        );
    }

    return <>{children}</>;
};

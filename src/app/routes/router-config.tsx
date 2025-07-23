import type { RouteProps } from 'react-router-dom';
import { PUBLIC_PAGES } from './routes';
import { SignUpPage } from '../../pages/SignUp/SignUpPage';

export const routes: RouteProps[] = [
    {
        path: PUBLIC_PAGES.SIGN_UP.path,
        element: <SignUpPage />,
    },
];

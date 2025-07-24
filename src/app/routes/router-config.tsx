import type { RouteProps } from 'react-router-dom';
import { PRIVATE_PAGES, PUBLIC_PAGES } from './routes';
import { SignUpPage } from '../../pages/public/SignUp/SignUpPage';
import { ExplorePage } from '@/pages/private/Explore/ExplorePage';
import { SignInPage } from '@/pages/public/SignIn/SignInPage';
import { MainPage } from '@/pages/private/Main/MainPage';
import { MatchesPage } from '@/pages/private/Matches/MatchesPage';
import { ChatsPage } from '@/pages/private/Chats/ChatsPage';
import { ProfilePage } from '@/pages/private/Profile/ProfilePage';

export const publicRoutes: RouteProps[] = [
    {
        path: PUBLIC_PAGES.SIGN_UP.path,
        element: <SignUpPage />,
    },
    {
        path: PUBLIC_PAGES.SIGN_IN.path,
        element: <SignInPage />,
    },
];

export const privateRoutes: RouteProps[] = [
    {
        path: PRIVATE_PAGES.MAIN.path,
        element: <MainPage />,
    },
    {
        path: PRIVATE_PAGES.EXPLORE.path,
        element: <ExplorePage />,
    },
    {
        path: PRIVATE_PAGES.MATCHES.path,
        element: <MatchesPage />,
    },
    {
        path: PRIVATE_PAGES.CHATS.path,
        element: <ChatsPage />,
    },
    {
        path: PRIVATE_PAGES.PROFILE.path,
        element: <ProfilePage />,
    },
];

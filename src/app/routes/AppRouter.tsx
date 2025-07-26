import { Route, Routes } from 'react-router-dom';
import { MobileLayout } from '@/widgets/MobileLayout';
import { privateRoutes, publicRoutes } from './router-config';
import { PrivateRoute } from '@/shared/UI/Routing';

export const AppRouter = () => {
    return (
        <Routes>
            {privateRoutes.map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <PrivateRoute>
                            <MobileLayout>{element}</MobileLayout>
                        </PrivateRoute>
                    }
                />
            ))}

            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={<MobileLayout>{element}</MobileLayout>} />
            ))}
        </Routes>
    );
};

import { Route, Routes } from 'react-router-dom';
import { routes } from './router-config';
import { MobileLayout } from '@/widgets/MobileLayout';

export const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, element }) => {
                return (
                    <Route
                        key={path}
                        path={path}
                        element={<MobileLayout>{element}</MobileLayout>}
                    />
                );
            })}
        </Routes>
    );
};

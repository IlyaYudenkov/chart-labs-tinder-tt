import { Route, Routes } from 'react-router-dom';
import { routes } from './router-config';

export const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, element }) => {
                return <Route key={path} path={path} element={element} />;
            })}
        </Routes>
    );
};

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App = () => {
    //TANSTACK
    const queryClient = new QueryClient();
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
        </BrowserRouter>
    );
};

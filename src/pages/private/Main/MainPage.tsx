import { useUsers } from '@/entities/User/api/users.api';
import { SwipeSlider } from '@/features/SwipeSlider';

export const MainPage = () => {
    //TANSTACK
    const { data: users, isLoading } = useUsers();

    if (isLoading) return <span>Loading...</span>;

    return (
        <main>
            <SwipeSlider users={users} hasActionBar />
        </main>
    );
};

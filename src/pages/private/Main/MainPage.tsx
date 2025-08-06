import { useAppDispatch, useAppSelector } from '@/app/store';
import { setUsers } from '@/app/store/users/usersSlice';
import { useUsers } from '@/entities/User/api/users.api';
import { UsersCardsSwipeSlider } from '@/features/SwipeSlider';
import { Loader } from '@/shared/UI/Loader';
import { useEffect } from 'react';

export const MainPage = () => {
    //TANSTACK
    const { data: users, isLoading } = useUsers();

    //RTK
    const { isUsersLoaded } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        if (!isUsersLoaded && users) {
            dispatch(setUsers(users));
        }
    }, [users, isUsersLoaded]);

    if (isLoading || !isUsersLoaded) return <Loader />;

    return (
        <main className="flex flex-col h-full overflow-hidden">
            <UsersCardsSwipeSlider users={users} />
        </main>
    );
};

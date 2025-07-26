import { useAppDispatch, useAppSelector } from '@/app/store';
import { setUsers } from '@/app/store/users/usersSlice';
import { fetchUsers } from '@/entities/User/api/users.api';
import { Loader } from '@/shared/UI/Loader';
import { useEffect } from 'react';

export const ProfilePage = () => {
    //RTK
    const { users } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            dispatch(setUsers(data));
        };

        if (!users.length) {
            loadUsers();
        }
    }, [users.length]);

    if (!users.length) return <Loader />;
    return (
        <main className="flex flex-col gap-2">
            {users.map((user) => (
                <div key={user.id} className="flex flex-col gap-0.5">
                    <span>{user.name}</span>
                    <span>{user.age}</span>
                    <span>{user.photoUrl}</span>
                    <span>Liked: {user.liked === true ? 'true' : 'false'}</span>
                    <span>Disliked: {user.disliked === true ? 'true' : 'false'}</span>
                    <span>Superliked: {user.superLiked === true ? 'true' : 'false'}</span>
                    <span>{user.isVerified}</span>
                </div>
            ))}
        </main>
    );
};

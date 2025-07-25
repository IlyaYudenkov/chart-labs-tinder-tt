import { useQuery } from '@tanstack/react-query';
import { USERS_DATA_ARRAY } from '../data/users.data';
import { IUser } from '../model/user.model';

export const fetchUsers = async (): Promise<IUser[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...USERS_DATA_ARRAY]), 1000);
    });
};

export const useUsers = () => {
    return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
};

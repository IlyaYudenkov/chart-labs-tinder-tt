import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser, UserActionType } from '@/entities/User/model/user.model';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { updateUserAction } from '@/app/store/users/usersSlice';

const setUserAction = async (userId: number, action: UserActionType) => {
    return new Promise<IUser>((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: '',
                age: '',
                photoUrl: '',
                liked: action === 'like',
                disliked: action === 'dislike',
                superLiked: action === 'superLike',
                isVerified: false,
                passions: [],
            });
        }, 300);
    });
};

export const useUserActions = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);

    const mutation = useMutation({
        mutationFn: ({ userId, action }: { userId: number; action: UserActionType }) =>
            setUserAction(userId, action),

        onMutate: async ({ userId, action }) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });

            const prevUsers = queryClient.getQueryData<IUser[]>(['users']);

            dispatch(updateUserAction({ userId, action }));

            const updatedUsers = users.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          liked: action === 'like',
                          disliked: action === 'dislike',
                          superLiked: action === 'superLike',
                      }
                    : user,
            );
            queryClient.setQueryData(['users'], updatedUsers);

            return { prevUsers };
        },

        onError: (_err, _variables, context) => {
            if (context?.prevUsers) {
                queryClient.setQueryData(['users'], context.prevUsers);
                dispatch(
                    updateUserAction({
                        userId: context.prevUsers[0].id,
                        action: '' as UserActionType,
                    }),
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    return mutation;
};

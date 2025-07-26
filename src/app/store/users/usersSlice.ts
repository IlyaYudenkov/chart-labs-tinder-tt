import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, UserActionType } from '@/entities/User/model/user.model';

interface IUsersState {
    users: IUser[];
    isUsersLoaded: boolean;
}

const initialState: IUsersState = {
    users: [],
    isUsersLoaded: false,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<IUser[]>) {
            state.users = action.payload;
            state.isUsersLoaded = true;
        },
        updateUserAction(state, action: PayloadAction<{ userId: number; action: UserActionType }>) {
            const user = state.users.find((u) => u.id === action.payload.userId);
            if (user) {
                user.liked = action.payload.action === 'like';
                user.disliked = action.payload.action === 'dislike';
                user.superLiked = action.payload.action === 'superLike';
            }
        },
    },
});

export const { setUsers, updateUserAction } = usersSlice.actions;
export const UsersReducer = usersSlice.reducer;

export interface ISelfUser {
    name: string;
    age: string;
    passions?: string[];
    isVerified?: boolean;
    photos: string[];
    isAuth?: boolean;
}

export interface IUser extends Omit<ISelfUser, 'photos'> {
    id: number;
    photoUrl: string;
    liked: boolean;
    disliked: boolean;
    superLiked: boolean;
}

export interface IUpdateUserVariables {
    id: number;
    updates: Partial<IUser>;
}

export type UserActionType = 'like' | 'dislike' | 'superLike' | 'rewind';

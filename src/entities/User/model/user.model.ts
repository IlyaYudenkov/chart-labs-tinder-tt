export interface IUser {
    id: number;
    name: string;
    age: string;
    passions?: string[];
    photoUrl: string;
    isVerified?: boolean;
    liked: boolean;
    disliked: boolean;
    superLiked: boolean;
}

export interface IUpdateUserVariables {
    id: number;
    updates: Partial<IUser>;
}

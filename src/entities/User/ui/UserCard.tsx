import cl from './_UserCard.module.scss';
import { IUser, UserActionType } from '@/entities/User/model/user.model';
import { SlideOverlay } from '@/features/SwipeSlider/components/SlideOverlay';
import { cls } from '@/shared/lib/classes.lib';

interface IUserCard {
    user: IUser;
    offset?: number;
    transition?: boolean;
    isTop?: boolean;
    hasHelpIcon?: boolean;
    onTouchStart?: (e: React.TouchEvent) => void;
    onTouchMove?: (e: React.TouchEvent) => void;
    onTouchEnd?: (e: React.TouchEvent) => void;
    handleAction?: (action: UserActionType) => void;
}

export const UserCard = ({
    user,
    offset = 0,
    transition = false,
    isTop = false,
    hasHelpIcon = false,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    handleAction,
}: IUserCard) => {
    const rotation = Math.max(Math.min(offset / 20, 20), -20);

    const style = {
        transform: isTop ? `translateX(${offset}px) rotate(${rotation}deg)` : '',
        transition: `transform ${transition ? '0.5s' : '0s'} ease`,
    };

    return (
        <div
            className={cls(cl.card, isTop ? cl.topCard : cl.bottomCard)}
            style={style}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className={cl.bgBlur} style={{ backgroundImage: `url(${user.photoUrl})` }} />
            <div className={cl.overlay} />

            <div className={cl.imgContainer}>
                <img src={user.photoUrl} alt={user.name} />
            </div>
            <SlideOverlay
                userId={user.id}
                name={user.name}
                age={user.age}
                passions={user.passions}
                isVerified={user.isVerified}
                hasHelpIcon={hasHelpIcon}
                onLike={() => handleAction('like')}
                onDislike={() => handleAction('dislike')}
                onSuperlike={() => handleAction('superLike')}
                onRewind={() => handleAction('rewind')}
            />
        </div>
    );
};

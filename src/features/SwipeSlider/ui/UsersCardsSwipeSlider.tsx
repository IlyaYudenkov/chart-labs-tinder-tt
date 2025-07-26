import { useMemo, useState, useRef, useEffect } from 'react';
import { IUser, UserActionType } from '@/entities/User/model/user.model';
import { UserCard } from '@/entities/User/ui/UserCard';
import { Modal } from '@/shared/UI/Modal';
import { Button } from '@/shared/UI/Button/ui/Button';
import { SliderProgressBar } from '../components/SliderProgressBar';
import { useUserActions } from '@/entities/User/api/user.api';

interface IUsersCardsSwipeSlider {
    users?: IUser[];
}

export const UsersCardsSwipeSlider = ({ users = [] }: IUsersCardsSwipeSlider) => {
    //STATE
    const [index, setIndex] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [transition, setTransition] = useState<boolean>(false);
    const [isRewinding, setIsRewinding] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    //REF
    const touchStartX = useRef<number | null>(null);

    //TANSTACK
    const { mutate } = useUserActions();

    //MEMO
    const currentUser = useMemo(() => {
        if (!users.length || index >= users.length) return null;
        return users[index];
    }, [users, index]);

    const nextUser = useMemo(() => users[index + 1], [users, index]);
    const previousUser = useMemo(() => users[index - 1], [users, index]);

    //EFFECT
    useEffect(() => {
        if (!currentUser) setIsOpenModal(true);
    }, [currentUser]);

    //FUNCTIONS
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].clientX;
        setTransition(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        setOffset(delta);
    };

    const handleAction = (action: UserActionType) => {
        if (action === 'rewind' && index === 0) return;

        const direction =
            action === 'like' || action === 'superLike' ? 1000 : action === 'dislike' ? -1000 : 0;
        const isRewind = action === 'rewind';
        const isSuperlike = action === 'superLike';

        const swipeDelay = isSuperlike ? 2500 : 900;

        setTimeout(() => {
            if (isRewind) {
                setIsRewinding(true);
                setOffset(-1000);
            } else {
                setOffset(direction);
            }
            setTransition(true);
        }, swipeDelay - 200);

        setTimeout(() => {
            setIndex((prev) => (isRewind ? prev - 1 : prev + 1));
            setOffset(0);
            setTransition(false);

            if (isRewind) {
                setIsRewinding(false);
            }
        }, swipeDelay);

        mutate({ userId: currentUser.id, action });
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null) return;

        const threshold = 80;

        if (offset < -threshold || offset > threshold) {
            setTransition(true);
            setOffset(offset > 0 ? 1000 : -1000);

            const action: UserActionType = offset < -threshold ? 'dislike' : 'like';
            mutate({ userId: currentUser.id, action });

            setTimeout(() => {
                setIndex((prev) => prev + 1);
                setOffset(0);
                setTransition(false);
            }, 250);
        } else {
            setTransition(true);
            setOffset(0);
        }

        touchStartX.current = null;
    };

    const handleCloseModal = () => {
        setIndex(0);
        setIsOpenModal(false);
    };

    return (
        <div className="relative w-full h-full overflow-hidden rounded-[8px] bg-gray-blue-light touch-pan-x">
            <SliderProgressBar activeIndex={index} total={users.length} />
            {/* NEXT USER */}
            {!isRewinding && nextUser && <UserCard user={nextUser} hasHelpIcon />}

            {/* PREVIOUS USER */}
            {isRewinding && previousUser && (
                <UserCard user={previousUser} isTop={false} transition={true} hasHelpIcon />
            )}

            {/* CURRENT USER */}
            {currentUser && (
                <UserCard
                    user={currentUser}
                    offset={offset}
                    transition={transition}
                    isTop
                    hasHelpIcon
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    handleAction={handleAction}
                />
            )}

            <Modal isOpen={isOpenModal}>
                <div className="bg-white rounded-xl p-6 text-center shadow-xl max-w-md mx-auto">
                    <p className="text-lg font-semibold text-gray-800 mb-3">No more users 😱</p>
                    <p className="text-sm text-gray-500 mb-4">You’ve swiped through everyone!</p>
                    <Button title="Start over" onClick={handleCloseModal} className="w-full" />
                </div>
            </Modal>
        </div>
    );
};

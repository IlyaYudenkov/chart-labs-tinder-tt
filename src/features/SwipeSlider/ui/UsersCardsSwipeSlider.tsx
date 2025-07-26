import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
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
    const currentUser = useMemo(() => users[index], [users, index]);
    const nextUser = useMemo(() => users[index + 1], [users, index]);
    const previousUser = useMemo(() => users[index - 1], [users, index]);

    //EFFECT
    useEffect(() => {
        if (!currentUser) setIsOpenModal(true);
    }, [currentUser]);

    //CALLBACK
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].clientX;
        setTransition(false);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        setOffset(delta);
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (touchStartX.current === null) return;

        const threshold = 80;

        if (offset < -threshold || offset > threshold) {
            setTransition(true);
            setOffset(offset > 0 ? 1000 : -1000);

            const action: UserActionType = offset < -threshold ? 'dislike' : 'like';
            mutate({ userId: currentUser.id, action });

            setIndex((prev) => prev + 1);
            setOffset(0);
            setTransition(false);
        } else {
            setTransition(true);
            setOffset(0);
        }

        touchStartX.current = null;
    }, [offset, currentUser]);

    const handleAction = useCallback(
        (action: UserActionType) => {
            if (action === 'rewind' && index === 0) return;

            const direction =
                action === 'like' || action === 'superLike'
                    ? 1000
                    : action === 'dislike'
                      ? -1000
                      : 0;
            const isRewind = action === 'rewind';

            setTransition(true);
            setOffset(direction);

            if (isRewind) {
                setIsRewinding(true);
                setOffset(-1000);
            }

            setTimeout(() => {
                setIndex((prevIndex) => (isRewind ? prevIndex - 1 : prevIndex + 1));
                setOffset(0);
                setTransition(false);
                setIsRewinding(false);
            }, 250);

            mutate({ userId: currentUser.id, action });
        },
        [index, currentUser?.id],
    );

    const handleCloseModal = useCallback(() => {
        setIndex(0);
        setIsOpenModal(false);
    }, []);

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

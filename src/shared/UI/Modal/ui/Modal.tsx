import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';
import cl from './_Modal.module.scss';
import { cls } from '@/shared/lib/classes.lib';

interface IModal {
    isOpen?: boolean;
    onClose?: () => void;
    children?: ReactNode;
    hasClose?: boolean;
}

export const Modal = ({ isOpen, onClose, children, hasClose = false }: IModal) => {
    //STATE
    const [showModal, setShowModal] = useState(isOpen);

    //EFFECT
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    return createPortal(
        <div className={cls(cl.overlay, showModal ? cl.openOverlay : '')} onClick={onClose}>
            <div
                className={cls(cl.modal, showModal ? cl.openModal : '')}
                onClick={(e) => e.stopPropagation()}
            >
                {hasClose && (
                    <button className={cl.closeButton} onClick={onClose}>
                        &times;
                    </button>
                )}
                {children}
            </div>
        </div>,
        document.body,
    );
};

import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) onClose()
        }

        if (isOpen) window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [isOpen, onClose])

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

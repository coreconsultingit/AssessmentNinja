import React, {  useRef, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hasCloseButton?: boolean;
};

const ResultModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  hasCloseButton = true 
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <dialog 
      ref={dialogRef} 
      className="p-0 rounded-lg shadow-lg backdrop:bg-gray-800/40 backdrop:backdrop-blur-sm"
      onClose={handleClose}
    >
      <div className="min-w-[300px] max-w-md">
        {hasCloseButton && (
          <button 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            ×
          </button>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default ResultModal;

import { Button, Flex } from "@tremor/react";
import { useEffect, useRef, useState, FC } from "react";
import { ButtonFactory } from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Modal {
  open?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  hasCloseBtn?: boolean;
}

export const Modal: FC<Modal> = ({
  open = false,
  children,
  onClose = null,
  hasCloseBtn = true,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setisOpen] = useState(open);

  // Behavior when clsosing the modal
  const handleOnClose = () => {
    const modalHtml = modalRef.current;
    onClose && onClose(); //Defined onCLose behavior
    modalHtml?.close(); // Close the modal
  };
  useEffect(() => {
    setisOpen(open);
  }, [open]);

  useEffect(() => {
    const modalHTML = modalRef.current;
    if (modalHTML) {
      return isOpen ? modalHTML.showModal() : modalHTML.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className="p-5 rounded-md w-[300px] min-h-[400px] overflow-hidden"
      ref={modalRef}
    >
      {hasCloseBtn && (
        <Flex flexDirection="col" alignItems="end" justifyContent="end">
          <ButtonFactory
            className="mr-auto"
            variant="light"
            color="neutral"
            icon={XMarkIcon}
            text=""
            onClick={() => handleOnClose()}
          />
        </Flex>
      )}
      {children}
    </dialog>
  );
};

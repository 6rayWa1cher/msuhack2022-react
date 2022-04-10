import Modal from "@components/Modal";
import React, { useCallback } from "react";
import ButtonEditWidget from "./ButtonEditWidget";

const ButtonEditModal = ({ buttonId, openModal, setOpenModal, sx }) => {
  const handleClose = useCallback(() => setOpenModal(false), [setOpenModal]);
  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <ButtonEditWidget buttonId={buttonId} onClose={handleClose} />
    </Modal>
  );
};

export default ButtonEditModal;

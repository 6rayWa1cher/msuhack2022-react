import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ openModal, setOpenModal, children, sx }) {
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, ...sx }}>{children}</Box>
      </Modal>
    </div>
  );
}

export const makeModal =
  (WrappedComponent) =>
  ({ openModal, setOpenModal, ...props }) =>
    (
      <BasicModal openModal={openModal} setOpenModal={setOpenModal}>
        <WrappedComponent {...props} />
      </BasicModal>
    );

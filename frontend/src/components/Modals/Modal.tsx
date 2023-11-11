import React from "react";
import PropTypes from "prop-types";

function Modal({ isOpen, handleClose, children }: any) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.any,
};

export default Modal;

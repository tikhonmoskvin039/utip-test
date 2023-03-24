import React, { useEffect } from "react";

const Modal = ({ isVisible = false, title, onClose, children }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, []);

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <div className="cl-btn" onClick={onClose}></div>
        </div>
        <div className="modal-footer">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

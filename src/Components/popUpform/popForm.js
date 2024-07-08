import React from 'react';
import './popForm.css';

const PopForm = ({ show, handleClose, handleSave, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="button-group">
          <button type="button" onClick={handleClose}>
            Close
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default PopForm;

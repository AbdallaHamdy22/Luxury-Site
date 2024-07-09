import React from 'react';
import './popForm.css';

const PopForm = ({ show, handleClose, handleSave, children }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Product Form</h4>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={handleClose}>Close</button>
                    <button className="button" onClick={() => handleSave(handleClose)}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default PopForm;
  
import React from 'react';

const ConfirmationModal = ({title, message, handleCancel,buttonName, directActionToDelete, modalData}) => {
    return (
        <div>

            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box text-center">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label 
                        onClick={()=>directActionToDelete(modalData)} 
                        htmlFor="confirmation-modal" className="btn btn-warning">{buttonName}</label>
                        <label onClick={handleCancel} htmlFor="confirmation-modal" className="btn btn-outline">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
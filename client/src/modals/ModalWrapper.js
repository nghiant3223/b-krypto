import React from 'react';
import PropsTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const ModalWrapper = props => (
    <Modal
        isOpen
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.onClose}
        style={customStyles}
        contentLabel={props.contentLabel}>
        {props.children}
    </Modal>
);

export default ModalWrapper;
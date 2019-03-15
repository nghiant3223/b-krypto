import React from 'react';
import { connect } from 'react-redux';

import LoginModal from './LoginModal';

import * as modalTypes from '../constants/modalTypes';
import * as uiActions from '../actions/ui.action';

const ModalConductor = props => {
    switch (props.currentModal) {
        case modalTypes.LOGIN_MODAL:
            return <LoginModal onClose={props.onClose}/>

        default:
            return null;
    }
};

const mapStateToProps = ({ ui: { currentModal } }) => ({ currentModal });

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(uiActions.closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalConductor);
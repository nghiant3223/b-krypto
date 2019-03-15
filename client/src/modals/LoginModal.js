import React, { Component } from 'react';

import ModalWrapper from './ModalWrapper';

class LoginModal extends Component {
    render() {
        return (
            <ModalWrapper
                {...this.props}
                contentLabel="Log in">
                <form>
                    Login here
                </form>
            </ModalWrapper>
        );
    }
}

export default LoginModal;
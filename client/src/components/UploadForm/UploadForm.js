import React, { Component } from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import OptionsForm from './OptionsForm/OptionsForm';
import PlaintextForm from './PlaintextForm/PlaintextForm';
import KeyForm from './KeyForm/KeyForm';

import './UploadForm.css';

class UploadForm extends Component {
    render() {
        return (
            <div className="UploadForm--Pseudo">
                <ProgressBar />
                <div style={{ padding: '10px', zIndex: '10', position: 'relative' }}>
                    <div className="UploadForm">
                        <OptionsForm />
                        <PlaintextForm />
                        <KeyForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadForm;
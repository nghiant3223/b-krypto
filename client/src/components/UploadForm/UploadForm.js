import React, { Component } from 'react';
import { withRouter } from 'react-router';

import ProgressBar from '../ProgressBar/ProgressBar';
import OptionsForm from './OptionsForm/OptionsForm';
import PlaintextForm from './PlaintextForm/PlaintextForm';
import KeyForm from './KeyForm/KeyForm';

import { uploadFiles } from '../../services/file.service';
import Socket from '../../socket';
import * as sharedConstants from '../../shares/constants';

import './UploadForm.css';

const refreshState = {
    plaintextFile: undefined,
    keyFile: undefined,
    plaintextFileName: undefined,
    keyFileName: undefined,
    isUploading: false,
    isProcessing: false,
    compressedURL: undefined,
    doneProcessing: false,
    isIdle: true
};

class UploadForm extends Component {
    state = {
        type: 0,
        method: 0,
        ...refreshState
    };

    componentDidMount = () => {
        const socket = Socket.getInstance();

        socket.on(sharedConstants.SERVER_FINISHES_COMPRESSION, ({ fileName }) => {
            this.setState({ compressedURL: fileName, isProcessing: false, isUploading: false, doneProcessing: true, isIdle: true });
        });
    }

    onTypeChange = e => {
        this.setState({ type: parseInt(e.target.value) });
    }

    onMethodChange = e => {
        this.setState({ method: parseInt(e.target.value) });
    }

    onRefreshClick = () => {
        this.setState({ ...refreshState });
    }

    onUploadFormSubmit = async e => {
        e.preventDefault();

        if (!this.state.plaintextFile || !this.state.keyFile) return;

        this.setState({ isUploading: true, isIdle: false });
        try {
            const { data } = await uploadFiles(this.state.plaintextFile, this.state.keyFile);
            console.log(data);

            this.setState({ isUploading: false, isProcessing: true });

            const socket = Socket.getInstance();

            socket.emit(this.state.method === 0 ? sharedConstants.CLIENT_SENDS_ENCRYPTION_SIGNAL : sharedConstants.CLIENT_SENDS_DECRYPTION_SIGNAL, { plaintext: data.plaintext.filename, key: data.key.filename, algorithm: this.props.location.pathname.slice(1) });
        } catch (e) {
            console.log(e);
            this.setState({ isUploading: false, isIdle: true });
        }
    }

    onPlaintextChange = e => {
        e.persist();
        const file = e.target.files[0];

        this.setState({
            plaintextFile: file,
            plaintextFileName: file.name
        });
    }

    onPlaintextFolderChange = e => {
        e.persist();

        console.log(e.target.files);
    }

    onKeyFolderChange = e => {
        e.persist();

        console.log(e.target.files);
    }

    onKeyChange = e => {
        e.persist();
        const file = e.target.files[0];

        this.setState({
            keyFile: file,
            keyFileName: file.name
        });
    }

    render() {
        return (
            <div className="UploadForm--Pseudo">
                <ProgressBar
                    isUploading={this.state.isUploading}
                    onUploadFormSubmit={this.onUploadFormSubmit}
                    isProcessing={this.state.isProcessing}
                    isIdle={this.state.isIdle}/>
                
                <div style={{ padding: '10px', zIndex: '10', position: 'relative' }}>
                    <div className="UploadForm">
                        
                        <OptionsForm
                            onMethodChange={this.onMethodChange}
                            onTypeChange={this.onTypeChange}
                            onUploadFormSubmit={this.onUploadFormSubmit}
                            type={this.state.type}
                            method={this.state.method}
                            doneProcessing={this.state.doneProcessing}
                            onRefreshClick={this.onRefreshClick}
                            isIdle={this.state.isIdle}
                            compressedURL={this.state.compressedURL}/>
                        <PlaintextForm
                            onPlaintextChange={this.onPlaintextChange}
                            plaintextFileName={this.state.plaintextFileName}
                            type={this.state.type}
                            onPlaintextFolderChange={this.onPlaintextFolderChange}/>
                        <KeyForm
                            onKeyChange={this.onKeyChange}
                            keyFileName={this.state.keyFileName}
                            type={this.state.type}
                            onKeyFolderChange={this.onKeyFolderChange}/>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UploadForm);
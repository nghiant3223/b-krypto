import React, { Component } from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import OptionsForm from './OptionsForm/OptionsForm';
import PlaintextForm from './PlaintextForm/PlaintextForm';
import KeyForm from './KeyForm/KeyForm';

import { uploadFiles } from '../../services/file.service';
import Socket from '../../socket';
import * as sharedConstants from '../../shares/constants';

import './UploadForm.css';

class UploadForm extends Component {
    state = {
        type: 0,
        method: 0,  
        plaintextFile: undefined,
        keyFile: undefined,
        plaintextFileName: undefined,
        keyFileName: undefined,
        isUploading: false,
        isProcessing: false,
        compressedURL: undefined
    }

    componentDidMount = () => {
        const socket = Socket.getInstance();

        socket.on(sharedConstants.SERVER_FINISHES_COMPRESSION, ({ fileName }) => {
            this.setState({ compressedURL: fileName, isProcessing: false });
        });
    }

    onTypeChange = e => {
        this.setState({ type: parseInt(e.target.value) });
    }

    onMethodChange = e => {
        this.setState({ method: parseInt(e.target.value) });
    }

    onUploadFormSubmit = async e => {
        e.preventDefault();

        this.setState({ isUploading: true });
        try {
            const { data } = await uploadFiles(this.state.plaintextFile, this.state.keyFile);
            console.log(data);

            this.setState({ isUploading: false, isProcessing: true });

            const socket = Socket.getInstance();
            socket.emit(this.state.method === 0 ? sharedConstants.CLIENT_SENDS_ENCRYPTION_SIGNAL : sharedConstants.CLIENT_SENDS_DECRYPTION_SIGNAL, { plaintext: data.plaintext.filename, key: data.key.filename, algorithm: 'aes-192-cbc' });
            console.log('emit');
        } catch (e) {
            console.log(e);
            this.setState({ isUploading: false });
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
                    isProcessing={this.state.isProcessing} />
                
                <div style={{ padding: '10px', zIndex: '10', position: 'relative' }}>
                    <div className="UploadForm">
                        
                        <OptionsForm
                            onMethodChange={this.onMethodChange}
                            onTypeChange={this.onTypeChange}
                            onUploadFormSubmit={this.onUploadFormSubmit}
                            type={this.state.type}
                            method={this.state.method}/>
                        <PlaintextForm
                            onPlaintextChange={this.onPlaintextChange}
                            plaintextFileName={this.state.plaintextFileName} />
                        <KeyForm
                            onKeyChange={this.onKeyChange}
                            keyFileName={this.state.keyFileName} />
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadForm;
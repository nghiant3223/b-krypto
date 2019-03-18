import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProgressBar from '../ProgressBar/ProgressBar';
import OptionsForm from './OptionsForm/OptionsForm';
import PlaintextForm from './PlaintextForm/PlaintextForm';
import KeyForm from './KeyForm/KeyForm';

import { uploadFiles, uploadFolders } from '../../services/file.service';
import Socket from '../../socket';
import * as sharedConstants from '../../shares/constants';
import * as uiActions from '../../actions/ui.action';

import './UploadForm.css';

const refreshState = {
    plaintextFile: undefined,
    keyFile: undefined,
    filesInPlaintextFolder: undefined,
    plaintextFileName: undefined,
    keyFileName: undefined,
    plaintextFolderName: undefined,
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

        socket.on(sharedConstants.SERVER_SENDS_ERROR_MESSAGE, data => {
            this.props.openSnackbar({ content: data.message, type: 'warning' });
            this.setState({ isProcessing: false, isIdle: true });
            setTimeout(() => {
                this.props.closeSnackbar();
            }, 3000);
        });
    }

    finishTransaction = fileName => {
        this.setState({ compressedURL: fileName, isProcessing: false, isUploading: false, doneProcessing: true, isIdle: true });

        this.props.openSnackbar({ type: 'success', content: `${ this.state.method === 0 ? "Encrypt" : "Decrypt"} ${this.state.type === 0 ? "file" : "folder"} successfully` });
        
        setTimeout(() => {
            this.props.closeSnackbar();
        }, 3000);
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

        if (this.state.type === 0 && (!this.state.plaintextFile || !this.state.keyFile)) return alert(`File to ${this.state.method === 0 ? 'encrypt' : 'decrypt'} or key file is empty`);
        if (this.state.type === 1 && (!this.state.filesInPlaintextFolder || !this.state.keyFile)) return alert(`Folder to ${this.state.method === 0 ? 'encrypt' : 'decrypt'} or key file is empty`);

        this.setState({ isUploading: true, isIdle: false });
        try {

            const { data } = this.state.type === 0 ? await uploadFiles(this.state.plaintextFile, this.state.keyFile) : await uploadFolders(this.state.filesInPlaintextFolder, this.state.keyFile);

            this.setState({ isUploading: false, isProcessing: true });

            const socket = Socket.getInstance();

            if (this.state.type === 0) socket.emit(this.state.method === 0 ? sharedConstants.CLIENT_SENDS_ENCRYPTION_SIGNAL : sharedConstants.CLIENT_SENDS_DECRYPTION_SIGNAL, { plaintext: data.plaintext.filename, key: data.key.filename, algorithm: this.props.algorithm });
            if (this.state.type === 1) socket.emit(this.state.method === 0 ? sharedConstants.CLIENT_SENDS_FOLDER_ENCRYPTION_SIGNAL : sharedConstants.CLIENT_SENDS_FOLDER_DECRYPTION_SIGNAL, { plaintext: data.plaintext.foldername, key: data.key.filename, algorithm: this.props.algorithm });
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
        const files = e.target.files;
        const folderName = files[0].webkitRelativePath.split('/')[0];

        this.setState({
            filesInPlaintextFolder: files,
            plaintextFolderName: folderName
        });

        console.log(e);
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
                    isIdle={this.state.isIdle}
                    finishTransaction={this.finishTransaction}/>
                
                <div style={{ padding: '10px'}}>
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
                            plaintextFolderName={this.state.plaintextFolderName}
                            type={this.state.type}
                            onPlaintextFolderChange={this.onPlaintextFolderChange}
                            method={this.state.method}/>
                        <KeyForm
                            onKeyChange={this.onKeyChange}
                            keyFileName={this.state.keyFileName}/>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    openSnackbar: snackbarInfo => dispatch(uiActions.openSnackbar(snackbarInfo)),
    closeSnackbar: _ => dispatch(uiActions.closeSnackbar())
});

export default connect(null, mapDispatchToProps)(UploadForm);
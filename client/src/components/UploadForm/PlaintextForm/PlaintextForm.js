import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './PlaintextForm.css';
import plain from '../../../statics/images/folder.png';

class PlaintextForm extends PureComponent {
    constructor(props) {
        super(props);

        this.folderInput = (
            <input type="file" name="plaintext" webkitdirectory="" mozdirectory="" msdirectory="" odirectory="" directory=""
                onChange={this.props.onPlaintextFolderChange}
                onClick={e => e.target.value = null} />
        );

        this.fileInput = (
            <input type="file" name="plaintext"
                onChange={this.props.onPlaintextChange}
                onClick={e => e.target.value = null} />
        );
    }

    render() {
        return (
            <form className="UploadForm__Plaintext">
                <label htmlFor="plaintext">
                    <div>
                        <div className="UploadForm__IconContainer"><img src={plain} alt="File to encrypt" /></div>
                        <div className="UploadForm__FileName">{this.props.plaintextFileName || this.props.plaintextFolderName || (this.props.type !== 0 ? `Drop folder to ${this.props.method === 0 ? "encrypt" : "decrypt"}`: `Drop file to ${this.props.method === 0 ? "encrypt" : "decrypt"}`)}</div>
                    </div>
                    {this.props.type === 0 ? this.fileInput : this.folderInput}
                    </label>
            </form>
        );
    }
}

PlaintextForm.propTypes = {
    onPlaintextChange: PropTypes.func.isRequired,
};

export default PlaintextForm;
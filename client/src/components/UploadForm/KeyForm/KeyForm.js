import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './KeyForm.css';
import secret from '../../../statics/images/secret.png';



class KeyForm extends PureComponent {
    constructor(props) {
        super(props);

        this.folderInput = (
            <input type="file" name="key" webkitdirectory="" mozdirectory="" msdirectory="" odirectory="" directory=""
                onChange={this.props.onKeyFolderChange}
                onClick={e => e.target.value = null} />
        );

        this.fileInput = (
            <input type="file" name="key"
                onChange={this.props.onKeyChange}
                onClick={e => e.target.value = null} />
        );
    }

    render() {
        return (
            <form className="UploadForm__Key">
                <label htmlFor="key">
                    <div>
                        <div className="UploadForm__IconContainer"><img src={secret} alt="File to encrypt" /></div>
                        <div className="UploadForm__FileName">{this.props.keyFileName || "Drop file as key"}</div>
                    </div>
                    {this.props.type === 0 ? this.fileInput : this.folderInput}
                </label>
            </form>
        );
    }
}

KeyForm.propTypes = {
    onKeyChange: PropTypes.func.isRequired
};

export default KeyForm;
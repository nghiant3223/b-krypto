import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './PlaintextForm.css';
import plain from '../../../statics/images/folder.png';

class PlaintextForm extends PureComponent {
    render() {
        return (
            <form className="UploadForm__Plaintext">
                <label htmlFor="plaintext">
                    <div>
                        <div className="UploadForm__IconContainer"><img src={plain} alt="File to encrypt" /></div>
                        <div className="UploadForm__FileName">{this.props.plaintextFileName || "Drop file to encrypt"}</div>
                    </div>
                    <input type="file" name="plaintext" onChange={this.props.onPlaintextChange} onClick={e => e.target.value = null}/></label>
            </form>
        );
    }
}

PlaintextForm.propTypes = {
    onPlaintextChange: PropTypes.func.isRequired,
};

export default PlaintextForm;
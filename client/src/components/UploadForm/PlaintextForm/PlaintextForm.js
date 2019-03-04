import React, { Component } from 'react';

import './PlaintextForm.css';
import plain from '../../../statics/images/folder.png';

class PlaintextForm extends Component {
    render() {
        return (
            <form className="UploadForm__Plaintext">
                <label htmlFor="plaintext">
                    <div>
                        <div className="UploadForm__IconContainer"><img src={plain} alt="File to encrypt" /></div>
                        <div>Drop file to encrypt</div>
                    </div>
                    <input type="file" name="plaintext" /></label>
            </form>
        );
    }
}

export default PlaintextForm;
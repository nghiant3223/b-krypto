import React, { Component } from 'react';

import './KeyForm.css';
import secret from '../../../statics/images/secret.png';

class KeyForm extends Component {
    render() {
        return (
            <form className="UploadForm__Key">
                <label htmlFor="key">
                    <div>
                        <div className="UploadForm__IconContainer"><img src={secret} alt="File to encrypt" /></div>
                        <div>Drop file as key</div>
                    </div>
                    <input type="file" name="key" />
                </label>
            </form>
        );
    }
}

export default KeyForm;
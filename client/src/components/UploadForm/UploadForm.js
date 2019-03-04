import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';

import ProgressBar from '../ProgressBar/ProgressBar';

import './UploadForm.css';
import plain from '../../statics/images/folder.png';
import secret from '../../statics/images/secret.png';

class UploadForm extends Component {
    render() {
        return (
            <div className="UploadForm--Pseudo">
                <ProgressBar />
                <div style={{ padding: '10px', zIndex: '10', position: 'relative' }}>
                    <div className="UploadForm">
                    

                        <div className="OptionsForm">
                            <form>
                                <div className="OptionsForm__Title">Type</div>
                                <div className="OptionsForm__Type">
                                    <span className="OptionsForm__Type--Left" >
                                        <Radio
                                            checked={null}
                                            onChange={null}
                                            value={0}
                                            name="radio-button-demo"
                                            aria-label="A"
                                            color="default"
                                        /> <span style={{ marginLeft: "-10px" }}>File</span >
                                    </span>

                                    <span className="OptionsForm__Type--Right">
                                        <Radio
                                            checked={null}
                                            onChange={null}
                                            value={1}
                                            name="radio-button-demo"
                                            aria-label="B"
                                            color="default"
                                        /> <span style={{ marginLeft: "-10px" }}>Folder</span >
                                    </span>
                                </div>
                            </form>

                            <div className="OptionsForm__SubmitButton">
                                <button>encrypt</button>
                            </div>
                        </div>

                        <form className="UploadForm__Plaintext">
                            <label htmlFor="plaintext">
                                <div>
                                    <div className="UploadForm__IconContainer"><img src={plain} alt="File to encrypt" /></div>
                                    <div>Drop file to encrypt</div>
                                </div>
                                <input type="file" name="plaintext" /></label>
                        </form>

                        <form className="UploadForm__Key">
                            <label htmlFor="key">
                                <div>
                                    <div className="UploadForm__IconContainer"><img src={secret} alt="File to encrypt" /></div>
                                    <div>Drop file as key</div>
                                </div>
                                <input type="file" name="key" />
                            </label>
                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

export default UploadForm;
import React, { PureComponent } from 'react';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


import { SERVER_URL } from '../../../configs/server.config';

import './OptionsForm.css';


class OptionsForm extends PureComponent {
    onRefreshClick = () => {
        if (!this.props.isIdle) alert('Sorry, we are processing');
        else this.props.onRefreshClick();
    }

    render() {
        return (
            <div className="OptionsForm">
                <form>
                    <div className="OptionsForm__RefreshButton" onClick={this.onRefreshClick}><img src="https://img.icons8.com/ios-glyphs/18/000000/synchronize.png" alt="Refresh icon"/>Refresh</div>

                    <div className="OptionsForm__Title">Method</div>
                    <div className="OptionsForm__Type">
                        <div className="OptionsForm__Type--Left" >
                            <Radio
                                checked={this.props.method === 0}
                                onChange={e => this.props.onMethodChange(e)}
                                value={0}
                                name="radio-button-demo"
                                aria-label="A"
                                color="primary"
                            /> <span >Encrypt</span >
                        </div>

                        <div className="OptionsForm__Type--Right">
                            <Radio
                                checked={this.props.method === 1}
                                onChange={e => this.props.onMethodChange(e)}
                                value={1}
                                name="radiop-button-decrypt"
                                aria-label="B"
                                color="primary"
                            /> <span >Decrypt</span >
                        </div>
                    </div>

                    <div className="OptionsForm__Title">Type</div>

                    <div className="OptionsForm__Type">
                        <div className="OptionsForm__Type--Left" >
                            <Radio
                                checked={this.props.type === 0}
                                onChange={e => this.props.onTypeChange(e)}
                                value={0}
                                name="radio-button-demo"
                                aria-label="A"
                                color="primary"
                            /> <span style={{ marginLeft: "-10px" }}>File</span >
                        </div>

                        <div className="OptionsForm__Type--Right">
                            <Radio
                                checked={this.props.type === 1}
                                onChange={e => this.props.onTypeChange(e)}
                                value={1}
                                name="radio-button-demo"
                                aria-label="B"
                                color="primary"
                            /> <span style={{ marginLeft: "-10px" }}>Folder</span >
                        </div>
                    </div>
                </form>

                <div className="OptionsForm__SubmitButton">
                    {
                        this.props.doneProcessing ?
                            <button className="OptionsForm__SubmitButton--DownloadButton"><a rel="noopener noreferrer" href={`${SERVER_URL}/api/download/${this.props.compressedURL}`} target="_blank"></a>Download</button> :
                            (<Button onClick={this.props.onUploadFormSubmit}>{this.props.method === 0 ? "Encrypt" : "Decrypt"}</Button>)
                    }
                </div>
            </div>
        );
    }
}

OptionsForm.propTypes = {
    type: PropTypes.number,
    onTypeChange: PropTypes.func.isRequired,
    onUploadFormSubmit: PropTypes.func.isRequired,
    onRefreshClick: PropTypes.func.isRequired
};

OptionsForm.defaultProps = {
    type: 0
};

export default OptionsForm;
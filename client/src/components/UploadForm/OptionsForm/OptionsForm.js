import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';

import './OptionsForm.css';

class OptionsForm extends Component {
    render() {
        return (
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
        );
    }
}

export default OptionsForm;
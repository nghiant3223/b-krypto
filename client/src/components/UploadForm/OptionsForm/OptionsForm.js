import React, { PureComponent } from 'react';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';

import './OptionsForm.css';

class OptionsForm extends PureComponent {
    render() {
        return (
            <div className="OptionsForm">
                <form>
                    <div className="OptionsForm__Title">Type</div>
                    <div className="OptionsForm__Type">
                        <span className="OptionsForm__Type--Left" >
                            <Radio
                                checked={this.props.type === 0}
                                onChange={e => this.props.onTypeChange(e)}
                                value={0}
                                name="radio-button-demo"
                                aria-label="A"
                                color="primary"
                            /> <span style={{ marginLeft: "-10px" }}>File</span >
                        </span>

                        <span className="OptionsForm__Type--Right">
                            <Radio
                                checked={this.props.type === 1}
                                onChange={e => this.props.onTypeChange(e)}
                                value={1}
                                name="radio-button-demo"
                                aria-label="B"
                                color="primary"
                            /> <span style={{ marginLeft: "-10px" }}>Folder</span >
                        </span>
                    </div>
                </form>

                <div className="OptionsForm__SubmitButton">
                    <button onClick={this.props.onUploadFormSubmit}>encrypt</button>
                </div>
            </div>
        );
    }
}

OptionsForm.propTypes = {
    type: PropTypes.number,
    onTypeChange: PropTypes.func.isRequired,
    onUploadFormSubmit: PropTypes.func.isRequired
};

OptionsForm.defaultProps = {
    type: 0
};

export default OptionsForm;
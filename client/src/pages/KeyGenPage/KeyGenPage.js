import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

import { getKey } from '../../services/key.service';
import * as uiActions from '../../actions/ui.action';

import './KeyGenPage.css';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 140,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


const keys = {
    publicKey: `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALy/p2bS+9j5V/oyEZsBQuTfRCIu2Usb
QYqYyF6TQy+CdenyPfyqLNVImgUnGLyYDqBhlss5KN1QPy09WCntE6cCAwEAAQ==
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN PRIVATE KEY-----
MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAvL+nZtL72PlX+jIR
mwFC5N9EIi7ZSxtBipjIXpNDL4J16fI9/Kos1UiaBScYvJgOoGGWyzko3VA/LT1Y
Ke0TpwIDAQABAkEAqMo/Op2sqLD6cvy5b8Nl/eSHOoZovVinePj+Hk1VBLL97cfc
yh+91SZ3/J9i+9TLYRLhiGaIyEBNElHtBGNFKQIhAN6yumYnDkNMqHgqEcGDgtHX
afEpODrR2fYAd22FxLLjAiEA2PlHmcOZ+1NKOqB0EHER0Pof5W1pYyZIHSRWnu2O
w20CIQDMqGvs3Q+agaSBaggPUxCyT8kou7zVMW2hSiR3Hmv6CQIgUFgel2XDAznY
ZtU7pUr5WfUFEqPtPnXShlgKa1d0YhECIDFHF5Bd8pUg4+57HfjzROzPpv4PLsVV
AZ1sPZxnL5+7
-----END PRIVATE KEY-----`
};

class KeyGenPage extends Component {
    state = {
        value: 512,
        ...keys
    }

    componentDidMount = () => {
        this.onFormSubmit();
    }

    onFormSubmit = async () => {
        try {
            const { data: { publicKey, privateKey } } = await getKey(this.state.value);
            this.setState({ publicKey: publicKey.substring(0, publicKey.length-1), privateKey : privateKey.substring(0, privateKey.length-1) });
        } catch (e) {
            console.log(e);
        }
    }

    onSizeChange = (e) => {
        console.log(e.target);
        this.setState({ value: e.target.value });
    }

    onPublicKeyTextFieldClick = () => {
        let dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', this.state.publicKey);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.displaySnackbar();
    }

    onPrivateKeyTextFieldClick = () => {
        let dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', this.state.privateKey);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.displaySnackbar();
    }

    displaySnackbar = () => {
        this.props.openSnackbar({ type: 'success', content: `Copied to clipboard` });
        
        setTimeout(() => {
            this.props.closeSnackbar();
        }, 3000);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="KeyGenPage__Pseudo">

                <div style={{ padding: '10px' }}>
                    <div className="KeyGenPage">
                        <div className="KeyGenPage__Container">
                            <div className="KeyGenPage__Container__Left">
                                <form className={classes.root}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="age-label-placeholder">
                                            Key size
                                        </InputLabel>
                                        <Select
                                            value={this.state.value}
                                            onChange={this.onSizeChange}
                                            input={<Input name="age" id="age-label-placeholder" />}
                                            displayEmpty
                                            name="age"
                                            className={classes.selectEmpty}>
                                            <MenuItem value={512}>512</MenuItem>
                                            <MenuItem value={1024}>1024</MenuItem>
                                            <MenuItem value={2048}>2048</MenuItem>
                                            <MenuItem value={4096}>4096</MenuItem>
                                        </Select>
                                    </FormControl>


                                </form>
                                <div className="KeyGenPage__Container__Left__Button">

                                    <Button onClick={this.onFormSubmit}>Generate</Button>
                                    </div>

                            </div>

                            <div className="KeyGenPage__Container__Right">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Public key"
                                    multiline
                                    rows="4"
                                    value={this.state.publicKey}
                                    onClick={this.onPublicKeyTextFieldClick}
                                    margin="normal" InputProps={{readOnly: true }}>
                                    
                                </TextField>
                            </div>
                            <div className="KeyGenPage__Container__Right">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Private key"
                                    multiline
                                    rows="4"
                                    onClick={this.onPrivateKeyTextFieldClick}
                                    value={this.state.privateKey}
                                    margin="normal" InputProps={{ readOnly: true }}>
                                </TextField>
                            </div>
                        </div>
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(KeyGenPage));
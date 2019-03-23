import React, { Component } from 'react';

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

class KeyGenPage extends Component {
    state = {
        value: 512,
        publicKey: ' ',
        privateKey: ' ',
    }

    componentDidMount = () => {
        this.onFormSubmit();
    }

    onFormSubmit = async () => {
        try {
            const { data: { publicKey, privateKey } } = await getKey(this.state.value);
            this.setState({ publicKey, privateKey });
        } catch (e) {
            console.log(e);
        }
    }

    onSizeChange = (e) => {
        this.setState({ value: e.target.value });
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
                                    margin="normal" InputProps={{readOnly: true }}>
                                    
                                </TextField>
                            </div>
                            <div className="KeyGenPage__Container__Right">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Private key"
                                    multiline
                                    rows="4"
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

export default withStyles(styles)(KeyGenPage);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Snackbar.css';

class Snackbar extends Component {
    render() {
        let className = this.props.currentSnackbar ? "Snackbar--Open" : "Snackbar--Close";
        this.props.currentSnackbar && (this.props.currentSnackbar.type === 'warning' ? className += " Snackbar--Warning" : className += " Snackbar--Success");

        return (
            <div className={`Snackbar ${className}`}>
                <span className="Snackbar__Content">
                    {
                        this.props.currentSnackbar && (this.props.currentSnackbar.type === 'warning' ? 
                        <svg class="j2dfb39 j1ifr0zx jyh5bfp" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg> :
                        <svg className="j2dfb39 j1ifr0zx jyh5bfp" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>)
                    }
                    {this.props.currentSnackbar && this.props.currentSnackbar.content}!
                </span>
            </div>
        );
    }
}

const mapStateToProps = ({ ui: { currentSnackbar } }) => ({ currentSnackbar });

export default connect(mapStateToProps)(Snackbar);
import React, { PureComponent } from 'react';

import Socket from '../../socket';
import * as sharedConstants from '../../shares/constants';

import LinearProgress from '@material-ui/core/LinearProgress';

import './ProgressBar.css';

class ProgressBar extends PureComponent {
    state = {
        percentage: 0
    }

    componentDidUpdate = prevProps => {
        if (this.props.isIdle && !prevProps.isIdle) {
            this.setState({ percentage: 0 });
        }
    }

    componentDidMount = () => {
        const socket = Socket.getInstance();

        socket.on(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS, () => {
            this.setState(prevState => {
                if (prevState.percentage + 5 <= 95) return { percentage: prevState.percentage + 5 };
                else return { percentage: 95 };
            });
        });

        socket.on(sharedConstants.SERVER_FINISHES_ENCRYPTION, () => {
            this.setState({ percentage: 95 });
        });

        socket.on(sharedConstants.SERVER_FINISHES_COMPRESSION, ({ fileName }) => {
            this.setState({ percentage: 100 });

            setTimeout(() => {
                this.props.finishTransaction(fileName);
            }, 1000);
        });
    }

    render() {
        if (this.props.isUploading) return <div className="LoadingBar Bar" />;

        if (this.props.isProcessing) return <LinearProgress color="primary" variant="determinate" value={this.state.percentage} className="Bar" />;

        return null
    }
}

export default ProgressBar;
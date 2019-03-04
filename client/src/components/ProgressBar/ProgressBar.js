import React, { PureComponent } from 'react';

import './ProgressBar.css';

class ProgressBar extends PureComponent {
    state = {
        percentage: 0
    }

    render() {
        if (this.props.isUploading) return <div className="LoadingBar" />;

        return <div className="ProgressBar" style={{ width: `${this.state.percentage.toString()}%` }} />;
    }
}

export default ProgressBar;
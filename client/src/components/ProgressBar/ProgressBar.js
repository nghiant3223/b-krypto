import React, { Component } from 'react';

import './ProgressBar.css';

class ProgressBar extends Component {
    state = {
        percentage: 0
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(prevState => {
                if (prevState.percentage >= 100) {
                    console.log('greater');
                    return {
                        percentage: prevState.percentage
                    }
                }
                else return ({
                    percentage: prevState.percentage + 10
                });
            });
        }, 500);
    }

    render() {
        return (
            <div className="ProgressBar" style={{ width: `${this.state.percentage.toString()}%` }} />
            //<div className="LoadingBar" />    
        
        );
    }
}

export default ProgressBar;
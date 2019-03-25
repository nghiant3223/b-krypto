import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.css';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="text-center">
                <span className="error" id="error-code">404</span>
                <span className="error" id="error-description">Không tìm thấy trang này...</span>
                <Link to="/">Quay về trang chủ</Link>
            </div>
        );
    }
}

export default NotFoundPage;
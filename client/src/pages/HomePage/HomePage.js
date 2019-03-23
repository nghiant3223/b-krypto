import React, { Component } from 'react';

import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="Homepage">
                < div className="MemberContainer" >
                    <h3 className="MemberContainer__Header">Members</h3>
                    <ul className="MemberContainer__Content">
                        <li>1. Nguyễn Gia Bảo</li>
                        <li>2. Cao Chánh Dương</li>
                        <li>3. Trần Cảnh Huy</li>
                        <li>4. Nguyễn Trọng Nghĩa</li>
                    </ul>
                </div>


                <div className="ProductDescription">
                    < h3 className="ProductDescription__Header" > Our product</h3>
                    <div className="ProductDescription__Content">
                        This is for product description
                    </div>
                </div>

                <div className="AlgorithmStrength">
                    < h3 className="AlgorithmStrength">Algorithms we use</h3>
                    <div className="AlgorithmStrength__Content">
                        This is for Algorithms we use
                    </div>
                </div>
            </div>
        );
    }
}


export default HomePage;
import React from 'react';
import UploadForm from '../../components/UploadForm/UploadForm';

import './RSAPage.css';

const RSAPage = (props) => (
    <div className="AlgorithmPage">
        <p className="AlgorithmPage__Title">RSA Algorithm</p>
        <p className="AlgorithmPage__Subtitle">Invented by <i>Ron Rivest</i>, <i>Adi Shamir</i> and <i>Len Adleman</i>. Consider to be <b>unbreakable</b>!</p>
        <div className="AlgorithmPage__Main">
            <UploadForm />
        </div>
    </div>
);

export default RSAPage;
import React from 'react';

import UploadForm from '../../components/UploadForm/UploadForm';

const CamelliaPage = (props) => (
    <div className="AlgorithmPage">
        <p className="AlgorithmPage__Title">Camellia Algorithm</p>
        < p className="AlgorithmPage__Subtitle" >
            Camellia is considered to be <b>infeasible</b> to break with brute-force attacks with current technology even when using a small key size of <b>128 bits</b>!</p>
        <div className="AlgorithmPage__Main">
            <UploadForm algorithm="camellia" />
        </div>
    </div>
);

export default CamelliaPage;
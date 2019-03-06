import React from 'react';

import UploadForm from '../../components/UploadForm/UploadForm';

const CamelliaPage = (props) => (
    <div className="AlgorithmPage">
        <p className="AlgorithmPage__Title">Camellia Algorithm</p>
        < p className="AlgorithmPage__Subtitle" >
            Camellia is considered <b>infeasible</b> to break it by brute - force attack on the keys with current technology even using small key size of <b>128 bits</b>!  </p>
        <div className="AlgorithmPage__Main">
            <UploadForm />
        </div>
    </div>
);

export default CamelliaPage;
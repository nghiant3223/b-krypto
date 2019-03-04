import React from 'react';

import UploadForm from '../../components/UploadForm/UploadForm';

const TwofishPage = (props) => (
    <div className="AlgorithmPage">
        <p className="AlgorithmPage__Title">Twofish Algorithm</p>
        <p className="AlgorithmPage__Subtitle">Twofish was slightly slower than AES for 128-bit keys, but somewhat <b>faster</b> for 256-bit keys!</p>
        <div className="AlgorithmPage__Main">
            <UploadForm />
        </div>
    </div>
)

export default TwofishPage;
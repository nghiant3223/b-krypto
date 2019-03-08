import React from 'react';
import UploadForm from '../../components/UploadForm/UploadForm';

const AESPage = (props) => (
    <div className="AlgorithmPage">
        <p className="AlgorithmPage__Title">AES Algorithm</p>
        <p className="AlgorithmPage__Subtitle">A popular and widely adopted symmetric encryption algorithm. <b>3x</b> faster than DES!</p>
        <div className="AlgorithmPage__Main">
            <UploadForm algorithm="aes"/>
        </div>
    </div>)

export default AESPage;
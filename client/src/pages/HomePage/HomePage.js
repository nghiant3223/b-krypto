import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap';

import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="Homepage">
                <Jumbotron className="IntroJumbotron">
                    <div className="IntroJumbotron__Content">
                        <h1 className="display-1">B-Krypto</h1>
                        <h2>Ứng dụng web hỗ trợ mã hóa và giải mã</h2>
                        <p>Kéo thả tập tin/thư mục tiện lợi, mã hóa nhanh chóng và an toàn</p>
                    </div>
                    <div className="IntroJumbotron__Background"></div>                    
                </Jumbotron>

                <Container>
                    <hr />
                    <div className="MemberContainer my-4">
                        <h1 className="MemberContainer__Header my-4 text-center">Thành viên nhóm</h1>
                        <ul className="MemberContainer__Content">
                            <li>
                                <div>
                                    <img src="images/bao.jpg" />
                                    Nguyễn Gia Bảo<br/>1610172
                                </div>    
                            </li>
                            <li>
                                <div>
                                    <img src="images/duong.jpg" />
                                    Cao Chánh Dương<br/>1610571
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="images/huy.png" />
                                    Trần Cảnh Huy<br/>1611331
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="images/nghia.jpg" />
                                    Nguyễn Trọng Nghĩa<br/>1612212
                                </div>
                            </li>
                        </ul>
                    </div>
                    <hr />

                    <div className="ProductDescription my-4">
                        < h1 className="ProductDescription__Header my-4 text-center">Sản phẩm</h1>
                        <div className="ProductDescription__Content">
                            <p class="text-center"><strong>B-Krypto</strong> là sản phẩm của nhóm cho <strong>Bài tập lớn 1 - môn Mật mã và An ninh mạng</strong>.</p>
                            <ul class="text-justify">
                                <li>Ứng dụng hỗ trợ mã hóa một tập tin hoặc thư mục bất kì (hình ảnh, âm thanh, văn bản...).</li>
                                <li>
                                    Quá trình mã hóa: nhận input là tập tin/thư mục bất kì, tập tin text chứa khóa mã hóa (encryption key) và một số  option khác (nếu cần); output là tập tin ZIP chứa dữ liệu đã được mã hóa cùng với khóa mã hóa. 
                                </li>
                                <li>
                                    Quá trình giải mã: nhận input là tập tin/thư mục chứa dữ liệu đã được mã hóa, tập tin text chứa khóa giải mã (decryption key) và một số option khác (nếu cần); output là tập tin/thư mục đã được giải mã thành công.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />

                    <div className="AlgorithmStrength mt-4">
                        < h1 className="AlgorithmStrength__Header my-4 text-center">Các giải thuật sử dụng</h1>
                        <div className="AlgorithmStrength__Content">
                            <Row className="my-4">
                                <Col xs={{size: 4, offset: 1}} className="text-right"><h1>AES</h1></Col>
                                <Col xs="4 text-justify">AES viết tắt cho Advanced Encryption Standard, tên gốc là Rijndael. AES là block cipher đối xứng với block size 128 bit và có độ dài khóa 128/192/256 bit.</Col>
                            </Row>
                            <Row className="my-4">
                                <Col xs={{size: 4, offset: 1}} className="text-right"><h1>RSA</h1></Col>
                                <Col xs="4 text-justify">RSA được ba nhà toán học và khoa học máy tính Ron Rivest, Adi Shamir và Leonard Adleman công bố lần đầu năm 1978. RSA là giải thuật mã hoá bất đối xứng, có nghĩa là mã hóa bằng một khóa khác với khóa giải mã.</Col>
                            </Row>
                            <Row className="my-4">
                                <Col xs={{size: 4, offset: 1}} className="text-right"><h1>Camellia</h1></Col>
                                <Col xs="4 text-justify">Camellia được phát triển bởi công ty Mitsubishi và NTT vào năm 2000. Camellia là block cipher đối xứng với block size là 128 bit và độ dài khóa 128/192/256 bit.</Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}


export default HomePage;

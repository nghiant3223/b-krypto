import React, { Component } from 'react';

import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="Homepage">
                < div className="MemberContainer" >
                    <h1 className="MemberContainer__Header">Thành viên nhóm</h1>
                    <ul className="MemberContainer__Content">
                        <li>1. Nguyễn Gia Bảo</li>
                        <li>2. Cao Chánh Dương</li>
                        <li>3. Trần Cảnh Huy</li>
                        <li>4. Nguyễn Trọng Nghĩa</li>
                    </ul>
                </div>


                <div className="ProductDescription">
                    < h1 className="ProductDescription__Header" >Sản phẩm</h1>
                    <div className="ProductDescription__Content">
                        <p>B-Krypto là sản phẩm của bài tập lớn 1 - môn Mật mã và an ninh mạng do nhóm thực hiện. Nhằm mục tiêu hiện thực các giải thuật mã hóa/ giải mã được học trên lớp, và tìm hiểu các giải thuật mã hóa khác, chứng minh tính an toàn của giải thuật được chọn và triển khai giải thuật đó để demo kết quả. Đồng thời luyệ cho sinh viên có khả năng ứng dụng các thư viện lập trình mã hóa để xây dựng chương trình mã hóa và giải mã các tập tin và thư mục ứng dụng trong thực tế.</p>
                        <ol className="MemberContainer__Content">
                            <li>Chương trình có khả năng mã hóa một tập tin bất kì như hình ảnh, âm thanh, văn bản, pdf... Sinh viên trình bày rõ trong báo cáo một số loại tập tin mà chương trình hỗ trợ mã hoá/ giải mã.</li>
                            <li>Quá trình mã hóa: nhận input là tập tin bất kì và tập tin text chứa chìa khóa mã hóa ( encryption key) và một số option khác (nếu cần), output là tập tin hay thư mực chứa dữ liệu đã được mã hóa.</li>
                            <li>Quá trình giải mã: nhận input là tập tin hay thư mục chứa dữ liệu đã được mã hóa và tập tin text chứa chìa khóa giải mã (decryption key) và một số option khác (nếu cần), output chương trình là tập tin được giãi mã thành công. Sử dụng các hàm Hash như MD5, SHA để chứng minh. tính toàn vẹn giữa tập tin gốc ban đầu được chọn và tập tin output của quá trình giải mã.</li>
                        </ol>
                    </div>
                </div>

                <div className="AlgorithmStrength">
                    < h1 className="AlgorithmStrength">Các giải thuật được sử dụng</h1>
                    <div className="AlgorithmStrength__Content">
                        <h3>1. AES</h3>
                            <p>AES viết tắt cho Advanced Encryption Standard, tên gốc là Rijndael. AES là block cipher đối xứng với block size 128 bit và key có độ dài 128/192/256 bit.</p>

                        <h3>2. RSA</h3>
                            <p>Thuật toán mã hóa RSA (Rivest–Shamir–Adleman) do ba nhà toán học và khoa học máy tính Ron Rivest, Adi Shamir và Leonard Adleman công bố lần đầu năm 1978. Thuật toán mã hoá RSA không phải là block-cipher hay stream-cipher vì cả 2 dạng block-cipher và stream-cipher đều sử dụng cùng một khóa để mã hóa và giải mã (mã hóa đối xứng). Trong khi đó, RSA là giải thuật mã hoá bất đối xứng, có nghĩa là mã hóa bằng một khóa khác với giải mã.</p>
                        
                        <h3>3. Camellia</h3>
                            <p>Là giải thuật được phát triển tại Nhật Bản bởi công ty Mitsubishi và NTT vào năm 2000. Thuộc dạng block cipher với khóa đối xứng với chiều dài khối là 128 bits và độ dài khóa là 128 hoặc 192 hoặc 256 bits.</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default HomePage;

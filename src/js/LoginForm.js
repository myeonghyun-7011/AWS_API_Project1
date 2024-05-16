import React, { useState } from 'react';
import '../css/LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [accessKeyId, setAccessKeyId] = useState('');
    const [accessKeyPw, setAccessKeyPw] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 서버로의 요청을 시뮬레이션하는 대신, 로그인 데이터를 콘솔에 출력합니다.
        console.log("Access Key ID:", accessKeyId);
        console.log("Access Key PW:", accessKeyPw);

        // 로그인이 성공하면 "/" 경로로 이동합니다.
        navigate("/");
    };

    return (
        <div className="login-container">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="custom-input">
                    <label htmlFor="accessKeyId"><b>Access_Key_ID</b></label>
                    <input type="text" id="accessKeyId" placeholder="Access Key ID를 입력하세요" value={accessKeyId} onChange={(e) => setAccessKeyId(e.target.value)} required />

                    <label htmlFor="accessKeyPw"><b>Access_Key_PW</b></label>
                    <input type="password" id="accessKeyPw" placeholder="Access Key PW를 입력하세요" value={accessKeyPw} onChange={(e) => setAccessKeyPw(e.target.value)} required />

                    <button type="submit">Access</button>
                </div>
                <div className="forgot-password">
                    <a>비밀번호를 잊어버리셨나요? <a href='#'>here</a></a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
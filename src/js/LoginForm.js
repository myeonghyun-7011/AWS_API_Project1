import React, { useState } from 'react';
import '../css/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import GoogleImage from '../img/구글.png';
import KakaoImage from '../img/카카오톡.png';
import FacebookImage from '../img/페이스북.png';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://211.183.3.100:30000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('로그인 실패');
            }

            const responseData = await response.json();
            if (responseData.message === "success") {
                sessionStorage.setItem('userId', loginData.email);
                alert("로그인이 성공적으로 완료되었습니다.");
                console.log("로그인 성공");
                navigate("/");
            } else {
                console.log("서버 응답: 성공 메시지를 받았으나 처리 실패");
            }
        } catch (error) {
            console.error('Error:', error);
        }      
    };

    
    return (
        <div className="login-container">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="custom-input">
                    <label htmlFor="email"><b>ID</b></label>
                    <input type="text" id="email" placeholder="ID를 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} required />
            
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" id="password" placeholder="PW 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} required />
            
                    <button type="submit">SIGN IN</button>
                </div>
                <div className="social-login">
                    <button type="button">
                        <img src={FacebookImage} alt="Facebook" />
                    </button>
                    <button type="button">
                        <img src={GoogleImage} alt="Google" />
                    </button>
                    <button type="button">
                        <img src={KakaoImage} alt="Kakao" />
                    </button>
                </div>
                <div className="forgot-password">
                    <a>비밀번호를 잊어버리셨나요? <a href='#'>here</a></a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;

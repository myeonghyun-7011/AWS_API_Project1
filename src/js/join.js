import React, { useState } from 'react';
import '../css/Join.css';
import { useNavigate } from 'react-router-dom';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            phone: phone
        };

        try {
            const response = await fetch('http://example.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }

            // 회원가입 성공 시 다음 페이지로 이동
            navigate('/'); // 메인 홈으로 이동

        } catch (error) {
            // 오류 처리
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="join-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className="join-input">
                    <label htmlFor="name"><b>이름</b></label>
                    <input type="text" id="name" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} required />

                    <label htmlFor="password"><b>비밀번호</b></label>
                    <input type="password" id="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <label htmlFor="confirmPassword"><b>비밀번호 확인</b></label>
                    <input type="password" id="confirmPassword" placeholder="비밀번호를 다시 입력하세요" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <label htmlFor="email"><b>이메일</b></label>
                    <input type="email" id="email" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="phone"><b>핸드폰번호</b></label>
                    <input type="tel" id="phone" placeholder="핸드폰번호를 입력하세요" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                    <button type="submit">가입하기</button>
                </div>
            </form>
        </div>
    );
};

export default JoinForm;

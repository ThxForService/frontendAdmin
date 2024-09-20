import React from 'react';
import { apiRegisterGroupCounseling } from '../api/groupCounselingApi';

const RegisterPage = ({ formData, onSubmit, title }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    onSubmit(Object.fromEntries(data)); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {/* 입력 필드들 */}
      <input name="name" defaultValue={formData?.name} placeholder="프로그램 이름" required />
      {/* 다른 입력 필드들도 추가 */}
      <button type="submit">제출</button>
    </form>
  );
};

export default RegisterPage;

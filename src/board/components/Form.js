import React, { useEffect, useState } from 'react';
import { createBoard, updateBoard } from '@/board/apis/apiboard';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FaCheckSquare, FaSquare } from 'react-icons/fa'; 

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  background-color: #f9f9f9; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  div {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); 
    display: flex; 
    align-items: center;
  }

  label {
    margin-right: 10px;
    cursor: pointer; 
  }

  button {
    padding: 10px;
    background-color: #b0c4de;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }

  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
`;

const Form = ({ initialValues }) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleToggle = (name) => {
    setForm({
      ...form,
      [name]: !form[name],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.mode === 'edit') {
        await updateBoard(form);
      } else {
        await createBoard(form);
      }
      router.replace('/board/list');
    } catch (error) {
      setErrors(error.message);
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <label>게시판 ID:</label>
        <input
          type="text"
          name="bid"
          value={form.bid}
          onChange={handleChange}
          required
          readOnly={form.mode === 'edit'}
        />
      </div>

      <div>
        <label>게시판 이름:</label>
        <input
          type="text"
          name="bname"
          value={form.bname}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label onClick={() => handleToggle('active')}>
          활성화 {form.active ? <FaCheckSquare /> : <FaSquare />}
        </label>
      </div>

      <div>
        <label>한 페이지당 게시글 수:</label>
        <input
          type="number"
          name="rowsPerPage"
          value={form.rowsPerPage}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>PC 네비게이션 수:</label>
        <input
          type="number"
          name="pageCountPc"
          value={form.pageCountPc}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>모바일 네비게이션 수:</label>
        <input
          type="number"
          name="pageCountMobile"
          value={form.pageCountMobile}
          onChange={handleChange}
        />
      </div>


      <div>
        <label onClick={() => handleToggle('useComment')}>
          댓글 사용 {form.useComment ? <FaCheckSquare /> : <FaSquare />}
        </label>
      </div>

      <div>
        <label onClick={() => handleToggle('useEditor')}>
          에디터 사용 {form.useEditor ? <FaCheckSquare /> : <FaSquare />}
        </label>
      </div>

      <div>
        <label onClick={() => handleToggle('useUploadImage')}>
          이미지 첨부 사용{' '}
          {form.useUploadImage ? <FaCheckSquare /> : <FaSquare />}
        </label>
      </div>

      <div>
        <label onClick={() => handleToggle('useUploadFile')}>
          파일 첨부 사용 {form.useUploadFile ? <FaCheckSquare /> : <FaSquare />}
        </label>
      </div>

      <button type="submit">
        {form.mode === 'edit' ? '게시판 수정' : '게시판 등록'}
      </button>

      {errors && <div className="error">{errors}</div>}
    </FormContainer>
  );
};

export default Form;

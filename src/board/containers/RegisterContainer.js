'use client';
import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useRouter } from 'next/navigation';
import { getBoardInfo, createBoard, updateBoard } from '@/board/apis/apiboard';
import Form from '@/board/components/Form';

const BoardContainer = ({ bid }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  const router = useRouter();
  const [form, setForm] = useState({
    mode: bid ? 'edit' : 'add',
    bid: bid || '',
    bname: '',
    listOrder: 0,
    active: false,
    rowsPerPage: 20,
    pageCountPc: 10,
    pageCountMobile: 5,
    useReply: false,
    useComment: false,
    useEditor: false,
    useUploadImage: false,
    useUploadFile: false,
    htmlTop: '',
    htmlBottom: ''
  });
  const [errors, setErrors] = useState(null);

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode(bid ? 'update' : 'register');
  }, [setMenuCode, setSubMenuCode, bid]);

  useEffect(() => {
    if (bid) {
      fetchBoardInfo();
    }
  }, [bid]);

  const fetchBoardInfo = async () => {
    try {
      const data = await getBoardInfo(bid);
      setForm({
        ...data,
        mode: 'edit',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = useCallback(async (e) => {
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
  }, [form, router]);

  return (
    <div>
      <h1>{form.mode === 'edit' ? '게시판 수정' : '게시판 등록'}</h1>
      <Form
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {errors && <div className="error">{errors}</div>}
    </div>
  );
};

export default React.memo(BoardContainer);

'use client';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import Form from '@/board/components/Form';
import { getBoardInfo } from '@/board/apis/apiboard';

const BoardContainer = ({ bid }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  const [initialValues, setInitialValues] = useState({
    mode: 'add',
    listOrder: 0,
    bid: '',
    bname: '',
    active: false,
    rowsPerPage: 20,
    pageCountPc: 10,
    pageCountMobile: 5,
    useReply: false,
    useComment: false,
    useEditor: false,
    useUploadImage: false,
    useUploadFile: false,
    locationAfterWriting: 'list',
    showListBelowView: false,
    skin: 'default',
    category: '',
    listAccessType: 'ALL',
    viewAccessType: 'ALL',
    writeAccessType: 'ALL',
    replyAccessType: 'ALL',
    commentAccessType: 'ALL',
    htmlTop: '',
    htmlBottom: ''
  });

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode(bid ? 'update' : 'register'); 
    if (bid) {
      fetchBoardInfo(); 
    }
  }, [setSubMenuCode, setMenuCode, bid]);

  const fetchBoardInfo = async () => {
    try {
      const data = await getBoardInfo(bid);
      setInitialValues({ ...data, mode: 'edit' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{bid ? '게시판 수정' : '게시판 등록'}</h1>
      <Form initialValues={initialValues} />
    </div>
  );
};

export default React.memo(BoardContainer);

'use client';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import Form from '@/board/components/Form';
import { getBoardInfo } from '@/board/apis/apiboard';

const UpdateContainer = ({ bid }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  const [initialValues, setInitialValues] = useState({
    mode: 'edit',
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
    setMenuCode("board");
    setSubMenuCode("register");
    fetchBoardInfo(); // 게시판 정보 가져오기
  }, [setSubMenuCode, setMenuCode]);

  const fetchBoardInfo = async () => {
    try {
      const data = await getBoardInfo(bid);
      setInitialValues({ ...data, mode: 'edit' });
    } catch (error) {
      console.error('Error fetching board info:', error);
    }
  };

  return (
    <div>
      <h1>게시판 수정</h1>
      <Form initialValues={initialValues} />
    </div>
  );
};

export default React.memo(UpdateContainer);
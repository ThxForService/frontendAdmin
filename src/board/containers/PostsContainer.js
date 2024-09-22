'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import Form from '@/board/components/Form'; 

const PostsContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  
  useLayoutEffect(() => {
    setMenuCode("board");
    setSubMenuCode("register");
  }, [setSubMenuCode, setMenuCode]);
  
  const initialValues = {
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
  };

  return (
    <div>
      <h1>게시판 등록</h1>
      <Form initialValues={initialValues} />
    </div>
  );
};

export default React.memo(PostsContainer);

'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import List from '@/board/components/list';
import { boardList, deleteBoard } from '@/board/apis/apiboard'; 
const ListContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  const [items, setItems] = useState([]);

  // 메뉴 코드 설정 
  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('list');
  }, [setSubMenuCode, setMenuCode]);

  // 게시판 목록 조회
  const fetchBoardList = async () => {
    try {
      const result = await boardList();
      setItems(result);
    } catch (err) {
      console.error('게시판 목록 조회 실패:', err);
    }
  };

  // 게시판 삭제 기능
  const handleDelete = async (bid) => {
    try {
      await deleteBoard(bid);

      fetchBoardList();
    } catch (err) {
      console.error('게시판 삭제 실패:', err);
    }
  };

  // 컴포넌트 마운트 시 목록 조회
  useEffect(() => {
    fetchBoardList();
  }, []);


  return (
    <section>
      <h1>게시판 목록</h1>

      <List
        items={items}
        onDelete={handleDelete} 
      />
    </section>
  );
};

export default React.memo(ListContainer);

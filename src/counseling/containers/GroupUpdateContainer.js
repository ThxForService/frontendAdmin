'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';

const GroupUpdateContainer = ({ params }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  const { pgmSeq } = params;

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode(pgmSeq ? 'update' : 'register');
  }, [setMenuCode, setSubMenuCode, pgmSeq]);

  return <h1>집단 상담 프로그램 등록/수정...</h1>;
};

export default React.memo(GroupUpdateContainer);

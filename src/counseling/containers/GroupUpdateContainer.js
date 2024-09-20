'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import GroupRegisterPage from '@/app/counseling/group/register/page';
import {RegisterPage} from '../components/GroupProgramForm';

const GroupUpdateContainer = ({ params }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  const { pgmSeq } = params;

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode(pgmSeq ? 'update' : 'register');
  }, [setMenuCode, setSubMenuCode, pgmSeq]);

  return (
      
  );
};

export default React.memo(GroupUpdateContainer);

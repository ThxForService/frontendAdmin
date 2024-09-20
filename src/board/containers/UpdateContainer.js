'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import RequestBoardConfigForm from '@/board/components/Form'; 

const UpdateContainer = () => {
    const { setMenuCode, setSubMenuCode } = getCommonActions();
    
    useLayoutEffect(() => {
        setMenuCode("board");
        setSubMenuCode("register");
    }, [setSubMenuCode, setMenuCode]);
    
    return (
        <div>
            <h1>게시판 등록/수정</h1>
            <RequestBoardConfigForm /> 
        </div>
    );
};

export default React.memo(UpdateContainer);

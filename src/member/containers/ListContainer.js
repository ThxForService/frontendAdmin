'use client';
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { apiGetMemberList, apiDeleteMember } from '../apis/apiInfo';
import Pagination from '@/commons/components/Pagination';
import MemberList from '../components/MemberList';
import apiRequest from '@/commons/libs/apiRequest';

const ListContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

   // 회원 목록 데이터를 저장할 state
   const [memberList, setMemberList] = useState([]);
   const [pagination, setPagination] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [page, setPage] = useState(1);
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedMember, setSelectedMember] = useState(null);

  useLayoutEffect(() => {
    setMenuCode('member');
    setSubMenuCode('list');
  }, [setMenuCode, setSubMenuCode]);

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        setLoading(true);
        const searchParams = {
          page: page,
          limit: 20,
          sopt: 'ALL',
          skey: '',
        };

        const data = await apiGetMemberList(searchParams);
        setMemberList(data.items);
        setPagination(data.pagination);
      } catch (err) {
        console.error('회원 목록 조회 오류:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberList();
  }, [page]);

  const onPageClick = useCallback((newPage) => {
    setPage(newPage);
  }, []);



  const handleEmailClick = (member) => {
    setSelectedMember(member); // 클릭한 회원 정보 설정
    setModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
    setSelectedMember(null); // 선택된 회원 초기화
  };

  // 회원 삭제 클릭 핸들러
  const handleDeleteClick = async (member) => {
    if (window.confirm(`정말로 ${member.username}님을 탈퇴시키겠습니까?`)) {
      try {
        await apiDeleteMember(member.memberSeq);
        setMemberList((prevList) => prevList.filter((m) => m.memberSeq !== member.memberSeq));
        alert('회원이 성공적으로 탈퇴되었습니다.');
      } catch (err) {
        console.error('회원 탈퇴 오류:', err);
        setError(err);
        alert('회원 탈퇴에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return <h1>로딩 중...</h1>;
  }

  if (error) {
    return <h1>오류 발생: {error.message}</h1>;
  }


  return (
    <>
      <MemberList
        memberList={memberList}
        loading={loading}
        error={error}
        onEmailClick={handleEmailClick} // 이메일 클릭 핸들러 전달
        onDeleteClick={handleDeleteClick} // 삭제 핸들러 전달
      />
      <Pagination pagination={pagination} onClick={onPageClick} />

    </>
  );
};

export default React.memo(ListContainer);

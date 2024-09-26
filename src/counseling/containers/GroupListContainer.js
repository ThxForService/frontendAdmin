'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { apiGetGroupProgramList } from '../apis/apiGroupProgram';
import { apiDeleteGroupCounseling } from '../apis/apiGroupProgram';
import { useRouter } from 'next/navigation';
import Pagination from '@/commons/components/Pagination';
import Link from 'next/link';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* 버튼 간의 간격 */
`;

const StyledButton = styled.button`
  background-color: ${({ variant }) => (variant === 'primary' ? '#0070f3' : '#000')}; /* 검은색 배경 */
  color: #ffffff; /* 흰색 글씨 */
  border: none;
  border-radius: 5px;
  padding: 13px 50px; /* 버튼 크기 좁힘 */
  cursor: pointer;
  font-size: 14px; /* 폰트 크기 조정 */
  
  &:hover {
    background-color: ${({ variant }) => (variant === 'primary' ? '#005bb5' : '#333')}; /* 호버 시 색상 */
  }

  &:focus {
    outline: none; /* 포커스 시 테두리 제거 */
  }
`;

const StyledListItems = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 1000px;
  margin: 30px auto 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f9f9f9;
    }
  }
`;

const GroupListContainer = ({ searchParams }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode('group');
  }, [setMenuCode, setSubMenuCode]);

  const [programs, setPrograms] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGetGroupProgramList(searchParams);
        setPrograms(data.items);
        setPagination(data.pagination);
      } catch (err) {
        setErrors(err.message);
      }
    })();
  }, [searchParams]);

  const onChangePage = useCallback((p) => {
    setSearch((search) => ({ ...search, page: p }));
    window.location.hash = '#root';
  }, []);

  return (
    <div>
      <h1>집단 상담 프로그램 목록</h1>
      <StyledListItems>
        {programs &&
          programs.length > 0 &&
          programs.map(({ pgmSeq, pgmNm }) => (
            <li key={pgmSeq}>
              <span>{pgmNm}</span> {/* 프로그램 이름을 일반 텍스트로 표시 */}
              <ButtonContainer>
                <Link href={`/counseling/group/update/${pgmSeq}`}>
                  <StyledButton type="button" variant="primary">
                    {t('수정 및 삭제 바로가기')}
                  </StyledButton>
                </Link>
              </ButtonContainer>
            </li>
          ))}
      </StyledListItems>
      {pagination && (
        <Pagination pagination={pagination} onClick={onChangePage} />
      )}
    </div>
  );
};

export default React.memo(GroupListContainer);

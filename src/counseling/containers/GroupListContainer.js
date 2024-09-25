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
import { StyledButton } from '@/commons/components/buttons/StyledButton';

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

  const onDelete = useCallback(
    async (pgmSeq) => {
      if (confirm(t('정말 삭제하겠습니까?'))) {
        try {
          await apiDeleteGroupCounseling(pgmSeq);
          const res = await apiGetGroupProgramList(searchParams);
          setData(res);
          alert(t('삭제가 완료되었습니다.'));
        } catch (err) {
          setErrors(err.message);
          alert(t('삭제 중 오류가 발생했습니다.'));
        }
      }
    },
    [searchParams, t],
  );

  return (
    <div>
      <h1>집단 상담 프로그램 목록</h1>
      <ul>
        {programs &&
          programs.length > 0 &&
          programs.map(({ pgmSeq, pgmNm }) => (
            <li key={pgmSeq}>
              {pgmNm}
              <Link href={`/counseling/group/update/${pgmSeq}`}>
                <StyledButton type="button" variant="primary">
                  {t('수정')}
                </StyledButton>
              </Link>
              <StyledButton type="button" onClick={() => onDelete(pgmSeq)}>
                {t('삭제')}
              </StyledButton>
            </li>
          ))}
      </ul>
      {pagination && (
        <Pagination pagination={pagination} onClick={onChangePage} />
      )}
    </div>
  );
};

export default React.memo(GroupListContainer);

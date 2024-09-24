'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import GroupProgramForm from '../components/GroupProgramForm';
import { useRouter } from 'next/navigation';
import {
  apiRegisterGroupCounseling,
  apiUpdateGroupCounseling,
} from '../apis/apiGroupProgram';

import status from '../constants/programStatus';

const initialForm = {
  pgmNm: '',
  description: '',
  programStartDate: '',
  programStartTime: '',
  startDate: '',
  endDate: '',
  capacity: 5,
  status: 'READY',
  empNo: '',
};

const GroupUpdateContainer = ({ params }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  const { pgmSeq } = params;

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode(pgmSeq ? 'update' : 'register');
  }, [setMenuCode, setSubMenuCode, pgmSeq]);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []); // 입력할때마다 change형태의 이벤트 발생 (name, value 속성을 통해 form 업데이트)

  const onClick = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onReset = useCallback(() => setForm(initialForm), []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /* 유효성 검사 S */

      
      /* 유효성 검사 E */

      (async () => {
        try {
          if (pgmSeq) {
            // 프로그램 수정
            await apiUpdateGroupCounseling(pgmSeq, form);
          } else {
            // 프로그램 등록
            await apiRegisterGroupCounseling(form);
          }

          // 프로그램 목록 이동
          router.replace('/counseling/group');
        } catch (error) {
          const message = error.message;
          setErrors(
            typeof message === 'string' ? { global: [message] } : message,
          );

          // 에러 처리 로직 추가
        }
      })();
    },
    [form, pgmSeq],
  );

  return (
    <GroupProgramForm
      form={form}
      errors={errors}
      onChange={onChange}
      onReset={onReset}
      onClick={onClick}
      status={status}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(GroupUpdateContainer);
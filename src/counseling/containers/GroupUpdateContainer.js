'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import GroupProgramForm from '../components/GroupProgramForm';
import { apiRegisterGroupCounseling, apiUpdateGroupCounseling } from '../apis/apiGroupProgram';

const GroupUpdateContainer = ({ params }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  const { pgmSeq } = params;

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode(pgmSeq ? 'update' : 'register');
  }, [setMenuCode, setSubMenuCode, pgmSeq]);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []); // 입력할때마다 change형태의 이벤트 발생 (name, value 속성을 통해 form 업데이트)

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (pgmSeq) {
        // 프로그램 수정
        await apiUpdateGroupCounseling(pgmSeq, form);
        console.log('프로그램 수정 완료');
      } else {
        // 프로그램 등록
        await apiRegisterGroupCounseling(form);
        console.log('프로그램 등록 완료');
      }
      
    } catch (error) {
      console.error('저장 실패:', error);
      // 에러 처리 로직 추가
    }
  }, [form, pgmSeq]);

  return (
    <GroupProgramForm
      form={form}
      errors={errors}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(GroupUpdateContainer);

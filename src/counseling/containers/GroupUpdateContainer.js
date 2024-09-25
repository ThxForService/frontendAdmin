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
import { useTranslation } from 'react-i18next';
import {
  apiRegisterGroupCounseling,
  apiUpdateGroupCounseling,
  apiGetGroupProgramView,
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
  const { t } = useTranslation();

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode(pgmSeq ? 'update' : 'register');
  }, [setMenuCode, setSubMenuCode, pgmSeq]);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pgmSeq) {
      (async () => {
        try {
          const data = await apiGetGroupProgramView(pgmSeq);
          if (data) {
            let _date = data.pgmStartDate;
            if (_date && _date.trim()) {
              _date = _date.split(' ');
              data.programStartDate = _date[0];
              data.programStartTime = _date[1];
            }
            setForm(data);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [pgmSeq]);

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

      let _errors = {};
      let hasErrors = false;

      setErrors({});

      /* 유효성 검사 S */
      const requiredFields = {
        pgmNm: t('프로그램명을_입력하세요.'),
        description: t('프로그램 설명을_입력하세요.'),
        empNo: t('상담사_사번을_입력하세요.'),
        programStartDate: t('프로그램 시작일자를_입력하세요.'),
        programStartTime: t('프로그램 시작일시를_입력하세요.'),
        startDate: t('신청 시작일자를_입력하세요.'),
        endDate: t('신청 종료일자를_입력하세요.'),
      };

      for (const [field, message] of Object.entries(requiredFields)) {
        if (
          (typeof form[field] === 'string' && !form[field].trim()) ||
          (typeof form[field] !== 'string' && !form[field])
        ) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      const programStartDate = new Date(form.programStartDate);
      const startDate = new Date(form.startDate);
      const endDate = new Date(form.endDate);

      if (programStartDate < startDate || programStartDate < endDate) {
        _errors.programStartDate = _errors.programStartDate ?? [];
        _errors.programStartDate.push(
          t('프로그램 시작일은 신청 기간보다 과거일 수 없습니다.'),
        );
        hasErrors = true;
      }

      if (endDate < startDate) {
        _errors.endDate = _errors.endDate ?? [];
        _errors.endDate.push(
          t('신청 종료일자는 신청 시작일자보다 과거일 수 없습니다.'),
        );
        hasErrors = true;
      }

      setErrors(_errors);
      if (hasErrors) {
        return;
      }

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
        }
      })();
    },
    [form, t, router, pgmSeq],
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

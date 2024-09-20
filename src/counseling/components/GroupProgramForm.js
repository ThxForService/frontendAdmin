import React, { useState } from 'react';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FormBox = styled.form`
  dl {
    display: flex;
    align-items: center;

    dt {
      width: 120px;
    }

    dd {
      flex-grow: 1;
    }
  }

  button {
    margin: 20px 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #0070f3; 
    color: white;
    font-size: 16px;

    &:hover {
      background-color: #005bb5; 
    }
  }
`;

const GroupProgramForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    pgmNm: '',
    description: '',
    programStartDate: '',
    startDate: '',
    endDate: '',
    capacity: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm({
      pgmNm: '',
      description: '',
      programStartDate: '',
      startDate: '',
      endDate: '',
      capacity: '',
      status: '',
    });
  };

  return (
    <FormBox autoComplete="off" onSubmit={onSubmit}>
      <dl>
        <dt>{t('집단 상담 프로그램명')}</dt>
        <dd>
          <StyledInput name="pgmNm" value={form.pgmNm} onChange={handleChange} required />
        </dd>
      </dl>
      <dl>
        <dt>{t('프로그램 설명')}</dt>
        <dd>
          <StyledInput name="description" value={form.description} onChange={handleChange} required />
        </dd>
      </dl>
      <dl>
        <dt>{t('프로그램 시작일')}</dt>
        <dd>
          <StyledInput type="date" name="programStartDate" value={form.programStartDate} onChange={handleChange} required />
        </dd>
      </dl>
      <dl>
        <dt>{t('신청 시작일')}</dt>
        <dd>
          <StyledInput type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
        </dd>
      </dl>
      <dl>
        <dt>{t('신청 종료일')}</dt>
        <dd>
          <StyledInput type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
        </dd>
      </dl>
      <dl>
        <dt>{t('신청 정원')}</dt>
        <dd>
          <StyledInput type="number" name="capacity" value={form.capacity} onChange={handleChange} required />
        </dd>
      </dl>
      <dl>
        <dt>{t('접수 상태')}</dt>
        <dd>
          <StyledInput name="status" value={form.status} onChange={handleChange} required />
        </dd>
      </dl>
      <button type="button" onClick={handleReset}>{t('다시 입력')}</button>
      <button type="submit">{t('등록')}</button>
    </FormBox>
  );
};

export default React.memo(GroupProgramForm);

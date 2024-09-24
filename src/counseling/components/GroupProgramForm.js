import React from 'react';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IoIosRadioButtonOn, IoIosRadioButtonOff } from 'react-icons/io';

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

const GroupProgramForm = ({
  onSubmit,
  form,
  onChange,
  onReset,
  onClick,
  status,
}) => {
  const { t } = useTranslation();

  return (
    <FormBox autoComplete="off" onSubmit={onSubmit}>
      <dl>
        <dt>{t('집단 상담 프로그램명')}</dt>
        <dd>
          <StyledInput
            name="pgmNm"
            value={form?.pgmNm ?? ''}
            onChange={onChange}
            required
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('프로그램 설명')}</dt>
        <dd>
          <StyledInput
            name="description"
            value={form?.description ?? ''}
            onChange={onChange}
            required
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('상담사 사번')}</dt>
        <dd>
          <StyledInput
            name="empNo"
            value={form?.empNo ?? ''}
            onChange={onChange}
            required
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('프로그램 시작일')}</dt>
        <dd>
          <StyledInput
            type="date"
            name="programStartDate"
            value={form?.programStartDate ?? ''}
            onChange={onChange}
            required
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('프로그램 시작시간')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="programStartTime"
            value={form?.programStartTime ?? ''}
            onChange={onChange}
            required
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('신청 시작일')}</dt>
        <dd>
          <StyledInput
            type="date"
            name="startDate"
            value={form?.startDate ?? ''}
            onChange={onChange}
            required
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('신청 종료일')}</dt>
        <dd>
          <StyledInput
            type="date"
            name="endDate"
            value={form?.endDate ?? ''}
            onChange={onChange}
            required
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('신청 정원')}</dt>
        <dd>
          <select
            name="capacity"
            value={form?.capacity ?? 5}
            onChange={onChange}
          >
            {[...new Array(31).keys()].slice(5).map((i) => (
              <option key={`capacity_${i}`} value={i}>
                {i}
                {t('명')}
              </option>
            ))}
          </select>
        </dd>
      </dl>
      <dl>
        <dt>{t('접수 상태')}</dt>
        <dd>
          {Object.keys(status).map((s) => (
            <span key={`status_${s}`} onClick={() => onClick('status', s)}>
              {s === form?.status ? (
                <IoIosRadioButtonOn />
              ) : (
                <IoIosRadioButtonOff />
              )}{' '}
              {status[s]}
            </span>
          ))}
        </dd>
      </dl>
      <button type="button" onClick={onReset}>
        {t('다시 입력')}
      </button>
      <button type="submit">{t('등록')}</button>
    </FormBox>
  );
};

export default React.memo(GroupProgramForm);
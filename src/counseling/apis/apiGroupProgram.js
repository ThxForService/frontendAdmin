import apiRequest from '../../commons/libs/apiRequest';
import requestData from '@/commons/libs/requestData';
//프로그램 등록
export const apiRegisterGroupCounseling = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/reservation/admin/group/register', 'POST', form)
      .then((res) => {
        if (res.status !== 201) {
          reject(res.data);
          return;
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

// 프로그램 수정
export const apiUpdateGroupCounseling = (pgmSeq, form) =>
  new Promise((resolve, reject) => {
    apiRequest(`/reservation/admin/group/update/${pgmSeq}`, 'PATCH', form)
      .then((res) => {
        if (res.status !== 200) {
          reject(res.data);
          return;
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

//프로그램 삭제
export const apiDeleteGroupCounseling = (pgmSeq) =>
  new Promise((resolve, reject) => {
    apiRequest(`/reservation/admin/group/${pgmSeq}`, 'DELETE')
      .then((res) => {
        if (res.status !== 204) {
          reject(res.data);
          return;
        }
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

// 프로그램 목록 조회
export const apiGetGroupProgramList = (searchParams) =>
  requestData('/reservation/group/program/info');

//프로그램 목록 단일 조회
export const apiGetGroupProgramView = (pgmSeq) =>
  requestData(`/reservation/group/program/info/${pgmSeq}`);

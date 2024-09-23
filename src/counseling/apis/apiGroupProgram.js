import apiRequest from '../../commons/libs/apiRequest';

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
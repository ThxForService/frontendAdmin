import apiRequest from '@/commons/libs/apiRequest'; 
import requestData from './requestData';

// 게시판 생성 API 호출 함수
export const createBoard = async (form) => {
  try {
    const response = await apiRequest('/board/admin/save', 'POST', form);
    console.log(form)
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

// 게시판 수정 API 호출 함수
export const updateBoard = async (form) => {
  try {
    const response = await apiRequest('/board/admin/save', 'PATCH', form);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};


// 게시판 목록 조회 함수
const boardList = (url) => {
    const method = 'GET';
  
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await requestData('/board/admin/list', method);
          resolve(res.items); // 조회된 게시글 목록 반환
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })();
    });
  };

// API 에러 처리 공통 함수
const handleApiError = (error) => {
  console.error('API 요청 중 오류 발생:', error);
  // 오류 응답 데이터가 있을 경우 처리
  if (error.response && error.response.data && error.response.data.errors) {
    throw error.response.data.errors;
  }
  throw new Error('API 요청에 문제가 발생했습니다.');
};


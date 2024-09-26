import requestData from "@/commons/libs/requestData";
import apiRequest from "@/commons/libs/apiRequest";

export const getProfessors = (skey) =>
    requestData(`/member/account/professors?skey=${skey?.trim()}`);

// 회원 목록 조회 API
export const apiGetMemberList = (search) => {
    // 검색 조건이 없으면 빈 객체로 초기화
    search = search ?? {};
  
    // 검색 조건을 쿼리 스트링 형식으로 변환
    const qs = [];
  
    for (const [key, value] of Object.entries(search)) {
      qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  
    // 기본 URL 설정
    let url = '/member/member/list';
    // 검색 조건이 있으면 URL에 쿼리 스트링을 추가
    if (qs.length > 0) url += `?${qs.join('&')}`;
  
    // requestData 함수를 사용하여 API 요청
    return requestData(url);
  };
  
  // 회원 한명 조회 API
  export const apiGetMemberInfo = (email) => {
    // 이메일이 제공되지 않으면 에러 처리
    if (!email) {
      throw new Error("이메일은 필수 입력입니다.");
    }
  
    // 기본 URL 설정
    const url = `/info/${encodeURIComponent(email)}`;
  
    // requestData 함수를 사용하여 API 요청
    return requestData(url);
  };

export const apiDeleteMember = (memberSeq) => new Promise((resolve, reject) => {
    apiRequest(`/member/member/delete/${memberSeq}`, 'DELETE')
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
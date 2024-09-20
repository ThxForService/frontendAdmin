import React, { useState } from 'react';
import { createBoard, updateBoard } from '@/board/apis/apiboard';

const RequestBoardConfigForm = () => {
  const [form, setForm] = useState({
    mode: 'add', // 모드 설정: add or edit
    listOrder: 0, // 진열 가중치
    bid: '', // 게시판 ID
    bname: '', // 게시판 이름
    active: false, // 게시판 활성화 여부
    rowsPerPage: 20, // 한 페이지 게시글 수
    pageCountPc: 10, // PC 페이지 네비게이션 수
    pageCountMobile: 5, // 모바일 페이지 네비게이션 수
    useReply: false, // 답글 사용 여부
    useComment: false, // 댓글 사용 여부
    useEditor: false, // 에디터 사용 여부
    useUploadImage: false, // 이미지 첨부 사용 여부
    useUploadFile: false, // 파일 첨부 사용 여부
    locationAfterWriting: 'list', // 작성 후 이동할 위치
    showListBelowView: false, // 게시판 하단 목록 노출 여부
    skin: 'default', // 게시판 스킨
    category: '', // 게시판 카테고리
    listAccessType: 'ALL', // 글 목록 권한 설정
    viewAccessType: 'ALL', // 글 보기 권한 설정
    writeAccessType: 'ALL', // 글 쓰기 권한 설정
    replyAccessType: 'ALL', // 답글 권한 설정
    commentAccessType: 'ALL', // 댓글 권한 설정
    htmlTop: '', // 상단 HTML
    htmlBottom: '' // 하단 HTML
  });

  const [errors, setErrors] = useState(null); // 에러 상태 관리

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.mode === 'add') {
        await createBoard(form); // 게시판 생성
      } else {
        await updateBoard(form); // 게시판 수정
      }
      alert('게시판이 성공적으로 처리되었습니다.');
      setForm({ ...form, mode: 'add', bid: '', bname: '' });
    } catch (error) {
      setErrors(error); // 에러 발생 시 처리
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>게시판 ID:</label>
        <input
          type="text"
          name="bid"
          value={form.bid}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>게시판 이름:</label>
        <input
          type="text"
          name="bname"
          value={form.bname}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>진열 가중치:</label>
        <input
          type="number"
          name="listOrder"
          value={form.listOrder}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>활성화:</label>
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>게시판 스킨:</label>
        <select name="skin" value={form.skin} onChange={handleChange}>
          <option value="default">default</option>
        </select>
      </div>

      <div>
        <label>한 페이지당 게시글 수:</label>
        <input
          type="number"
          name="rowsPerPage"
          value={form.rowsPerPage}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>PC 네비게이션 수:</label>
        <input
          type="number"
          name="pageCountPc"
          value={form.pageCountPc}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>모바일 네비게이션 수:</label>
        <input
          type="number"
          name="pageCountMobile"
          value={form.pageCountMobile}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>답글 사용:</label>
        <input
          type="checkbox"
          name="useReply"
          checked={form.useReply}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>댓글 사용:</label>
        <input
          type="checkbox"
          name="useComment"
          checked={form.useComment}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>에디터 사용:</label>
        <input
          type="checkbox"
          name="useEditor"
          checked={form.useEditor}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>이미지 첨부 사용:</label>
        <input
          type="checkbox"
          name="useUploadImage"
          checked={form.useUploadImage}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>파일 첨부 사용:</label>
        <input
          type="checkbox"
          name="useUploadFile"
          checked={form.useUploadFile}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{form.mode === 'add' ? '게시판 등록' : '게시판 수정'}</button>
    </form>
  );
};

export default RequestBoardConfigForm;

import React from 'react';

const Form = ({
  form,
  handleChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>게시판 ID:</label>
      <input
        type="text"
        name="bid"
        value={form.bid}
        onChange={handleChange}
        required
        readOnly={form.mode === 'edit'}
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

    <div>
      <label>HTML 상단:</label>
      <textarea name="htmlTop" value={form.htmlTop} onChange={handleChange} />
    </div>

    <div>
      <label>HTML 하단:</label>
      <textarea name="htmlBottom" value={form.htmlBottom} onChange={handleChange} />
    </div>

    <button type="submit">
      {form.mode === 'edit' ? '게시판 수정' : '게시판 등록'}
    </button>
  </form>
);

export default Form;

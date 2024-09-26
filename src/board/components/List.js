import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: center;
    min-width: 120px; 
  }

  th {
    background-color: #f4f4f4;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;

  &.edit {
    background-color: #b0c4de;
    color: black;
  }

  &.delete {
    background-color: #ffcccb; 
    color: black;
  }

  &:hover {
    opacity: 0.8; 
  }
`;

const List = ({ items, onDelete }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>게시판 ID</th>
          <th>게시판 이름</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <tr key={index}>
              <td>{item.bid}</td>
              <td>{item.bname}</td>
              <td>
                <a href={`/board/update/${item.bid}`}>
                  <Button className="edit">수정하기</Button>
                </a>
                <Button className="delete" onClick={() => onDelete(item.bid)}>삭제하기</Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">조회된 게시판이 없습니다.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default List;

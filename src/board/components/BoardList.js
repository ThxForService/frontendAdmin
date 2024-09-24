'use client';
import React from 'react';

const BoardList = ({ posts }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={post.bid}>
            <td>{index + 1}</td>
            <td>{post.subject}</td>
            <td>{post.poster}</td>
            <td>{post.viewCount}</td>
            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BoardList;

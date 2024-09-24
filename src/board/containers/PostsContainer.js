'use client';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { boardDataList } from '@/board/apis/apiboard';
import BoardList from '@/board/components/BoardList';

const PostsContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('posts');
    fetchPosts();
  }, [setMenuCode, setSubMenuCode]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await boardDataList({ page: 1, limit: 10 }); // 페이지 및 한 페이지당 게시글 수 설정
      setPosts(data);
    } catch (err) {
      setError(err);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading posts: {error.message}</h1>;

  return (
    <div>
      <h1>게시글 목록</h1>
      <BoardList posts={posts} />
    </div>
  );
};

export default React.memo(PostsContainer);

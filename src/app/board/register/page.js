import PostsContainer from '@/board/containers/PostsContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const BoardRegisterPage = () => {
  return (
    <AdminOnlyContainer>
      <PostsContainer />
    </AdminOnlyContainer>
  );
};

export default BoardRegisterPage;

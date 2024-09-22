import UpdateContainer from '@/board/containers/UpdateContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const BoardUpdatePage = ({ params }) => {
  const { bid } = params;

  return (
    <AdminOnlyContainer>
      <UpdateContainer bid={bid} />
    </AdminOnlyContainer>
  );
};

export default BoardUpdatePage;

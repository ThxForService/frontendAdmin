import RegisterContainer from '@/board/containers/RegisterContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';

const BoardUpdatePage = ({ params }) => {
  const { bid } = params;
  return (
    <AdminOnlyContainer>
      <RegisterContainer bid={bid} />
    </AdminOnlyContainer>
  );
};

export default BoardUpdatePage;

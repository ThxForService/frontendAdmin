import RegisterContainer from '@/board/containers/RegisterContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const BoardRegisterPage = () => {
  return (
    <AdminOnlyContainer>
      <RegisterContainer />
    </AdminOnlyContainer>
  );
};

export default BoardRegisterPage;

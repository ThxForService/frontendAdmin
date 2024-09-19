import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import GroupUpdateContainer from '@/counseling/containers/GroupUpdateContainer';

const CounselingGroupPage = ({ params }) => {
  return (
    <AdminOnlyContainer>
      <GroupUpdateContainer params={params} />
    </AdminOnlyContainer>
  );
};

export default CounselingGroupPage;

import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import ListContainer from '@/member/containers/ListContainer';

export default function Home() {
  return (
    <AdminOnlyContainer>
      <ListContainer />
    </AdminOnlyContainer>
  );
}

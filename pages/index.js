import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import { Layout, Auth } from '../components';

const Index = ({ auth }) => {
  const router = useRouter();
  if(auth) {
    if (typeof window !== 'undefined') {
        router.push('/home');
    }
  } else {
    return (
      <Layout auth={auth.token}>
        <h1>Welcome to super cool NextJS social media clone!</h1>
        <Auth />
      </Layout>
    )
  }

  return <div></div>
}
export default withAuthSync(Index);
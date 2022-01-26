import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import { Layout, Auth } from '../components';

const Index = ({ auth, PRIVATE_URL }) => {
  console.log(PRIVATE_URL);
  console.log('private url: ', process.env.PRIVATE_API_URL);

  const router = useRouter();
  if(auth) {
    if (typeof window !== 'undefined') {
        router.push('/home');
    }
  } else {
    return (
      <Layout>
        <h1>Welcome to super cool NextJS social media clone!</h1>
        <Auth />
      </Layout>
    )
  }

  return <div></div>
}
export default withAuthSync(Index);
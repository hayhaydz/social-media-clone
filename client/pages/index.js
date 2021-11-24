import { withAuthSync } from '../utils/auth';
import { App, Layout, Auth } from '../components';

const Home = ({ accessToken }) => {
  return (
    <Layout>
      <h1>Welcome to super cool NextJS social media clone!</h1>
      {!accessToken ?
        <Auth /> : <App jwt={accessToken.token} />
      }
      
    </Layout>
  )
}
export default withAuthSync(Home)
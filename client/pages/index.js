import { withAuthSync } from '../utils/auth';
import { App, Layout, LoginForm } from '../components';

const Home = ({ accessToken }) => {
  return (
    <Layout>
      <h1>Welcome to super cool NextJS social media clone!</h1>
      {!accessToken ?
        <LoginForm /> : <App jwt={accessToken.token} />
      }
      
    </Layout>
  )
}
export default withAuthSync(Home)
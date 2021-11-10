import React from 'react';
import { App, Layout } from '../components';
import { getAuth } from '../utils/apiHandler';
import { auth } from '../utils/auth';

const Home = () => {
  const token = auth();

  return (
    <Layout>
      <App />
    </Layout>
  )
}
export default Home
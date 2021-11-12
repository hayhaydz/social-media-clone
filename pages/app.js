import React from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { withAuthSync } from '../utils/auth';
import { getAuth } from '../utils/apiHandler';
import { Layout } from '../components';

const App = ({ accessToken, privateAPIURL }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: user = {}, error } = useSWR([`${privateAPIURL}/api/user`, accessToken.token], fetcher);
    if(error) return <div>Failed to find user...</div>;

    return (
        <Layout>
            <section>
                <h1>This is the app page</h1>
                <span>Welcome</span>
                <p>{`${user.first_name} ${user.last_name}`}</p>
            </section>
        </Layout>
    )
}

export default withAuthSync(App)
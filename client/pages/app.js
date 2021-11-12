import React, { useReducer } from 'react';
import Router from 'next/router';
import { Layout } from '../components';
import { withAuthSync, getToken, auth, logout } from '../utils/auth';
import { getAuth } from '../utils/apiHandler';

const App = ({ accessToken }) => {
    console.log(accessToken);
    // console.log(process.env.PRIVATE_API_URL);

    // const response = getAuth(`${process.env.PRIVATE_API_URL}/api/user/me`, accessToken);
    // response.json().then(data => {
    //     console.log(data);
    // });

    return (
        <Layout>
            <section>
                <h1>This is the app page</h1>
            </section>
        </Layout>
    )
}
export default withAuthSync(App)
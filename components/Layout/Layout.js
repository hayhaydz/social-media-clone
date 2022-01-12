import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../Header/Header';
import { Error, Success } from '../';

const Layout = ({ children, auth }) => {
    const router = useRouter();

    useEffect(() => {
        if(router.query.msg) {
            setTimeout(() => {
                let path = router.asPath.split('?')[0];
                router.push(path, undefined, { scroll: false });
            }, 3000);
        }
    });

    return (
        <main className="prose m-auto mt-8 max-w-screen-xl">
            <Head>
                <title>Cool NextJS App</title>
                <meta name="description" content="A super cool NextJS app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header jwt={auth} />
            
            {children}
            {router.query.msg &&
                <div className="m-auto mb-8 max-w-xl w-full">
                    <Success text={router.query.msg} />
                </div>
            }
        </main>
    )
}
export default Layout;
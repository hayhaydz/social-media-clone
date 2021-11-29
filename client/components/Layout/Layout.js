import React from 'react';
import Head from 'next/head';
import Header from '../Header/Header';

const Layout = ({ children, auth, isRender, setIsRender }) => {
    return (
        <main className="prose m-auto mt-8 max-w-screen-xl">
            <Head>
                <title>Cool NextJS App</title>
                <meta name="description" content="A super cool NextJS app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header jwt={auth} isRender={isRender} setIsRender={setIsRender}/>
            
            {children}
        </main>
    )
}
export default Layout;
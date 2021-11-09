import React from 'react';
import Head from 'next/head'

const Layout = ({ children }) => {
    return (
        <main className="wrapper">
            <Head>
                <title>Cool NextJS App</title>
                <meta name="description" content="A super cool NextJS app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            {children}
        </main>
    )
}
export default Layout;
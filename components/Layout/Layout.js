import Head from 'next/head';
import Header from '../Header/Header';

const Layout = ({ children, auth, currentUser }) => {

    return (
        <main className="prose m-auto p-2 lg:mt-8 max-w-screen-xl">
            <Head>
                <title>Neem</title>
                <meta name="description" content="Just another social media app that misses the mark of a 'Digital Society'" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {currentUser ?
                <Header jwt={auth} currentUsersUsername={currentUser.username}/>
                : <Header jwt={auth} />
            }
            
            {children}
        </main>
    )
}
export default Layout;
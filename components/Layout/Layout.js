import Head from 'next/head';
import Header from '../Header/Header';

const Layout = ({ children, auth, currentUser }) => {

    return (
        <main className="prose m-auto p-2 md:p-0 md:mt-8 max-w-screen-xl">
            <Head>
                <title>Cool NextJS App</title>
                <meta name="description" content="A super cool NextJS app" />
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
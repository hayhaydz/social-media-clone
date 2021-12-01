import Head from 'next/head';
import Header from '../Header/Header';

const Layout = ({ children, auth, setMessage }) => {
    return (
        <main className="prose m-auto mt-8 max-w-screen-xl">
            <Head>
                <title>Cool NextJS App</title>
                <meta name="description" content="A super cool NextJS app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header jwt={auth} setMessage={setMessage} />
            
            {children}
        </main>
    )
}
export default Layout;
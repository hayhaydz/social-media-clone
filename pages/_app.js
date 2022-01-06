import { RouterScrollProvider } from '@moxy/next-router-scroll';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps}) => {
    return (
        <RouterScrollProvider>
            <Component {...pageProps}/>
        </RouterScrollProvider>
    )
}
export default MyApp;
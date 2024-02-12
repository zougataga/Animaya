import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    useState,
    useEffect
} from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Loader from '../src/components/Loader';
import Error from '../src/components/Error';
import '../src/css/Global.css';
import '../src/css/Styles.css';
import {
    Fetch,
    FetchClient
} from '../src/lib/Fetch';
export default function ({ Component, pageProps }) {
    const
        { data, loading } = Fetch({
            url: '/api/~',
            method: 'POST'
        }),
        isLog = Fetch({
            url: '/api/auth/log',
            method: 'POST'
        }),
        router = useRouter(),
        title = `Animaya // ${pageProps?.title}`,
        desc = 'Regardez des anime sous-titrés ou en français et lisez des scans de manga en ligne gratuitement sur Animaya. Mises à jour quotidiennes. Pas besoin de compte.',
        [load, setLoad] = useState(true);

    useEffect(() => {
        const
            handleStart = (url) => setLoad(true),
            handleStop = (url) => setLoad(false);
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        handleStop();
        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop)
        }
    }, []);
    // useEffect(() => {
    //     const
    //         handleContextMenu = (e) => e.preventDefault(),
    //         handleKeyDown = (e) => {
    //             if ((e.ctrlKey && e.shiftKey && e.key === 'I') ||   // Ctrl+Shift+I
    //                 (e.ctrlKey && e.shiftKey && e.key === 'J') ||   // Ctrl+Shift+J
    //                 (e.key === 'F12')) {                             // F12
    //                 e.preventDefault();
    //             }
    //         };
    //     document.addEventListener('contextmenu', handleContextMenu);
    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         document.removeEventListener('contextmenu', handleContextMenu);
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);
    return pageProps.roff ? <Component {...pageProps} /> : (
        !loading && !data ||
        data?.error
    ) ? <Error /> :
        (loading ? <Loader /> :
            (<>
                <Head>
                    <link rel='icon' href='/icons/favicon.ico' sizes='16x16' type='image/x-icon' />
                    <link rel='icon' href='/icons/favicon-32x32.png' sizes='32x32' type='image/png' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
                    <link rel='icon' sizes='192x192' href='/icons/android-chrome-192x192.png' />
                    <link rel='icon' sizes='512x512' href='/icons/android-chrome-512x512.png' />
                    <meta name='color-scheme' content='dark' />
                    {pageProps?.title ? (<title>{title}</title>) : <></>}

                    <meta property='og:title' content={pageProps?.title ? title : 'Animaya'} />
                    <meta property='og:type' content='website' />
                    <meta property='og:url' content='https://www.animaya.com/' />
                    <meta property='og:image' content='/icons/logo.png' />
                    <meta property='og:site_name' content='Animaya' />
                    <meta property='og:description' content={desc} />
                    <meta name='twitter:card' content='summary_large_image' />
                    <meta name='twitter:title' content={pageProps?.title ? title : 'Animaya'} />
                    <meta name='twitter:description' content={desc} />
                    <meta name='twitter:image' content='/icons/logo.png' />
                    <noscript><Error /></noscript>
                </Head>
                {
                    loading ? <Loader /> : ((!data || data.error) || (isLog.data && isLog.data?.error) ? <Error /> : <>
                        <Header {...pageProps} load={load} isLog={isLog} />
                        {
                            load ? <Loader navbar={true} /> :
                                (<>
                                    <div className={!pageProps?.navtransparent ?
                                        (pageProps.off ? 'backSvg h-full' : 'page-mt60')
                                        : (pageProps?.navtransparent == 'spe' ? ' h-full' : '')}>
                                        <Component
                                            isLog={isLog}
                                            {...pageProps} />
                                    </div>
                                    {(!pageProps?.off && !pageProps?.navtransparent) && <Footer />}
                                </>)
                        }
                    </>)
                }
            </>))
}
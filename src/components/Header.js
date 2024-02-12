import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import TablerIo from "../javascript/TablerIo";
import { FetchClient } from '../lib/Fetch';
import { Genres } from '../lib/Import';
export default function ({
    navtransparent,
    off,
    load,
    isLog
}) {
    const
        router = useRouter(),
        [open, setOpen] = useState(null),
        isLinkActive = (href) => 'nav-item '
        // + (("/" + router.pathname.split("/")[1] ?? router.pathname) === href ? 'active' : '')
        ,
        [navActive, setnavActive] = useState(false),
        placeholderIcon = (<>
            <div className="placeholder-glow mx-1" >
                <div className="avatar avatar-rounded bg-white placeholder" style={{ maxWidth: "40px" }}></div>
            </div>
        </>),
        placeholderLink = (<>
            <div className="placeholder-glow ms-2">
                <div className="placeholder bg-white placeholder-sm" style={{ width: '50px' }}></div>
            </div>
        </>);

    useEffect(TablerIo, [load]);
    useEffect(() => {
        const handleScroll = () => setnavActive(document.body.scrollTop || document.documentElement.scrollTop > 0);
        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll)
    }, []);
    useEffect(() => {
        const handleRouteChange = () => setOpen(false);
        router.events.on('routeChangeStart', handleRouteChange);
        return () => router.events.off('routeChangeStart', handleRouteChange)
    }, [router]);
    return (!off && <div id='navbar' className={(open || navActive || load || !navtransparent) ? 'active' : ''}>
        <header className='navbar navbar-expand-md d-print-none' >
            <div >
                <div className='navbar-brand navbar-brand-autodark d-none-navbar-horizontal p-0 mw-md-150'  >
                    <div className={`nav-item dropdown${open ? ' active' : ''}`}>
                        <button
                            className={`navbar-toggler${open ? ' show collapse' : ''}`}
                            onClick={() => setOpen(!open)} type='button'
                            aria-expanded={open}
                        >
                            {
                                load ? (
                                    <div className="placeholder-glow mx-1">
                                        <div className="avatar avatar-rounded bg-white placeholder" style={{ maxWidth: "40px" }}></div>
                                    </div>
                                ) : (
                                    <span className="navbar-toggler-icon"></span>
                                )
                            }
                        </button>
                    </div>
                    <Link href='/' className='card-link'>
                        <LazyLoadImage effect='blur' className='d-md-block d-none grayscallover card-link-rotate h-4-5' src='/icons/logo.png' alt='Logo AM Banière' />
                        <LazyLoadImage effect='blur' className='d-md-none d-block grayscallover card-link-scale h-4-5' src='/icons/favicon.ico' alt='Logo AM' />
                    </Link>
                </div>
                <div className='navbar-nav flex-row order-last'>
                    <div className='nav-item'>
                        {load ? placeholderIcon : (
                            <button className='nav-link spinnergroup' onClick={async ({ currentTarget }) => {
                                if (currentTarget.classList.contains('show')) return;
                                currentTarget.classList.add('show');
                                try {
                                    const { id } = await FetchClient({
                                        url: '/api/~/-',
                                        method: 'POST',
                                        body: { type: 'Random' }
                                    });
                                    router.push(`/catalogue/${id}`)
                                } catch (error) {
                                    currentTarget.classList.remove('show');
                                }
                                setTimeout(() => currentTarget.classList.remove('show'), 10000);
                            }}>
                                <div className="spinner-border"></div>
                                <svg xmlns='http://www.w3.org/2000/svg' className='icon'
                                    viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                                    strokeLinecap='round' strokeLinejoin='round'>

                                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                    <path d='M18 4l3 3l-3 3'></path>
                                    <path d='M18 20l3 -3l-3 -3'></path>
                                    <path d='M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5'></path>
                                    <path d='M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3'>
                                    </path>
                                </svg>
                            </button>)}
                    </div>
                    <div className={isLinkActive('/catalogue/search')}>
                        {load ? placeholderIcon : (<Link className='nav-link' href='/catalogue/search'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='icon' width='24' height='24'
                                viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                                strokeLinecap='round' strokeLinejoin='round'>
                                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0'></path>
                                <path d='M21 21l-6 -6'></path>
                            </svg>
                        </Link>)}
                    </div>
                    <div className='nav-item right dropdown'>
                        {load ? placeholderIcon : (isLog.loading ?
                            <a className='nav-link' role='button'>
                                <div className="spinner-border"></div>
                            </a>
                            : !isLog.loading && isLog.data ? (<>
                                <a className='nav-link dropdown-toggle' data-bs-toggle='dropdown'
                                    data-bs-auto-close='outside' role='button' aria-expanded='false'>
                                    <span className="avatar avatar-m rounded"
                                        style={{ backgroundImage: `url(${isLog.data?.avatar.url})` }}></span>
                                </a>
                                <div className='dropdown-menu spee'>
                                    <div className='p-2'>
                                        <div className='d-flex align-items-center gap-2'>
                                            <span className="avatar avatar-m rounded"
                                                style={{ backgroundImage: `url(${isLog.data?.avatar.url})` }}></span>
                                            <span className="ms-2 ms-lg-1 nav-link-title">
                                                <h1 className="m-0 p-0">
                                                    {isLog.data?.pseudo ?? isLog.data?.username}
                                                </h1>
                                                {isLog.data?.pseudo && <p className="m-0 p-0 text-secondary text-xs">Username: <span
                                                    className="text-indigo">
                                                    {isLog.data?.username}
                                                </span>
                                                </p>}
                                            </span>
                                        </div>
                                        <hr className='mt-3 m-0 p-0' />
                                    </div>

                                    <Link className='dropdown-item' href={`/user`}>
                                        <div className='d-flex gap-2'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                            </div>
                                            <div className='d-flex flex-column'>
                                                <h3 className='m-0 p-0'>Mon compte</h3>
                                                <p className='m-0 p-0 text-secondary' >Gérer votre profil et vos paramètres</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className='dropdown-item' href={`/user/list`}>
                                        <div className='d-flex gap-2'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /></svg>                                            </div>
                                            <div className='d-flex flex-column'>
                                                <h3 className='m-0 p-0'>Mes listes</h3>
                                                <p className='m-0 p-0 text-secondary' >Voir vos listes</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='p-2'>
                                        <hr className='m-0 p-0' />
                                    </div>
                                    <Link className='dropdown-item' href={`/user/logout?goto=${router.asPath}`}>
                                        <div className='d-flex gap-2'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <h3 className='m-0 p-0'>Se deconecter</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </>) : (<>
                                <a className='nav-link dropdown-toggle' data-bs-toggle='dropdown'
                                    data-bs-auto-close='outside' role='button' aria-expanded='false'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                </a>
                                <div className='dropdown-menu spee'>
                                    <Link className='dropdown-item' href={`/auth/create?goto=${router.asPath}`}>
                                        <div className='d-flex flex-column'>
                                            <h3 className='m-0 p-0'>Crée votre compte</h3>
                                            <p className='m-0 p-0 text-secondary' >Inscrivez vous gratuitement</p>
                                        </div>
                                    </Link>

                                    <Link className='dropdown-item' href={`/auth?goto=${router.asPath}`}>
                                        <div className='d-flex flex-column'>
                                            <h3 className='m-0 p-0'>Se connecter</h3>
                                            <p className='m-0 p-0 text-secondary' >Déjà inscrit sur <strong>Animaya</strong> ? Bon retour.</p>
                                        </div>
                                    </Link>
                                </div></>)
                        )}
                    </div>
                </div>
                <div className={`navmenu w-full p-0 ps-md-3 ${open ? ' show' : ''}`} id='navbar-menu'>
                    <ul className='navbar-nav'>
                        <li className='nav-item dropdown '>
                            {load ? placeholderLink : (<>  <a className='nav-link dropdown-toggle' data-bs-toggle='dropdown'
                                data-bs-auto-close='outside' role='button' aria-expanded='false'>
                                <span
                                    className='nav-link-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-comet" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15.5 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" /><path d="M4 4l7 7" /><path d="M9 4l3.5 3.5" /><path d="M4 9l3.5 3.5" /></svg>
                                </span>

                                <span className='nav-link-title'>
                                    Browse
                                </span>
                            </a>
                                <div className='dropdown-menu' >
                                    <Link className='dropdown-item' href='/catalogue'>
                                        <span
                                            className='nav-link-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>                                </span>
                                        <span className='nav-link-title'>
                                            Catalogue
                                        </span>
                                    </Link>
                                    <Link className='dropdown-item' href='/catalogue/animes'>
                                        <span
                                            className='nav-link-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-tv" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M16 3l-4 4l-4 -4" /></svg>
                                        </span>
                                        <span className='nav-link-title'>
                                            Animes
                                        </span>
                                    </Link>
                                    <Link className='dropdown-item' href='/catalogue/scans'>
                                        <span
                                            className='nav-link-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-book" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6l0 13" /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg>
                                        </span>
                                        <span className='nav-link-title'>
                                            Scans
                                        </span>
                                    </Link>
                                    <Link className='dropdown-item' href='/catalogue/agenda'>
                                        <span
                                            className='nav-link-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg>
                                        </span>
                                        <span className='nav-link-title'>
                                            Agenda
                                        </span>
                                    </Link>
                                    <div className='dropend'>
                                        <a className='dropdown-toggle dropdown-item' href='#navbar-third' data-bs-toggle='dropdown'
                                            data-bs-auto-close='outside' role='button' aria-expanded='false'>
                                            <span
                                                className='nav-link-icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-tinder" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.918 8.174c2.56 4.982 .501 11.656 -5.38 12.626c-7.702 1.687 -12.84 -7.716 -7.054 -13.229c.309 -.305 1.161 -1.095 1.516 -1.349c0 .528 .27 3.475 1 3.167c3 0 4 -4.222 3.587 -7.389c2.7 1.411 4.987 3.376 6.331 6.174z" /></svg>
                                            </span>
                                            <span className='nav-link-title'>
                                                Genres
                                            </span>
                                        </a>
                                        <div className='dropdown-menu'>
                                            <div className='genredrop' >
                                                {Genres.map(({ genre, svg }) =>
                                                    <Link className='dropdown-item' href={`/catalogue/genre/${genre}`}>
                                                        {svg && <span
                                                            className='nav-link-icon d-md-none d-lg-inline-block'>
                                                            {svg}
                                                        </span>}
                                                        <span className='nav-link-title'>
                                                            {genre}
                                                        </span>
                                                    </Link>)}
                                            </div>
                                        </div>
                                    </div>

                                </div></>)}
                        </li>
                        <li className='nav-item dropdown '>
                            {load ? placeholderLink : (<>  <a className='nav-link dropdown-toggle' data-bs-toggle='dropdown'
                                data-bs-auto-close='outside' role='button' aria-expanded='false'>
                                <span
                                    className='nav-link-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l0 .01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" /></svg>
                                </span>
                                <span className='nav-link-title'>
                                    Aide
                                </span>
                            </a>
                                <div className='dropdown-menu'>
                                    <Link className='dropdown-item' href='/faq'>
                                        <span
                                            className='nav-link-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-question" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" /><path d="M19 22v.01" /><path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>
                                        </span>
                                        <span className='nav-link-title'>
                                            F.A.Q
                                        </span>
                                    </Link>

                                    <div className='dropend'>
                                        <a className='dropdown-toggle dropdown-item' href='#navbar-third' data-bs-toggle='dropdown'
                                            data-bs-auto-close='outside' role='button' aria-expanded='false'>
                                            <span
                                                className='nav-link-icon'>
                                                <svg xmlns='http://www.w3.org/2000/svg' className='icon' width='24' height='24'
                                                    viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                                                    strokeLinecap='round' strokeLinejoin='round'>
                                                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                                    <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0'></path>
                                                    <path d='M3.6 9h16.8'></path>
                                                    <path d='M3.6 15h16.8'></path>
                                                    <path d='M11.5 3a17 17 0 0 0 0 18'></path>
                                                    <path d='M12.5 3a17 17 0 0 1 0 18'></path>
                                                </svg>
                                            </span>
                                            <span className='nav-link-title'>
                                                Réseau
                                            </span>
                                        </a>
                                        <div className='dropdown-menu'>
                                            <Link className='dropdown-item' href='./#'>
                                                <span
                                                    className='nav-link-icon'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' className='icon' width='24' height='24'
                                                        viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                                                        strokeLinecap='round' strokeLinejoin='round'>
                                                        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                                        <path d='M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0'></path>
                                                        <path d='M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0'></path>
                                                        <path
                                                            d='M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3'>
                                                        </path>
                                                        <path d='M7 16.5c3.5 1 6.5 1 10 0'></path>
                                                    </svg>
                                                </span>
                                                <span className='nav-link-title'>
                                                    Discord
                                                </span>
                                            </Link>
                                            <Link className='dropdown-item' href='./#'>
                                                <span
                                                    className='nav-link-icon'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' className='icon' width='24' height='24'
                                                        viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none'
                                                        strokeLinecap='round' strokeLinejoin='round'>
                                                        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                                        <path d='M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4'></path>
                                                    </svg>
                                                </span>
                                                <span className='nav-link-title'>
                                                    Telegram
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                </div></>)}
                        </li>
                    </ul>
                </div>
            </div >
        </header >
    </div >)
}
import Link from "next/link";
import { useRouter } from "next/router";
import {
    useState,
    useEffect
} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import All from '../Catalogue/All/Scroll';
import { FetchClient } from '../../lib/Fetch';
export default function ({
    data,
    nb = 0
}) {
    const
        router = useRouter(),
        {
            id,
            saison,
            lang
        } = router.query;
    try {
        const
            [chap, setChap] = useState(nb),
            [lecteur, setLecteur] = useState(0);
        if (!data.all[chap].lecteur[lecteur]) return router.push('/404');
        const
            getNew = ({ l = lecteur, e = ep }) => {
                setLecteur(l);
                setChap(e)
            },
            [open, setOpen] = useState(null),
            [scrollPerformed, setScrollPerformed] = useState(false),
            [fullscreen, setFullScreen] = useState(false),
            [btnTop, setbtnTop] = useState(false),
            existchap = (chaps) => {
                chaps = (chaps === 'prec' ? chap - 1 : chap + 1);
                const { all } = data;
                let yes = all[chaps];
                return yes && ({
                    name: isNaN(yes.reel) ? yes.reel : `Chap ${yes.reel}`,
                    chap: yes.number
                })
            };
        useEffect(() => {
            if (!open) return setScrollPerformed(false);
            if (open && !scrollPerformed) {
                const element = document.getElementById(`chap-${chap}`);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                    setScrollPerformed(true)
                }
            }
        }, [open, chap, scrollPerformed]);
        useEffect(() => {
            const handleScroll = () => setbtnTop(document.body.scrollTop || document.documentElement.scrollTop > 0);
            document.body.addEventListener('scroll', handleScroll);
            return () => document.body.removeEventListener('scroll', handleScroll);
        }, []);
        useEffect(() => {
            const scans = document.body.querySelector('.scans');
            scans.innerHTML = '';
            (function next(tableauCorrect) {
                if (tableauCorrect.length) {
                    const
                        img = document.createElement('img'),
                        imgLoading = document.createElement('img');
                    imgLoading.src = "/assets/loader.gif";
                    img.classList.add('d-none');
                    scans.appendChild(imgLoading);
                    scans.appendChild(img);
                    img.onload = function () {
                        if (imgLoading && scans.contains(imgLoading)) {
                            scans.removeChild(imgLoading)
                        }
                        img.classList.remove('d-none');
                        next(tableauCorrect)
                    };
                    img.src = tableauCorrect.shift()
                }
            })((data.all[chap].lecteur[lecteur]).slice());
        }, [chap]);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    await FetchClient({
                        url: '/api/user/list',
                        method: 'POST',
                        body: {
                            type: 'set',
                            key: 'list.historique',
                            data: {
                                name: data.titre,
                                id,
                                saison,
                                rsaison: data.saisonTrouvee.name,
                                lang,
                                grayscall: true,
                                nb: chap,
                                lecteur,
                                rnb: data.all[chap].reel
                            }
                        }
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData()
        }, [saison, lecteur, chap]);
        return (<>
            <div className="watch">
                <div className={`control h-6  w-full${fullscreen ? ' d-none' : ''}`}>
                    <div className="position-relative  h-6">
                        <div className=" h-6 z-1 position-relative w-full d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2 pe-3 text-truncate">
                                <Link href={`/catalogue/${data.id}`} className="text-shadow animescale animescale2 btn btn-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                </Link>
                                <h1 className="m-0 p-0 text-shadow">{data.name}</h1>
                                <div className="px-2 d-flex align-items-center h-full">
                                    <span className="text-secondary">{data?.saisonTrouvee?.name?.toUpperCase()} CHAP {data.all[chap].reel}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2" id="icon">
                                {(() => {
                                    const
                                        r = [],
                                        rdata = {
                                            exist: {
                                                prec: existchap('prec'),
                                                suiv: existchap('suiv')
                                            },
                                            attr: {
                                                role: 'button',
                                                className: "text-shadow icoBtn btn btn-transparent p-2"
                                            },
                                            svg: {
                                                prec: (<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.496 4.136l-12 7a1 1 0 0 0 0 1.728l12 7a1 1 0 0 0 1.504 -.864v-14a1 1 0 0 0 -1.504 -.864z" strokeWidth="0" fill="currentColor" /><path d="M4 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor" /></svg>),
                                                suiv: (<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 5v14a1 1 0 0 0 1.504 .864l12 -7a1 1 0 0 0 0 -1.728l-12 -7a1 1 0 0 0 -1.504 .864z" strokeWidth="0" fill="currentColor" /><path d="M20 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor" /></svg>)
                                            }
                                        },
                                        chapBtn = (d) => {
                                            const rd = d;
                                            d = rdata.exist[d];
                                            if (!d) return;
                                            const c = <>
                                                {rdata.svg[rd]}
                                                <small className="text-shadow">{d.name}</small>
                                            </>;
                                            r.push(<a role="button" onClick={() => getNew({ e: d.chap })} {...rdata.attr}>
                                                {c}
                                            </a>)
                                        };

                                    if (data.probleme) {
                                        r.push(<button
                                            onClick={() => alert(data.probleme)}
                                            {...({ ...rdata.attr, className: rdata.attr.class + ' text-danger' })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" STROKEWIDTH="2" stroke="currentColor" fill="none" strokelinecap="round" strokelinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" /><path d="M12 16h.01" /></svg>
                                            <small className="text-shadow">
                                                Problème
                                            </small>
                                        </button>)
                                    }
                                    r.push(<div className="dropdown cursor-pointer" data-bs-toggle="dropdown">
                                        <button
                                            {...rdata.attr}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" strokewidth="2" stroke="currentColor" fill="none" strokelinecap="round" strokelinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                                            <small className="text-shadow">
                                                Lecteur
                                            </small>
                                        </button>
                                        <div
                                            className={`dropdown-menu rounded`}
                                            data-bs-toggle="dropdown">
                                            {(() => {
                                                const r = [];
                                                for (let i = 0; i < data.all[chap].lecteur.length; i++) {
                                                    r.push(<a key={i} role="button" onClick={() => getNew({ l: i })} className={`dropdown-item${(i === lecteur) ? ' active' : ''}`}>
                                                        Lecteur {i + 1}
                                                    </a>)
                                                }
                                                return r
                                            })()}
                                        </div>
                                    </div>)
                                    chapBtn('prec');
                                    r.push(<div className="dropdown right cursor-pointer">
                                        <button role='button' className={`text-shadow icoBtn btn btn-transparent p-2${open ? ' active' : ''}`} onClick={() => setOpen(!open)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                            <small className="text-shadow">
                                                Chapitres
                                            </small>
                                        </button>
                                    </div>)
                                    chapBtn('suiv');
                                    r.push(<div className="cursor-pointer">
                                        <button role='button' className={`text-shadow icoBtn btn btn-transparent p-2`}
                                            onClick={() => setFullScreen(!fullscreen)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-maximize" width="24" height="24" viewBox="0 0 24 24" strokewidth="2" stroke="currentColor" fill="none" strokelinecap="round" strokelinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>                                            <small className="text-shadow">
                                                Plein écran
                                            </small>
                                        </button>
                                    </div>)
                                    return r
                                })()}
                            </div>
                        </div>

                    </div>
                </div>
                {fullscreen && <div className="btn-fullscreen">
                    <button className="btn text-primary animescale" onClick={() => setFullScreen(!fullscreen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokewidth="2" stroke="currentColor" fill="none" strokelinecap="round" strokelinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8v-2c0 -.551 .223 -1.05 .584 -1.412" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2c.545 0 1.04 -.218 1.4 -.572" /><path d="M3 3l18 18" /></svg>
                    </button>
                </div>}
                <div className="scans d-flex flex-column align-items-center"></div>
                {btnTop && <div className="btn-top">
                    <button
                        role="button"
                        className="btn animescale"
                        onClick={() => document.body.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0}
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Aller en haut"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 15l6 -6l6 6" /></svg>
                    </button>
                </div>}
            </div >
            {open && <div className="dropspe scroll-y">
                <hr className="m-0 p-0" />
                <div className='row' >
                    <div className='container-fluid'>
                        <div className="header p-4">
                            <h3 className="title">Chapitres</h3>
                            <button className="btn-close" onClick={() => setOpen(!open)}></button>
                        </div>
                        {<ChapitreItem titre={data.saisonTrouvee.name} all={data.all} />}
                    </div>
                </div >
            </div>
            }
        </>)
        function ChapitreItem({ titre, all }) {
            return (<>
                {/* sticky-top */}
                <div className="p-2" style={{ zIndex: '200', background: 'rgb(0, 0, 0, var(--opa))' }}>
                    <div className={`hr-text text-primary`}>{titre}</div>
                </div>
                <div className="row p-4" >
                    <All data={all} loading={false}
                        Item={({ d }) => (<a
                            tabIndex={0} d={`chap-${d.number}`} role="button"
                            onClick={() => getNew({ e: d.number })}
                            className={`col-agenda bg-transparent animescale text-decoration-none${d.number === chap ? ' border border-primary rounded' : ''}`}
                        >
                            <div className="mt-2">
                                <div className={`d-flex flex-column p-2 gap-3`}>
                                    <div className="d-flex gap-3">
                                        <div className="d-flex align-items-center" style={{ maxWidth: '8rem', minWidth: '8rem' }}>
                                            <LazyLoadImage
                                                alt={id} src={data.image}
                                                effect="blur"
                                                className={`backImg rounded${!data.isAnime ? ' grayscall' : ''}`}
                                                style={{ backgroundImage: `url(/assets/loader.gif)` }}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h3 className="m-0 p-0">CHAP {d.reel}</h3>
                                            <p className="text-secondary">{data.saisonTrouvee.type.toUpperCase()} | {lang.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>)} />
                </div>
            </>)
        }
    } catch (error) {
        console.log(error);
        return router.push('/404')
    }
}



import Link from "next/link";
import { useRouter } from "next/router";
import {
    useState,
    useEffect
} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FetchClient } from '../../lib/Fetch'
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
            [ep, setEp] = useState(nb),
            [lecteur, setLecteur] = useState(0);
        if (!data.all[ep].lecteur[lecteur]) return router.push('/404');
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
                                grayscall: false,
                                nb: ep,
                                lecteur,
                                rnb: data.all[ep].reel
                            }
                        }
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData()
        }, [saison, lecteur, ep]);
        useEffect(() => (((document.querySelector('.watch iframe').contentWindow.document).querySelector("body")).style = `
        background-size: cover !important;
           background-position: center !important;
           background-color: rgb(4, 10, 17, .9);
           background-repeat: no-repeat !important;
           background-image: url("/assets/loader.gif");
           width:100%;
           height:100%`) && (() => { }), []);
        const
            getNewUrl = ({ lg = lang }) => `/catalogue/${id}/${saison}/${lg}`,
            getNew = ({ l = lecteur, e = ep }) => {
                setLecteur(l);
                setEp(e)
            },
            [open, setOpen] = useState(null),
            [scrollPerformed, setScrollPerformed] = useState(false),
            existEp = (eps) => {
                const reps = eps;
                if (reps === 'suiv') eps = ep + 1;
                else if (reps === 'prec') eps = ep - 1;
                const {
                    all,
                    id,
                    suivant,
                    precedent
                } = data;
                let yes = all[eps];
                if (!yes) {
                    let r;
                    if (reps === 'suiv' && suivant) r = suivant;
                    else if (reps === 'prec' && precedent) r = precedent;
                    if (r) yes = {
                        name: r.name,
                        url: `/catalogue/${id}/${r.saison}/${r.lang}`
                    }
                } else yes = {
                    name: isNaN(yes.reel) ? yes.reel : `Ep ${yes.reel}`,
                    ep: yes.number
                }
                return yes
            };
        useEffect(() => {
            if (!open) return setScrollPerformed(false);
            if (open && !scrollPerformed) {
                const element = document.getElementById(`ep-${ep}`);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                    setScrollPerformed(true)
                }
            }
        }, [open, ep, scrollPerformed]);
        return (<>
            <div className="watch">
                <div className="control h-6  w-full">
                    <div className="position-relative  h-6">
                        <div className=" h-6 z-1 position-relative w-full d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2 pe-3 text-truncate">
                                <Link href={`/catalogue/${data.id}`} className="text-shadow animescale animescale2 btn btn-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                </Link>
                                <h1 className="m-0 p-0 text-shadow">{data.name}</h1>
                                <div className="px-2 d-flex align-items-center h-full">
                                    <span className="text-secondary">S{(data.saisonTrouvee.i) + 1} EP {data.all[ep].reel}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2" id="icon">
                                {(() => {
                                    const
                                        r = [],
                                        rdata = {
                                            exist: {
                                                prec: existEp('prec'),
                                                suiv: existEp('suiv')
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
                                        epBtn = (d) => {
                                            const rd = d;
                                            d = rdata.exist[d];
                                            if (!d) return;
                                            const c = <>
                                                {rdata.svg[rd]}
                                                <small className="text-shadow">{d.name}</small>
                                            </>;
                                            r.push(d.url ? <a href={d.url} {...rdata.attr}>
                                                {c}
                                            </a> : <a role="button" onClick={() => getNew({ e: d.ep })} {...rdata.attr}>
                                                {c}
                                            </a>)
                                        };

                                    if (data.probleme) {
                                        r.push(<button
                                            onClick={() => alert(data.probleme)}
                                            {...({ ...rdata.attr, className: rdata.attr.class + ' text-danger' })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" /><path d="M12 16h.01" /></svg>
                                            <small className="text-shadow">
                                                Problème
                                            </small>
                                        </button>)
                                    }
                                    r.push(<div className="dropdown cursor-pointer" data-bs-toggle="dropdown">
                                        <button
                                            {...rdata.attr}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                                            <small className="text-shadow">
                                                Paramètre
                                            </small>
                                        </button>
                                        <div className={`dropdown-menu rounded`}>
                                            <span className="dropdown-header">Language</span>
                                            <Link href={getNewUrl({ lg: 'vostfr' })} className={`dropdown-item${lang === 'vostfr' ? ' active' : ''}`}>
                                                VOSTFR
                                            </Link>
                                            {data.vf && <Link href={getNewUrl({ lg: 'vf' })} className={`dropdown-item${lang === 'vf' ? ' active' : ''}`}>
                                                VF
                                            </Link>}
                                            <span className="dropdown-header">Lecteur</span>
                                            {(() => {
                                                const r = [];
                                                for (let i = 0; i < data.all[ep].lecteur.length; i++) {
                                                    r.push(<a key={i} role="button" onClick={() => getNew({ l: i })} className={`dropdown-item${(i === lecteur) ? ' active' : ''}`}>
                                                        Lecteur {i + 1}
                                                    </a>)
                                                }
                                                return r
                                            })()}
                                        </div>
                                    </div>)
                                    epBtn('prec');
                                    r.push(<div className="dropdown right cursor-pointer">
                                        <button role='button' className={`text-shadow icoBtn btn btn-transparent p-2${open ? ' active' : ''}`} onClick={() => setOpen(!open)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                            <small className="text-shadow">
                                                Episodes
                                            </small>
                                        </button>
                                    </div>)
                                    epBtn('suiv');
                                    return r
                                })()}
                            </div>
                        </div>

                    </div>
                </div>
                <iframe
                    scrolling="no"
                    className="overflow-hidden"
                    sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                    src={data.all[ep].lecteur[lecteur]}>
                </iframe>
            </div >
            {open && <div className="dropspe scroll-y">
                <hr className="m-0 p-0" />
                <div className='row' >
                    <div className='container-fluid'>
                        <div className="header p-4">
                            <h3 className="title">Episodes</h3>
                            <button className="btn-close" onClick={() => setOpen(!open)}></button>
                        </div>
                        {<EpisodeItem titre={data.saisonTrouvee.name} all={data.all} />}
                        {(data.suivant) && <div className="p-4">
                            <a target="_blank" href={`/catalogue/${data.id}`} className="mt-5 btn btn">AFFICHER PLUS</a>
                        </div>}

                    </div>
                </div >
            </div>
            }
        </>)
        function EpisodeItem({ titre, plus, all }) {
            return (<>
                {/* sticky-spe */}
                <div className="p-1" style={{ zIndex: '200', background: 'rgb(0, 0, 0, var(--opa))' }}>
                    <div className={`hr-text text-primary`}>{titre}</div>
                </div>
                <div className="row p-4" >
                    {(all && all.map(({
                        reel,
                        number,
                        lecteur
                    }) => (<a tabIndex={0} id={`ep-${number}`} role="button" onClick={() => getNew({ e: number })}
                        className={`col-agenda icoBtn animescale text-decoration-none${number === ep ? ' border border-primary rounded' : ''}`}>
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
                                        <h3 className="m-0 p-0">EP {reel}</h3>
                                        <p className="text-secondary">{data.saisonTrouvee.type.toUpperCase()} | {lang.toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>)))}
                </div>
            </>)
        }
    } catch (error) {
        console.log(error);
        return router.push('/404')
    }
}


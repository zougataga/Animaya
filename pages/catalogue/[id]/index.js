import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Slider from '../../../src/components/Slider';
import SliderItem from '../../../src/components/Slider/Item';
import {
    WatchList,
    Favori
} from '../../../src/components/Catalogue/Btn';
import Error from '../../../src/components/Error';
import Loader from '../../../src/components/Loader';
import Footer from '../../../src/components/Footer';
import { Genres } from '../../../src/lib/Import';
import { Fetch } from '../../../src/lib/Fetch';
function Info({ isLog }) {
    const
        router = useRouter(),
        [iframe, setIframe] = useState(false),
        [saisonType, setType] = useState({ name: '...' }),
        [on, setOn] = useState(false),
        [onH, setOnH] = useState(true),
        id = router.query.id,
        { data, loading } = Fetch({ url: '/api/~/-', method: 'POST', body: { type: 'Info', id } });
    if (!loading && (!data || data?.error)) return <Error />;
    if (!loading && saisonType.name === '...') setType(data?.saison[0]);
    return (
        <>
            <div className='coverInfo cover backImg' style={{ backgroundImage: `url('${loading ? '/assets/loader.gif' : data?.image}')` }} >
                <div className='overlay'></div>
                {(!loading && data?.bandeannonce?.cover) && setTimeout(() => setIframe(true), 1000)}
                <iframe
                    style={{
                        opacity: iframe ? '1' : '0',
                        visibility: iframe ? 'visible' : 'hidden'
                    }}
                    src={data?.bandeannonce?.cover}
                    allow='autoplay'
                ></iframe>
            </div>
            <section className='section-abso' style={{ top: '35%' }}>
                <div className='container-xxl w-full'>
                    <div className='row px-3'>
                        <div className='col-lg-8 mb-5'>
                            {loading ? <>
                                <div className='placeholder-glow'>
                                    <div className='placeholder bg-primary' style={{ height: '50px', width: '250px' }}></div>
                                </div>
                                <div className='placeholder-glow'>
                                    <div className='placeholder bg-secondary' style={{ width: '150px' }}></div>
                                </div>
                                <div className='mt-2 gap-1 d-flex'>
                                    <div className='placeholder-glow'>
                                        <div className='placeholder bg-secondary' style={{ width: '50px' }}></div>
                                    </div>
                                    <div className='placeholder-glow'>
                                        <div className='placeholder bg-secondary' style={{ width: '50px' }}></div>
                                    </div>
                                    <div className='placeholder-glow'>
                                        <div className='placeholder bg-secondary' style={{ width: '50px' }}></div>
                                    </div>
                                    <div className='placeholder-glow'>
                                        <div className='placeholder bg-secondary' style={{ width: '50px' }}></div>
                                    </div>
                                    <div className='placeholder-glow'>
                                        <div className='placeholder bg-secondary' style={{ width: '50px' }}></div>
                                    </div>
                                    <div className='placeholder-glow'>
                                        <div className='placeholder bg-secondary' style={{ width: '50px' }}></div>
                                    </div>
                                </div>
                            </> : <>
                                {data.titleImg ?
                                    <LazyLoadImage className='h-8' effect='blur' src={`/assets/titleImg/${id}.webp`} /> :
                                    <h1 className='m-0 p-0'>{data.name}</h1>
                                }
                                <p className='mt-2 text-secondary'>{data.name2}</p>
                                <div className="btn-list">
                                    <WatchList data={data} loading={loading} large={true} />
                                    <Favori data={data} loading={loading} large={true} />
                                    {data?.bandeannonce?.reel && <button
                                        tabIndex={0}
                                        className={`btn btn-danger btnf lgg${on ? ' active' : ''}`}
                                        onClick={() => setOn(!on)}
                                        data-bs-toggle={"tooltip"}
                                        data-bs-placement={"top"}
                                        data-bs-original-title={'Voir la bande annonce'}
                                        style={{ minWidth: '193px', minHeight: '45px' }}
                                    >
                                        {loading ? <div className="spinner-border"></div> :
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" /><path d="M10 9l5 3l-5 3z" /></svg>
                                                <span className="text-uppercase">Voir la bande annonce</span>
                                            </span>}
                                    </button>}
                                </div>
                                {on && <div className="modal d-flex align-items-center show" id="exampleModal" tabIndex={-1} style={{ display: 'block' }} aria-modal="true" role="dialog">
                                    <div className="modal-dialog modal-full modal-film" role="document">
                                        <div className="modal-content">
                                            {onH && <div className="modal-header">
                                                <h5 className="modal-title">Bande annonce</h5>
                                                <button type="button" className="btn-close" tabIndex={0} onClick={() => setOn(!on)}></button>
                                                <button type="button" className="btn btn-icon" onClick={() => setOnH(!onH)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M18 11l-6 -6" /><path d="M6 11l6 -6" /></svg>
                                                </button>
                                            </div>}
                                            {!onH && <button type="button" className="btn btn-icon" onClick={() => setOnH(!onH)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M18 13l-6 6" /><path d="M6 13l6 6" /></svg>
                                            </button>}
                                            <div className='modal-body  backImg' style={{ backgroundImage: 'url("/assets/loader.gif")' }}>
                                                <iframe
                                                    className="h-full w-full"
                                                    src={data?.bandeannonce?.reel}
                                                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen=""></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <div className="btn-list mt-4">
                                    {(data.genres.split(', ') ?? []).map(g => {
                                        const find = Genres.find(({ genre }) => genre.toLowerCase() === g.toLowerCase());
                                        return (<Link href={`/catalogue/genre/${g.trim().toLowerCase()}`}
                                            className='btn gr'>
                                            {find && find?.svg}
                                            {g}
                                        </Link>)
                                    })}
                                </div>
                            </>}
                        </div>
                        <div className='col-lg-3'>
                            <div className='text-secondary py-2 fs-4 text-uppercase fw-bold'>Avancement :</div>
                            <p>{loading ? <div className='placeholder-glow'>
                                <div className='placeholder bg-secondary' style={{ width: '150px' }}></div>
                            </div> : data.avancement}</p>
                            <div className='text-secondary py-2 fs-4 text-uppercase fw-bold'>Correspondance :</div>
                            <p>{loading ? <div className='placeholder-glow'>
                                <div className='placeholder bg-secondary' style={{ width: '150px' }}></div>
                            </div> : data.correspondance}</p>
                        </div>
                        <div>
                            <div className='text-secondary py-2 fs-4 text-uppercase fw-bold'>Synopsis :</div>
                            <p>{loading ? <div className='placeholder-glow'>
                                <div className='placeholder bg-white' style={{ height: '70px', width: '100%' }}></div>
                            </div> : data.synopsis}</p>
                        </div>
                        <div>
                            <hr />
                            {loading ? <Loader spe={true} /> : <>
                                <h3>
                                    <div className='dropdown cursor-pointer'>
                                        <a className='text-decoration-none dropdown-toggle' data-bs-toggle='dropdown'>{saisonType?.name}</a>
                                        <div className='dropdown-menu'>
                                            {data?.saison?.map(d => <button onClick={() => setType(d)} className='dropdown-item'>
                                                {d.name}
                                            </button>)}
                                        </div>
                                    </div>
                                </h3>
                                <span className='text-secondary'>{saisonType?.description}</span>

                                <div className='slider-main slider-main2'>
                                    {loading ? <div className='py-8'><Loader spe={true} /></div> :
                                        <>
                                            {(saisonType?.all?.length === 0 ? <Empty /> : (saisonType?.all && <>
                                                <div className='position-relative row py-3 g-3 slider'>
                                                    {saisonType?.all?.map((d, i) => <div className='col-sm-6 col-lg-4'>
                                                        <SliderItem
                                                            wrap={true}
                                                            data={{ grayscall: d.type === 'scan', image: data.image, saison: d.name }} key={i} href={`/catalogue/${id}/${d.saison.toLowerCase()}/${d.lang.toLowerCase()}`} loading={false} />
                                                    </div>)}
                                                </div>
                                            </>))}
                                            {!loading && data && data.similaire && <Slider titre='Titres similaires' data={data.similaire} loading={loading} />}
                                        </>}
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
                <div className='mt-7'>
                    <Footer />
                </div>
            </section>
        </>
    )
}

Info.getInitialProps = ({ query }) => {
    let title = query.id;
    title = title.replaceAll('-', ' ');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return {
        title,
        navtransparent: true
    }
};

export default Info
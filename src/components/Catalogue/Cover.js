import Link from "next/link";
import { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { WatchList } from "./Btn";
export default function ({
    cover,
    loading
}) {
    const
        [iframe, setIframe] = useState(false),
        [maxStrLength, setMaxStrLength] = useState(100);
    useEffect(() => {
        const updateMaxStrLength = () => setMaxStrLength(window.innerWidth < 768 ? 250 : 400);
        updateMaxStrLength();
        window.addEventListener('resize', updateMaxStrLength);
        return () => window.removeEventListener('resize', updateMaxStrLength)
    }, []);
    return (<>
        <div
            className="cover"
            style={{ backgroundImage: `url('${loading ? "/assets/loader.gif" : cover?.image}')` }}
        >
            <div className="overlay"></div>
            {(!loading && cover?.bandeannonce?.cover) && setTimeout(() => setIframe(true), 1000)}
            <iframe
                style={{
                    opacity: iframe ? '1' : '0',
                    visibility: iframe ? 'visible' : 'hidden'
                }}
                src={cover?.bandeannonce?.cover}
                allow="autoplay"
            ></iframe>
            <div className="info d-flex align-items-center justify-content-center justify-content-md-start">
                <div className="ms-md-7 m-md-0 m-1 pt-5 pb-5">
                    {loading ? (<>
                        <div className="mt-8 placeholder-glow">
                            <div className="placeholder bg-white h-md-special h-special"
                                style={{ '--h-special': '85px', '--h-md-special': '125px', width: '300px' }}></div>
                        </div>
                        <div className="placeholder-glow">
                            <div className="placeholder bg-white" style={{ width: '120px' }}></div>
                        </div>
                        <div className="placeholder-glow mt-4">
                            <div className="placeholder bg-dark" style={{ height: "65px", width: '250px' }}></div>
                        </div>
                    </>) : (cover ? (<>
                        {cover.titleImg ? (<LazyLoadImage
                            effect="blur"
                            alt={cover.id}
                            style={{ maxHeight: '300px' }}
                            className="w-full"
                            src={`/assets/titleImg/${cover.id}.webp`} />) : (<h1>{cover.name}</h1>)}
                        {/* <h3 className="text-secondary">{cover.avancement !== 'Aucune donnée.' && cover.avancement}</h3> */}


                        <p className='mt-5 text-shadow' >
                            {(
                                ((cover?.synopsis)?.length > maxStrLength) ?
                                    (<>
                                        {(cover?.synopsis).substring(0, maxStrLength)}
                                        <Link href={`/catalogue/${cover.id}`} className="text-secondary ms-1">...</Link>
                                    </>)
                                    : (cover?.synopsis)
                            )}
                        </p>
                    </>) : <Error />)}


                    <div className="d-flex gap-2 mt-5">
                        {loading ? <a href='#' className='btn btn-primary btn-xl'>
                            <div className="spinner-border icon"></div>
                            <span>Plus d'informations</span>
                        </a> : <Link tabIndex={0} href={`/catalogue/${cover.id}`} className='btn btn-primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                            <span>Plus d'informations</span>
                        </Link>}

                        <WatchList data={cover} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}
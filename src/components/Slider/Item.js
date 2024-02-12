import Link from "next/link";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function ({
    data,
    href,
    wrap,
    loading,
    key
}) {
    const
        classbase = `text-shadow text-${wrap ? 'wrap' : 'truncate'} text-center`,
        classh2 = `${classbase} m-0 p-2`;
    return (!loading && data && <Link
        tabIndex={0}
        href={href ?? `/catalogue/${data.id}${data.rsaison ? `/${data.saison}/${data.lang}` : ''}`}
        className='backImg overflow-hidden'
        key={key}
        style={{ backgroundImage: `url(/assets/loader.gif)` }}
    >
        <div className="overlay"></div>
        <div className="titre d-flex align-items-center flex-column justify-content-center">
            {data.saison && !data.rsaison ? (<>
                <h2 className={classh2} style={{ maxWidth: '70%' }}>{data.saison}</h2>
            </>) : (<>
                <h2 className={classh2} style={{ maxWidth: '70%' }}>{data.name ?? data.id.replaceAll('-', ' ').toUpperCase()}</h2>
                <p className={`${data.rsaison ? 'text-wrap ' : ''}${classbase} ${data.genre && `p-1 badge bg-primary text-white`}`}
                    style={{ maxWidth: '70%' }}>
                    {data.rnb ? `${data.rsaison} ${data.grayscall ? 'Chap' : 'Ep'} ${data.rnb} | ${data.lang.toUpperCase()}` : (data.genre ?? data.name2)}</p>
            </>)}
        </div>
        <LazyLoadImage alt={data.id} effect="blur" className={data.grayscall ? 'grayscall' : ''} src={data.image ?? `https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/${data.id}.jpg`} />
    </Link>)
} 
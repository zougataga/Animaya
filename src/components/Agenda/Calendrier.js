import Link from "next/link";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from "../Loader";
export default function ({ rj, data, loading }) {
    return <div className="w-full">
        {loading ? <div className="d-flex justify-content-center align-items-center" style={{ height: '15rem' }}>
            <Loader spe={true} />
        </div> : (() => {
            const da = {};
            for (const [jour, sorti] of Object.entries(data)) {
                if (!da[jour]) da[jour] = {};
                for (const d of sorti) {
                    if (!da[jour][d.heure]) da[jour][d.heure] = [];
                    da[jour][d.heure].push(d)
                }
            }
            let d = [];
            for (const [jour] of Object.entries(data)) {
                let jd = [];
                for (const [h, rs] of Object.entries(da[jour])) {
                    let jd2 = [];
                    for (const {
                        name,
                        name2,
                        id,
                        saison,
                        heure,
                        langue,
                        type,
                        probleme,
                        image
                    } of rs) {
                        jd2.push(<Link href={`/catalogue/${id}/${saison}/${langue}`}>
                            <span>{name} {langue.toUpperCase()}</span>
                            <time>{type.toUpperCase()} - {type === saison ? <></> : saison.toUpperCase()}</time>
                            <LazyLoadImage
                                alt={id}
                                effect="blur" src={image}
                                className={`backImg rounded${type === 'scan' ? ' grayscall' : ''}`}
                                style={{
                                    marginTop: '.5rem',
                                    backgroundImage: `url(/assets/loader.gif)`
                                }}
                            />
                        </Link>)
                    }
                    jd.push(<div className="heure">
                        <time>{h}</time>
                        <div>{jd2}</div>
                    </div>)
                }
                d.push(<div id={jour}>
                    <div className={jour == rj ? 'on' : ''}>
                        <h2>{jour.toUpperCase().slice(0, 3)}</h2>
                        <div>{jd}</div>
                    </div>
                </div>)
            }
            return <div className="calendrier">{d}</div>
        })()}
    </div>
} 
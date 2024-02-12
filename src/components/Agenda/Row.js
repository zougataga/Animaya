import Link from "next/link";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function ({
    active,
    titre,
    jour,
    data,
    loading,
}) {
    return (<div key={jour} id={jour}>
        <div className={`hr-text${active ? ' text-primary' : ''}`}>{titre}</div>
        <div className="row" >
            {loading ? (() => {
                let el = [];
                for (let i = 0; i < 10; i++) {
                    el.push(<a tabIndex={0} className="col-md-4 animerotate text-decoration-none">
                        <div className="mt-2">
                            <div className={`d-flex flex-column p-2 gap-3`}>
                                <div className="d-flex gap-3">
                                    <div className="d-flex align-items-center" style={{ maxWidth: '8rem', minWidth: '8rem' }}>
                                        <img
                                            effect="blur" src={'/assets/loader.gif'}
                                            className={`rounded`}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="placeholder-glow">
                                            <div className="placeholder bg-white" style={{ width: '150px' }}></div>
                                        </div>
                                        <div className="placeholder-glow">
                                            <div className="placeholder bg-white" style={{ width: '80px' }}></div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <div>
                                            <div className="placeholder-glow">
                                                <div className="placeholder bg-white" style={{ width: '40px' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>);
                }
                return el;
            })() : (data && data.map(data => {
                const {
                    name,
                    name2,
                    id,
                    saison,
                    heure,
                    langue,
                    type,
                    probleme,
                    image
                } = data;
                return <Link tabIndex={0} href={`/catalogue/${id}/${saison}/${langue}`} className="col-agenda animerotate text-decoration-none">
                    <div className="mt-2">
                        <div className={`d-flex flex-column p-2 gap-3${(probleme && probleme !== '') && ' border border-danger rounded'}`}>
                            <div className="d-flex gap-3">
                                <div className="d-flex align-items-center" style={{ maxWidth: '8rem', minWidth: '8rem' }}>
                                    <LazyLoadImage
                                        alt={id}
                                        effect="blur" src={image}
                                        className={`backImg rounded${type === 'scan' ? ' grayscall' : ''}`}
                                        style={{ backgroundImage: `url(/assets/loader.gif)` }}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <h3 className="m-0 p-0">{name}</h3>
                                    <p className="text-secondary">{type.toUpperCase()} | {langue.toUpperCase()}</p>
                                </div>
                                <div className="d-flex flex-column gap-2 align-items-end">
                                    {
                                        (probleme && probleme !== '') &&
                                        <div><div className="badge bg-transparent border-danger text-white p-2">{probleme}</div></div>
                                    }
                                    <div>
                                        <div className="badge bg-transparent border-primary text-white p-2">{heure}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            }))}
        </div>
    </div>)
} 
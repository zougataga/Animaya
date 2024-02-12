import { useRouter } from 'next/router';
import Link from 'next/link.js';
import Genres from "./Genres.js";
import Pagination from './All/Pagination.js'
import Error from '../Error.js';
import Footer from '../Footer.js';
import { Fetch } from "../../lib/Fetch.js";
export default function ({
    type,
    titre,
    body,
    d,
    url,
    query,
    t
}) {
    const
        router = useRouter(),
        allt = router.query.all,
        rb = body;
    body = { type, allt };
    if (rb) body = { ...body, ...rb };
    else body = { ...body, [t]: true };
    const all = Fetch({ url: '/api/~/-', method: 'POST', body });
    return !all.loading && (!all.data || all.data?.error) ? <Error /> :
        allt ? <>
            <div className="page-header px-3 pt-5 pb-2">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="page-pretitle">
                            {all.data?.all?.length ?? 0} résultat trouvée
                        </div>
                        <h2 className="page-title">
                            {titre}
                        </h2>
                    </div>
                    <div className="col-auto ms-auto">
                        <div className="btn-list">
                            <Link href={`${url}${query ? `?${query}` : ''}`}
                                className='btn gr'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon-tabler" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" /></svg>
                                Genres
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination
                data={all.data?.all}
                loading={all.loading}
            />

            <div className='mt-4'>
                <Footer />
            </div>
        </> : <Genres
            all={all}
            type={t}
            d={d}
            Header={!d && (() => <div className="page-header px-3 pt-5 pb-2">
                <div className="row align-items-center">
                    <div className="col">
                        <h2 className="page-title">
                            {titre}
                        </h2>
                    </div>
                    <div className="col-auto ms-auto">
                        <div className="btn-list">
                            <Link href={`${url}?all=true${query ? `&${query}` : ''}`}
                                className='btn gr'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon-tabler" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" /></svg>
                                All
                            </Link>
                        </div>
                    </div>
                </div>
            </div>)
            } />
}

import {
    useState,
    useEffect
} from 'react';
import All from '../../src/components/Catalogue/All/Scroll';
import { FetchClient } from '../../src/lib/Fetch';
import Loader from '../../src/components/Loader';
import Empty from '../../src/components/Empty';
function Search() {
    const
        [loading, setLoading] = useState(null),
        [searchTerm, setSearchTerm] = useState(''),
        [focus, setFocus] = useState(null),
        [data, setData] = useState(null);
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            if (searchTerm && searchTerm !== '') {
                try {
                    const searchData = await FetchClient({
                        url: '/api/~/-',
                        method: 'POST',
                        body: { type: 'Search', query: searchTerm }
                    });
                    setData(searchData);
                } catch (error) {
                    console.log(error);
                }
            } else setData(null);
            setLoading(false)
        }, 500);
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);
    return (<>
        <div className='bg-dark h-8 d-flex align-items-center'>
            <div className='w-full container-xl d-flex justify-content-center'>
                <div className='searchinput container-xl w-full'>
                    <div className='d-flex justify-content-between gap-1'>
                        <input type='search'
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(null)}
                            onChange={({ target }) => setSearchTerm(target.value)}
                            value={searchTerm}
                            className='py-5' placeholder='Rechercher...' />
                        <button onClick={() => {
                            setSearchTerm('');
                            setData(null);
                            setLoading(null)
                        }} className={`clear${(searchTerm !== '' && focus) ? ' on' : ''}`}>
                            <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-x' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                <path d='M18 6l-12 12' />
                                <path d='M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                    <div className={`ligne${focus ? ' on' : ''}`}></div>
                </div>
            </div>
        </div>
        <div className='py-5'>
            {loading ?
                <div className='py-8 mt-6 w-full'><Loader spe={true} /></div> :
                data && <>
                    {data.best && data.best.length !== 0 && <div className='container-fluid p-md-6 p-4'>
                        <div className='header'>
                            <h3 className='title'>
                                Meilleurs résultats
                            </h3>
                        </div>
                        <All data={data.best} loading={loading} />
                    </div>}
                    {data.all && data.all.length !== 0 && <div className='container-fluid p-4'>
                        <div className='header'>
                            <h3 className='title'>
                                Résultats
                            </h3>
                        </div>
                        <All data={data.all} loading={loading} />
                    </div>}
                    {
                        (
                            (!data.best || data.best.length == 0) &&
                            (!data.all || data.all.length == 0)
                        ) &&
                        <div className='mt-7'><Empty /></div>}
                </>
            }
        </div>
    </>)
}

Search.getInitialProps = () => ({
    title: 'Rechercher'
});

export default Search
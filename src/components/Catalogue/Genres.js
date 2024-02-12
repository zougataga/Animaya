import {
    useState,
    useCallback,
    useEffect
} from 'react';
import { useInfiniteObserver } from 'react-infinite-observer';
import Slider from "../Slider";
import Footer from "../Footer";
import Loader from '../Loader';
import Cover from "./Cover";
export default function ({
    all,
    offCover,
    Header,
    type,
    g
}) {
    const
        [items, setItems] = useState([]),
        [page, setPage] = useState(1),
        itemParPage = 6,
        [load, setLoad] = useState(false),
        [deja, setDeja] = useState(false),
        onIntersection = useCallback(() => setPage(lp => lp + 1), []),
        [setLoadEl] = useInfiniteObserver({ onIntersection });
    useEffect(() => {
        setLoad(true);
        if (all.loading || !all.loading && !all.data?.all) return;

        const
            data = Object.entries(all.data?.all),
            startIndex = (page - 1) * itemParPage,
            endIndex = startIndex + itemParPage;

        if (!deja) {
            setItems(data.slice(startIndex, endIndex));
            setDeja(true)
        } else {
            setTimeout(() => {
                setItems(prevItems => ([...prevItems, ...(
                    data.filter(([key]) =>
                        !(prevItems.map(([key]) => key))
                            .includes(key))).slice(startIndex, endIndex)
                ]));
                setLoad(false)
            }, (data.length <= itemParPage ? 0 : 1000))
        }
    }, [page, all, deja]);
    return <>
        {!offCover && <Cover cover={all.data?.cover} loading={all.loading} />}
        <section className={offCover ? '' : 'section-abso page-mt60'}>
            {Header && <Header />}

            {all.loading ?
                <div className='py-8'><Loader spe={true} /></div> :
                <>
                    <div>
                        {items.map(([key, value], i) => (<>
                            <Slider
                                titre={key}
                                url={`/catalogue/genre/${key.toLowerCase()}${type ? `?type=${type}` : ''}`}
                                data={value.slice(0, 25)}
                                loading={all.loading}
                            />
                            {i === items.length - 1 && <div ref={setLoadEl}></div>}
                        </>))}
                    </div>
                    {load && <div className='py-8'>
                        <Loader spe={true} />
                    </div>}
                </>
            }
            {!offCover && <div className='mt-7'>
                <Footer />
            </div>}
        </section >
    </>
} 
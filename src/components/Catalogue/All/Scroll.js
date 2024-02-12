import {
    useState,
    useCallback,
    useEffect
} from 'react';
import { useInfiniteObserver } from 'react-infinite-observer';
import SliderItem from '../../Slider/Item';
import Loader from '../../Loader';
export default function ({ loading, data, Item }) {
    const
        [items, setItems] = useState([]),
        [load, setLoad] = useState(false),
        [deja, setDeja] = useState(false),
        [page, setPage] = useState(1),
        itemParPage = 24,
        onIntersection = useCallback(() => setPage(lp => lp + 1), []),
        [setLoadEl] = useInfiniteObserver({ onIntersection });
    useEffect(() => {
        setLoad(true);
        const
            startIndex = (page - 1) * itemParPage,
            endIndex = startIndex + itemParPage,
            set = () => setItems([...items, ...data.slice(startIndex, endIndex)]);
        if (!deja) {
            set();
            setDeja(true)
        }
        setTimeout(() => {
            if (deja) set();
            setLoad(false)
        }, (data.length <= itemParPage ? 0 : 1000))
    }, [page]);
    return (Item ? <div>
        {items.map((d, i) => <Item key={i} d={d} />)}
        <div ref={setLoadEl}></div>
        {load && <div className='py-5'>
            <Loader spe={true} />
        </div>}
    </div> : <div className='slider-main slider-main2'>
        <div className='position-relative row py-3 g-3 slider'>
            {items.map((d, i) =>
                <div className='col-sm-6 col-lg-4' key={i}><SliderItem data={d} loading={false} /></div>
            )}
        </div>
        <div ref={setLoadEl}></div>
        {load && <div className='py-5'>
            <Loader spe={true} />
        </div>}
    </div>);
}
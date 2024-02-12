import {
    useState,
    useEffect,
    useRef
} from 'react';
import SliderItem from '../../Slider/Item';
import Empty from '../../Empty';
import Loader from '../../Loader';
export default function ({
    loading,
    data
}) {
    const
        sliderMain = useRef(null),
        [load, setLoad] = useState(null),
        itemsPerPage = 6 * 4,
        [deja, setDeja] = useState(null),
        [currentPage, setCurrentPage] = useState(1),
        totalPages = Math.ceil(data?.length / itemsPerPage),
        startIndex = (currentPage - 1) * itemsPerPage,
        endIndex = startIndex + itemsPerPage,
        currentData = data?.slice(startIndex, endIndex),
        setPage = (page) => setCurrentPage(() => Math.min(page, totalPages)),
        handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)),
        handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)),
        generatePageNumbers = () => {
            const
                pageNumbers = [],
                maxPagesToShow = 5;
            if (totalPages <= maxPagesToShow) {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i)
                }
            } else {
                const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
                if (currentPage <= halfMaxPagesToShow + 1) {
                    for (let i = 1; i <= maxPagesToShow - 1; i++) {
                        pageNumbers.push(i)
                    }
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages)
                } else if (currentPage >= totalPages - halfMaxPagesToShow) {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
                        pageNumbers.push(i)
                    }
                } else {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    for (let i = currentPage - halfMaxPagesToShow; i <= currentPage + halfMaxPagesToShow; i++) {
                        pageNumbers.push(i)
                    }
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages)
                }
            }
            return pageNumbers;
        };
    useEffect(() => {
        if (!deja) return setDeja(true);
        setLoad(true);
        document.body.scrollTo({ top: sliderMain.current.offsetTop, behavior: 'smooth' })
        const inter = setTimeout(() => setLoad(false), 700);
        return () => clearTimeout(inter)
    }, [currentPage]);
    return <div className='slider-main slider-main2' ref={sliderMain}>
        {(loading || load) ? <div className='py-5'><Loader spe={true} /></div> :
            (currentData?.length === 0 ? <Empty /> : (currentData && <>
                <div className='position-relative row py-3 g-3 slider'>
                    {currentData?.map((d, i) => <div className='col-sm-6 col-lg-4'>
                        <SliderItem data={d} key={i} loading={false} />
                    </div>)}
                </div>
                {totalPages > 1 && <div className='container-xl mt-5 w-full'>
                    <div className="d-flex align-items-center justify-content-center">
                        <ul className="pagination p-3 rounded">
                            <li className={`page-item${currentPage <= 1 ? ' disabled' : ''}`} onClick={handlePrevPage}>
                                <button className="page-link" tabIndex={0}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 6l-6 6l6 6"></path></svg>
                                </button>
                            </li>
                            {generatePageNumbers().map((page, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${page === '...' ? 'disabled' : (page === currentPage ? 'active' : '')}`}
                                    onClick={() => (typeof page === 'number' ? setPage(page) : null)}
                                >
                                    <button className="page-link" tabIndex={0}>{page}</button>
                                </li>
                            ))}
                            <li className={`page-item${currentPage >= totalPages ? ' disabled' : ''}`} onClick={handleNextPage}>
                                <button className="page-link" tabIndex={0}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6l6 6l-6 6"></path></svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>}
            </>))}
    </div>
} 
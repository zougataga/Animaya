import Link from "next/link";
import {
    useState,
    useEffect,
    useCallback,
    useRef
} from "react";
import Empty from '../Empty';
import SliderItem from "./Item";
export default function ({
    titre,
    url,
    data,
    loading,
    item = 12
}) {
    titre = titre.toUpperCase();
    const
        progressBarRef = useRef(null),
        sliderRef = useRef(null),
        [activeIndex, setActiveIndex] = useState(0),
        [maxIndex, setMaxIndex] = useState(0),
        isSeulDnone = maxIndex <= 1 ? { display: 'none' } : {},
        calculateProgressBar = useCallback(() => {
            if (loading) return;
            const
                progressBar = progressBarRef?.current,
                slider = sliderRef?.current;
            if (!progressBar || !slider) return;
            let newSliderIndex = parseInt(getComputedStyle?.(slider).getPropertyValue('--slider-index'));

            const progressBarItemCount = Math.ceil(
                data.length /
                parseInt(getComputedStyle?.(slider).getPropertyValue('--items-per-screen'))
            );
            setMaxIndex(progressBarItemCount);

            if (newSliderIndex > progressBarItemCount) {
                const i = progressBarItemCount - 1;
                setActiveIndex(i);
                slider.style.setProperty('--slider-index', i);
                newSliderIndex = i
            }
            progressBar.innerHTML = '';
            for (let i = 0; i < progressBarItemCount; i++) {
                const barItem = document.createElement('div');
                barItem.classList.add('progress-item');
                barItem.classList.add('cursor-pointer');
                if (i === newSliderIndex) {
                    barItem.classList.add('active');
                    setActiveIndex(i)
                }
                barItem.id = `item-${i}`;
                barItem.onclick = ({ target }) => {
                    const i = Number(((target.id).split('-'))[1]);
                    slider.style.setProperty('--slider-index', i);
                    progressBar.querySelectorAll(`.progress-item`).forEach(e => e.classList.remove('active'));
                    target.classList.add('active');
                    setActiveIndex(i);
                    return callResize()
                };

                progressBar.appendChild(barItem)
            }
        }, [data, loading]),
        callResize = () => {
            const
                throttle = (cb, delay = 250) => {
                    let
                        shouldWait = false,
                        waitingArgs,
                        timeoutFunc = () => {
                            if (waitingArgs == null) {
                                shouldWait = false;
                            } else {
                                cb(...waitingArgs);
                                waitingArgs = null;
                                setTimeout(timeoutFunc, delay);
                            }
                        };
                    return (...args) => {
                        if (shouldWait) {
                            waitingArgs = args;
                            return;
                        }
                        cb(...args);
                        shouldWait = true;
                        setTimeout(timeoutFunc, delay);
                    };
                },
                throttleProgressBar = throttle(calculateProgressBar, 250);
            calculateProgressBar();
            window.addEventListener('resize', throttleProgressBar);
            return () => window.removeEventListener('resize', throttleProgressBar)
        },
        onHandleClick = useCallback((isRight) => {
            if (loading) return;
            const
                progressBar = progressBarRef?.current,
                slider = sliderRef?.current;
            if (!progressBar || !slider) return;
            let newSliderIndex = parseInt(getComputedStyle?.(slider).getPropertyValue('--slider-index'));
            newSliderIndex = isRight ?
                ((newSliderIndex + 1) % progressBar.children.length) :
                ((newSliderIndex - 1 + progressBar.children.length) % progressBar.children.length)
            slider.style.setProperty('--slider-index', newSliderIndex);
            setActiveIndex(newSliderIndex);
            return callResize()
        }, [data, loading]);
    useEffect(() => callResize(), [calculateProgressBar]);
    return (<div className={`row mt-5 slider-main ${url ? ' link-spe' : ''}`}>
        <div className="header container-fluid p-4">
            <h3 className="title">
                {url ? <Link className="d-flex align-items-center text-decoration-none" href={url ?? '#'}>
                    <p>{titre}</p>
                    <div className="text-truncate animescale d-flex align-items-center align-items-center">
                        <span className="text-primary">Tout explorer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                    </div>
                </Link> : titre}
            </h3>
            <div style={isSeulDnone}>
                <div className="progressbar" ref={progressBarRef} ></div>
                <div className="progresscount btn btn-outline-primary pointer-none">{activeIndex + 1}/{maxIndex}</div>
            </div>
        </div>
        <div className="position-relative d-flex justify-content-center overflow-hidden">
            <button className="handle left-handle" style={isSeulDnone} onClick={() => onHandleClick()}>
                <span className="text">&#8249;</span>
            </button>
            {loading || !data ? (() => {
                let el = [];
                for (let i = 0; i < item; i++) {
                    el.push(<SliderItem data={null} loading={loading} />);
                }
                return <div className="slider" ref={sliderRef}>{el}</div>
            })() :
                (data && data.length >= 1 ?
                    <div className="slider" ref={sliderRef}>
                        {data.map((data, i) =>
                            <SliderItem key={i} data={data} loading={loading} />
                        )}
                    </div> :
                    <div className="d-flex align-items-center justify-content-center w-full"><Empty /></div>
                )}
            <button className="handle right-handle" style={isSeulDnone} onClick={() => onHandleClick(true)}>
                <span className="text">&#8250;</span>
            </button>
        </div>
    </div>)
}
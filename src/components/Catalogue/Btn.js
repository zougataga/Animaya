import { useEffect, useState } from "react";
import { Fetch, FetchClient } from "../../lib/Fetch";
export function WatchList({ data, large }) {
    const
        [load, setLoad] = useState(true),
        [hover, setHover] = useState(false),
        [on, setOn] = useState(false),
        [log, setLog] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchClient({
                    url: '/api/auth/log',
                    method: 'POST'
                });
                setLog(result);
                const watchData = await FetchClient({
                    url: '/api/user/list',
                    method: 'POST',
                    body: {
                        key: 'list.watchlist',
                        type: 'get',
                        data: {
                            id: data?.id
                        }
                    }
                }, setLoad);
                if (watchData) {
                    watchData.success && setOn(true)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
    }, [data]);
    return (
        <button
            tabIndex={0}
            disabled={!log || load}
            onMouseEnter={() => large && (on && setHover(true))}
            onMouseLeave={() => large && (on && setHover(false))}
            className={`btn btn-outline-primary btnf${large ? ' lgg' : ''}${on ? ' active' : ''}`}
            onClick={async () => {
                try {
                    const r = await FetchClient({
                        url: '/api/user/list',
                        method: 'POST',
                        body: {
                            type: 'set',
                            key: 'list.watchlist',
                            data: {
                                id: data?.id
                            }
                        }
                    }, setLoad);
                    if (r && !r.error) {
                        const tooltips = document.querySelectorAll('.tooltip') ?? [];
                        tooltips.forEach(tooltip => tooltip && tooltip.remove());
                        setOn(!on);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }}
            data-bs-toggle={!large && "tooltip"}
            data-bs-placement={!large && "top"}
            data-bs-original-title={!large && (on ? 'Supprimer de votre WATCHLIST' : 'Ajouter à votre WATCHLIST')}
            style={large ? { minWidth: '193px', minHeight: '45px' } : {}}
        >
            {load ? <div className="spinner-border"></div> :
                (on ? <span>
                    {hover ? <span className="text-uppercase">Supprimer</span> : <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z" strokeWidth="0" fill="currentColor" /></svg>
                        <span className="text-uppercase">Dans la watchlist</span>
                    </>}
                </span> : <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" /></svg>
                    <span className="text-uppercase">Ajouter dans la watchlist</span>
                </span>)}
        </button>
    );
}

export function Favori({ data, loading, large }) {

    const
        [load, setLoad] = useState(true),
        [hover, setHover] = useState(false),
        [on, setOn] = useState(false),
        [log, setLog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchClient({
                    url: '/api/auth/log',
                    method: 'POST'
                });
                setLog(result);
                const favData = await FetchClient({
                    url: '/api/user/list',
                    method: 'POST',
                    body: {
                        key: 'list.favoris',
                        type: 'get',
                        data: {
                            id: data?.id
                        }
                    }
                }, setLoad);
                if (favData) {
                    favData.success && setOn(true)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
    }, [data]);
    return (
        <button
            tabIndex={0}
            disabled={!log || load}
            onMouseEnter={() => large && (on && setHover(true))}
            onMouseLeave={() => large && (on && setHover(false))}
            className={`btn btn-outline-yellow border-yellow btnf${large ? ' lgg' : ''}${on ? ' active' : ''}`}
            onClick={async () => {
                try {
                    const r = await FetchClient({
                        url: '/api/user/list',
                        method: 'POST',
                        body: {
                            type: 'set',
                            key: 'list.favoris',
                            data: {
                                id: data?.id
                            }
                        }
                    }, setLoad);
                    if (r && !r.error) {
                        const tooltips = document.querySelectorAll('.tooltip') ?? [];
                        tooltips.forEach(tooltip => tooltip && tooltip.remove());
                        setOn(!on);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }}
            data-bs-toggle={!large && "tooltip"}
            data-bs-placement={!large && "top"}
            data-bs-original-title={!large && (on ? 'Supprimer de votre WATCHLIST' : 'Ajouter à votre WATCHLIST')}
            style={large ? { minWidth: '193px', minHeight: '45px' } : {}}
        >
            {load ? <div className="spinner-border"></div> :
                (on ? <span>
                    {hover ? <span className="text-uppercase">Supprimer</span> : <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" strokeWidth="0" fill="currentColor" /></svg>
                        <span className="text-uppercase">Dans vos favoris</span>
                    </>}
                </span> : <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                    <span className="text-uppercase">Ajouter à vos favoris</span>
                </span>)}
        </button>
    );

}

import {
    useEffect,
    useRef,
    useState
} from "react";
import Timestamp from "../Timestamp";
import Loader from "../Loader.js";
import Error from "../Error.js";
import { FetchClient } from "../../lib/Fetch.js";
import { useRouter } from "next/router.js";
export default function ({
    isLog,
    isl,
    call
}) {
    const
        router = useRouter(),
        iFile = useRef(false),
        iFile2 = useRef(false),
        [load, setLoad] = useState(true),
        [hover, setHover] = useState(false),
        [hover2, setHover2] = useState(false),
        [data, setData] = useState(false),
        editData = (key, value) => new Promise(async r => {
            try {
                const data = await FetchClient({
                    url: '/api/user',
                    method: 'POST',
                    body: { key, value },
                });
                r(data)
            } catch (error) {
                console.error('Erreur inattendue :', error);
                r(false)
            }
        }),
        dropdown = <div className='dropdown-menu' >
            <button tabIndex={0} className='dropdown-item' href='/catalogue'>
                <span className='nav-link-title' onClick={() => isl && iFile.current && iFile.current.click()}>
                    Changer l'image de couverture
                </span>
            </button>
            <button tabIndex={0} className='dropdown-item' disabled={data?.banner?.default}
                onClick={async (e) => {
                    if (!isl) return;
                    const r = data.banner.url;
                    data.banner.url = '/assets/loader.gif';
                    setData(data);
                    const d = await editData('banner', undefined);
                    if (d) {
                        if (d?.success) {
                            data.banner.url = '/assets/banner.png';
                            data.banner.default = true;
                        } else if (d == 'Body exceeded 1mb limit') {
                            alert('Cette image est trop lourdre !');
                            data.banner.url = r
                        }
                    } else {
                        data.banner.url = r
                    }
                    setData(data)
                }}>
                <span className='nav-link-title text-danger'>
                    Supprimer l'image de couverture
                </span>
            </button>
        </div>,
        dropdown2 = <div className='dropdown-menu' >
            <button tabIndex={0} className='dropdown-item' href='/catalogue'>
                <span className='nav-link-title' onClick={() => isl && iFile2.current && iFile2.current.click()}>
                    Changer l'avatar
                </span>
            </button>
            <button tabIndex={0} className='dropdown-item' disabled={data?.avatar?.default}
                onClick={async (e) => {
                    if (!isl) return;
                    const r = data.avatar.url;
                    data.avatar.url = '/assets/loader.gif';
                    setData(data);
                    const d = await editData('avatar', undefined);
                    if (d) {
                        if (d?.success) {
                            data.avatar.url = data.avatar.reel;
                            data.avatar.default = true;
                        } else if (d == 'Body exceeded 1mb limit') {
                            alert('Cette image est trop lourdre !');
                            data.avatar.url = r
                        }
                        // isl && isLog.refetch()
                    } else {
                        data.avatar.url = r
                    }
                    setData(data)
                }}>
                <span className='nav-link-title text-danger'>
                    Supprimer l'avatar
                </span>
            </button>
        </div>,
        InputPseudo = () => {
            const
                [pseudo, setPseudo] = useState(data.pseudo || ''),
                [timeoutId, setTimeoutId] = useState(null);
            return <input type="search" onChange={async (e) => {
                e = e.target.value;
                setPseudo(e);
                if (timeoutId) {
                    clearTimeout(timeoutId)
                }
                // if (pseudo.length < 2 || pseudo.length > 20) {
                //     return;
                // }
                const
                    r = data.pseudo,
                    newTimeoutId = setTimeout(async () => {
                        try {
                            const d = await editData('pseudo', !e || e === '' ? undefined : e);
                            if (d && d?.success) {
                                data.pseudo = e;
                                // isl && isLog.refetch()
                            } else {
                                data.pseudo = r
                            }
                        } catch (error) {
                            console.error('Erreur lors de la mise à jour du pseudo :', error);
                            data.pseudo = r
                        }
                        setData(data)
                    }, 1000);
                setTimeoutId(newTimeoutId)
            }} className="pseudoi text-shadow" value={pseudo} />
        };

    useEffect(() => {
        setData(isLog.data);
        setLoad(isLog.loading)
    }, [isLog]);
    useEffect(() => {
        if (
            (!isLog.loading && !isLog.data) ||
            (!isl && !isLog.data?.public)
        ) {
            router.push((!isl && !isLog.data?.public) ? '/404' : '/auth');
        }
    }, [isLog]);
    return load ? <div className="py-8"><Loader spe={true} /></div> : data ? <>
        <div className="banner backImg"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ backgroundImage: 'url("' + data?.banner?.url + '")' }} >
            {isl && <div className="btnIco p-3">
                <div className="dropdown">
                    <a href="#" tabIndex={0} className='btn dropdown-toggle' data-bs-toggle='dropdown'
                        data-bs-auto-close='outside' role='button' aria-expanded='false' disabled={!isl}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </a>
                    {dropdown}
                </div>
            </div>}
            <div className="over2"></div>
            {isl && hover && <div className="over">
                <div className="dropdown">
                    <a href="#" tabIndex={0} className='btn dropdown-toggle' data-bs-toggle='dropdown'
                        data-bs-auto-close='outside' role='button' aria-expanded='false'>Modifier l'image de couverture</a>
                    {dropdown}
                </div>
            </div>}
            <input type="file" accept="image/*" onChange={(e) => {
                if (!isl) return;
                const r = data.banner.url;
                data.banner.url = '/assets/loader.gif';
                setData(data);
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                        const
                            base64Data = event.target.result,
                            d = await editData('banner', base64Data);
                        if (d) {
                            if (d?.success) {
                                data.banner.url = base64Data;
                                data.banner.default = false;
                            } else if (d == 'Body exceeded 1mb limit') {
                                alert('Cette image est trop lourdre !');
                                data.banner.url = r
                            }
                        } else {
                            data.banner.url = r
                        }
                        setData(data)
                    };
                    reader.readAsDataURL(file);
                }
                iFile.current.value = ''
            }} className="d-none" ref={iFile} />
        </div>
        <div className="headAvatar d-flex px-5">
            <div className="avatar2"
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => setHover2(false)}
            >
                <div className="bannerurl backImg" style={{ backgroundImage: 'url("' + data?.avatar?.url + '")' }} ></div>
                {isl && hover2 && <div className="over">
                    <div className="dropdown">
                        <a href="#" tabIndex={0} className='btn dropdown-toggle'
                            data-bs-toggle='dropdown'
                            data-bs-auto-close='outside' role='button' aria-expanded='false'>Changer</a>
                        {dropdown2}
                    </div>
                </div>}
                {isl && !hover2 && <div className="btnIco">
                    <div className="dropdown">
                        <a href="#" tabIndex={0} className='btn dropdown-toggle' data-bs-toggle='dropdown'
                            data-bs-auto-close='outside' role='button' aria-expanded='false'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        </a>
                        {dropdown2}
                    </div>
                </div>}
            </div>
            <input type="file" accept="image/*" onChange={(e) => {
                if (!isl) return;
                const r = data.avatar.url;
                data.avatar.url = '/assets/loader.gif';
                setData(data);
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                        const
                            base64Data = event.target.result,
                            d = await editData('avatar', base64Data);
                        if (d) {
                            if (d?.success) {
                                data.avatar.url = base64Data;
                                data.avatar.default = false;
                            } else if (d == 'Body exceeded 1mb limit') {
                                alert('Cette image est trop lourdre !');
                                data.avatar.url = r
                            }
                            // isl && isLog.refetch()
                        } else {
                            data.avatar.url = r
                        }
                        setData(data)
                    };
                    reader.readAsDataURL(file);
                }
                iFile.current.value = ''
            }} className="d-none" ref={iFile2} />
            <div className="titre py-md-0 py-6 px-3">
                {isl ? <InputPseudo /> :
                    data.pseudo && <h1>{data.pseudo}</h1>
                }
                <p className="d-flex flex-column gap-1">
                    <span>Nom d'utilisateur: <strong>{data.username}</strong></span>
                    <span>Membre depuis : <Timestamp timestamp={data.timestamp} /></span>
                </p>
            </div>
        </div>
        {call && call({ data, setData, editData })}
    </> : <Error />
}

import { useRouter } from "next/router.js";
import {
    useEffect,
    useState
} from "react";
import Anime from "../../../../../src/components/Watch/Anime";
import Manga from "../../../../../src/components/Watch/Manga";
import Error from "../../../../../src/components/Error";
import Loader from "../../../../../src/components/Loader";
import { Fetch } from "../../../../../src/lib/Fetch";
function Watch() {
    const
        router = useRouter(),
        { data, loading } = Fetch({
            url: '/api/~/-',
            method: 'POST',
            body: { type: 'Watch', ...router.query },
        }),
        historique = Fetch({ url: '/api/account/list', method: 'POST', body: { key: 'list.historique', type: 'get', ...router.query } }),
        [load, setLoad] = useState(true);
    useEffect(() => setLoad(loading), [loading, historique?.loading]);
    useEffect(() => {
        const body = document.body;
        if (data?.isAnime) {
            body.style.overflow = 'hidden';
        }
        body.style.background = 'rgb(4, 10, 17, .9)';
        body.classList.add('h-full');
        return () => {
            body.style.overflow = '';
            body.style.background = '';
            body.classList.remove('h-full');
        };
    }, [data]);
    if (!load && (!data || data?.error)) {
        return <Error />;
    }
    return (load ? <Loader /> : (data && (data?.isAnime ? <Anime data={data} nb={historique.data?.nb} /> : <Manga data={data} nb={historique.data?.nb} />)))
}

Watch.getInitialProps = ({ query }) => {
    let title = query.id;
    title = title.replaceAll('-', ' ');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    title += ` ${query.lang.toUpperCase()}`;
    return {
        title,
        off: true,
        navtransparent: 'spe'
    }
};

export default Watch
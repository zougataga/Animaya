import { useRouter } from "next/router";
import {
    useEffect,
    useState
} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player';
import Loader from "../../../../../src/components/Loader";
function Lecteur() {
    const
        [load, setLoad] = useState(true),
        {
            id,
            d
        } = (useRouter()).query,
        image = `https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/${id}.jpg`,
        video = `https://s22.anime-sama.fr/videos/${decodeURIComponent(d)}.mp4`;
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.background = 'rgb(4, 10, 17, .9)';
        document.body.classList.add('h-full');
        setLoad(null)
    }, []);
    return load ? <Loader /> : <div className="h-full d-flex justify-content-center align-items-end">
        <ReactPlayer
            url={video}
            light={<LazyLoadImage effect="blur" src={image} alt={id} />}
            controls
            autoPlay
            width="100%"
            height="100%"
        />
    </div>
}

Lecteur.getInitialProps = ({ query }) => ({
    off: true,
    navtransparent: 'spe'
});

export default Lecteur
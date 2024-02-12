import { useRouter } from 'next/router';
import Allt from "../../../src/components/Catalogue/Allt";
import { Genres } from '../../../src/lib/Import'
function Genre() {
    const
        router = useRouter(),
        {
            genre,
            type
        } = router.query ?? {},
        g = Genres.find(e => e.genre.toLowerCase() == genre.toLowerCase());
    return <Allt
        type='Genre'
        body={{
            genre,
            animes: (type === 'animes'),
            scans: (type === 'scans')
        }}
        titre={g ? <div className="genretitre w-full flex-column p-4">
            <h1>
                {g.svg || <></>}
                {g.genre}
            </h1>
            {g.desc && <span>{g.desc}</span>}
        </div> : 'Genre - ' + genre}
        t={type}
        url={`/catalogue/genre/${genre}`}
        query={type ? `type=${type}` : ''}
    />
}
Genre.getInitialProps = ({ query }) => ({
    title: 'Genre - ' + query.genre,
    navtransparent: true
});

export default Genre
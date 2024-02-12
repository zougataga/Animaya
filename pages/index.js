import { useEffect } from 'react';
import Cover from '../src/components/Catalogue/Cover.js';
import Agenda from '../src/components/Agenda';
import Slider from '../src/components/Slider';
import Footer from '../src/components/Footer';
import Error from '../src/components/Error';
import { Fetch } from '../src/lib/Fetch';
function Home({ id }) {
    const
        { data, loading } = Fetch({ url: '/api/~/-', method: 'POST', body: { type: 'Home' } }),
        historique = Fetch({ url: '/api/user/list', method: 'POST', body: { key: 'list.historique', type: 'get' } });
    return (
        <>
            <Cover cover={data?.cover} loading={loading} />
            <section className='section-abso page-mt110'>
                <div className='mt-8'>
                    <Slider titre='Les classiques' data={data?.animes?.clasiques} loading={loading} />
                    {!historique.loading &&
                        (historique.data && !historique.data?.error) &&
                        historique.data.length >= 1 &&
                        <Slider titre='reprenez votre visionnage' data={(historique.data)?.slice()?.reverse()} loading={historique.loading} />
                    }
                </div>
                <Agenda calendrier={data?.calendrier} loading={loading} />
                <Slider titre='Derniers ajouts' data={data?.animes?.recent} loading={loading} />
                <Slider titre='Découvrez des pépites' data={data?.animes?.pepites} loading={loading} />
                <div className='mt-7'>
                    <Footer />
                </div>
            </section>
        </ >
    )
}

Home.getInitialProps = () => ({
    title: 'Accueil',
    navtransparent: true
});

export default Home
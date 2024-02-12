import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Profil from "../../src/components/Profil";
import Slider from "../../src/components/Slider";
import Footer from '../../src/components/Footer';
import { Fetch } from "../../src/lib/Fetch";
function User() {
    const
        router = useRouter(),
        { name } = router.query,
        profil = Fetch({
            url: '/api/user/profil',
            method: 'POST',
            body: {
                name
            }
        }),
        WatchList = () => {
            const {
                data,
                loading
            } = Fetch({
                url: '/api/user/list',
                method: 'POST',
                body: {
                    name,
                    key: 'list.watchlist',
                    type: 'get'
                }
            });
            return (!loading && data && !data?.error) && < Slider titre='watchlist' data={(data)?.slice()?.reverse()
            } loading={loading} />
        },
        Favoris = () => {
            const {
                data,
                loading
            } = Fetch({
                url: '/api/user/list',
                method: 'POST',
                body: {
                    name,
                    key: 'list.favoris',
                    type: 'get'
                }
            });
            return (!loading && data && !data?.error) && < Slider titre='favoris' data={(data)?.slice()?.reverse()
            } loading={loading} />
        },
        Historique = () => {
            const {
                data,
                loading
            } = Fetch({
                url: '/api/user/list',
                method: 'POST',
                body: {
                    name,
                    key: 'list.historique',
                    type: 'get'
                }
            });
            return (!loading && data && !data?.error) && <Slider titre='historique' data={(data)?.slice()?.reverse()} loading={loading} />
        };
    return <>
        <Profil
            isLog={profil}
            isl={false}
        />
        {profil && profil.data?.public && <section className="section-abso" style={{ top: '64%' }}>
            <div className='container-xl'>
                <WatchList />
                <Favoris />
                <Historique />
            </div>
            <div>
                <Footer />
            </div>
        </section>}
    </>
}

User.getInitialProps = ({ query }) => ({
    title: query.name,
    navtransparent: true
});

export default User
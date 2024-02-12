import Link from "next/link";
import {
    useEffect,
    useState
} from "react";
import Profil from "../../src/components/Profil";
import Slider from "../../src/components/Slider";
import Footer from '../../src/components/Footer';
import { Fetch } from "../../src/lib/Fetch";
function Account({ isLog }) {
    const
        WatchList = () => {
            const {
                data,
                loading
            } = Fetch({
                url: '/api/user/list',
                method: 'POST',
                body: {
                    key: 'list.watchlist',
                    type: 'get'
                }
            });
            return <Slider titre='watchlist' data={(data)?.slice()?.reverse()} loading={loading} />
        },
        Favoris = () => {
            const {
                data,
                loading
            } = Fetch({
                url: '/api/user/list',
                method: 'POST',
                body: {
                    key: 'list.favoris',
                    type: 'get'
                }
            });
            return <Slider titre='favoris' data={(data)?.slice()?.reverse()} loading={loading} />
        },
        Historique = () => {
            const {
                data,
                loading
            } = Fetch({
                url: '/api/user/list',
                method: 'POST',
                body: {
                    key: 'list.historique',
                    type: 'get'
                }
            });
            return <Slider titre='historique' data={(data)?.slice()?.reverse()} loading={loading} />
        }
    return <>
        <Profil
            isLog={isLog}
            isl={true}
        />
        <section className="section-abso" style={{ top: '64%' }}>
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">
                                Paramètre
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="card bg-transparent border-0">
                        <div className="row g-0">
                            <div className="col-12 col-md-3 border-bottom border-md-0 border-md-end border-secondary ">
                                <div className="card-body">
                                    <div className="list-group list-group-transparent">
                                        <Link href="/user" className="list-group-item list-group-item-action d-flex align-items-center">Mon compte</Link>
                                        <Link href="/user/list" className="list-group-item list-group-item-action d-flex align-items-center active">Mes listes</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-9 d-flex flex-column">
                                <div className="card-body">
                                    <h2 className="mb-4">Mes listes</h2>

                                    <WatchList />
                                    <Favoris />
                                    <Historique />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </section>
    </>

}

Account.getInitialProps = () => ({
    title: 'Mes listes',
    navtransparent: 'spe'
});

export default Account
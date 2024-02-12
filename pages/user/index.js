import Link from "next/link";
import {
    useEffect,
    useState
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Profil from "../../src/components/Profil";
import Captcha from "../../src/components/Captcha";
import Footer from '../../src/components/Footer';
import Timestamp from "../../src/components/Timestamp";
import Loader from "../../src/components/Loader";
import PasswordInput from '../../src/components/Auth/Password';
import { FetchClient } from "../../src/lib/Fetch";

function Account({ isLog }) {
    return <Profil
        isLog={isLog}
        isl={true}
        call={({ data, setData, editData }) => {
            const
                Username = () => {
                    const [form, setForm] = useState({
                        username: data.username || '',
                        error: false,
                        success: false,
                        loading: true
                    });
                    useEffect(() => setForm(e => ({ ...e, loading: false })), []);
                    return <>
                        <h3 className="card-title mt-4">Nom d'utilisateur</h3>
                        <p className="card-subtitle">Votre nom d'utilisateur unique</p>
                        {form.loading ?
                            <div className="py-3"><Loader spe={true} /></div> :
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                setForm(e => ({ ...e, success: false, error: false, loading: true }));
                                try {
                                    const data = await FetchClient({
                                        url: '/api/user/username',
                                        method: 'POST',
                                        body: form,
                                    });
                                    if (data) {
                                        if (data.success) {
                                            setForm(e => ({ ...e, success: data.success }))
                                        } else {
                                            setForm(e => ({
                                                ...e, error: (() => {
                                                    let d = data.error;
                                                    const s = d.split('||');
                                                    if (s[1]) {
                                                        d = [<><span>{s[0]}, </span> <br /><span>veuillez réessayer <Timestamp timestamp={Number(s[1])} /></span> </>]
                                                    }
                                                    return d
                                                })() ?? "Échec de la modification du nom d'utilisateur."
                                            }))
                                        }
                                    } else {
                                        setForm(e => ({ ...e, error: "Échec de la modification du nom d'utilisateur." }))
                                    }
                                } catch (error) {
                                    setFormData(e => ({ ...e, error: "Échec de la modification du nom d'utilisateur. (Erreur inattendue)" }))
                                    console.error('Erreur inattendue :', error);
                                }
                                setTimeout(() => {
                                    setForm(e => ({ ...e, loading: false }))
                                }, 700)
                            }}>
                                <div className="row g-2">
                                    <div className="col-auto">
                                        <input type="text" tabIndex={0}
                                            onChange={({ target }) => setForm(e => ({ ...e, username: target.value }))}
                                            className={`form-control bg-rdark w-auto${form.success ? ' border border-success' : ''}${form.error ? ' border border-danger' : ''}`} value={form.username} />
                                    </div>
                                    <div className="col-auto">
                                        <button type="submit" tabIndex={0} className="btn bg-rdark">
                                            Modifier
                                        </button>
                                    </div>
                                    {form.success && <p className="card-subtitle text-success mt-1">{form.success}</p>}
                                    {form.error && <p className="card-subtitle text-danger mt-1">{form.error}</p>}
                                </div>
                            </form>
                        }
                    </>
                },
                Password = () => {
                    const
                        [open, setOpen] = useState(false),
                        Modal = () => {
                            const
                                [form, setForm] = useState({
                                    password: '',
                                    newpassword: '',
                                    newpassword2: '',
                                    success: false,
                                    error: false,
                                    loading: true
                                }),
                                handleInputChange = (e) => {
                                    const {
                                        name,
                                        value
                                    } = e.target;
                                    setForm(e => ({
                                        ...e,
                                        [name]: value,
                                    }));
                                };
                            useEffect(() => {
                                const inter = setTimeout(() => {
                                    setForm(e => ({ ...e, loading: false }))
                                }, 1000);
                                return () => clearTimeout(inter)
                            }, []);
                            return <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Modifier votre mot de passe</h5>
                                    <button type="button" className="btn-close" tabIndex={0} onClick={() => setOpen(!open)}></button>
                                </div>
                                <div className="modal-body p-5">
                                    {form.loading ? <div className="w-full py-7"><Loader spe={true} /></div> :
                                        form.success ? <>
                                            <div className="w-full d-flex align-items-center justify-content-center">
                                                <LazyLoadImage effect="blur" src="./assets/sent.gif" width="150" alt="" />
                                            </div>
                                            <center>
                                                <h3>
                                                    Votre mot de passe à bien été modifier </h3>
                                                <p> Vous pouvez maintenant fermer cette fenêtre  </p>
                                            </center>
                                        </> : <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                setForm(e => ({ ...e, success: false, error: false, loading: true }));
                                                try {
                                                    const data = await FetchClient({
                                                        url: '/api/user/password',
                                                        method: 'POST',
                                                        body: form,
                                                    });
                                                    if (data) {
                                                        if (data.success) {
                                                            setForm(e => ({ ...e, success: data.success }))
                                                        } else {
                                                            setForm(e => ({
                                                                ...e, error: (() => {
                                                                    let d = data.error;
                                                                    const s = d.split('||');
                                                                    if (s[1]) {
                                                                        d = [<><span>{s[0]}, </span> <br /><span>veuillez réessayer <Timestamp timestamp={Number(s[1])} /></span> </>]
                                                                    }
                                                                    return d
                                                                })() ?? "Échec de la modification du mot de passe."
                                                            }))
                                                        }
                                                    } else {
                                                        setForm(e => ({ ...e, error: "Échec de la modification du mot de passe." }))
                                                    }
                                                } catch (error) {
                                                    setFormData(e => ({ ...e, error: "Échec de la modification du mot de passe. (Erreur inattendue)" }))
                                                    console.error('Erreur inattendue :', error);
                                                }
                                                setTimeout(() => {
                                                    setForm(e => ({ ...e, loading: false }))
                                                }, 700)
                                            }}
                                            className="w-full"
                                        >
                                            {form.error && (<div className="alert alert-important alert-danger alert-dismissible" role="alert">
                                                <div className="d-flex">
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="icon alert-icon" width="24" height="24" viewBox="0 0 24 24"
                                                            strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <circle cx="12" cy="12" r="9"></circle>
                                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                        </svg>
                                                    </div>
                                                    <div>{form.error}</div>
                                                </div>
                                                <a className="btn-close btn-close-white" tabIndex={0} data-bs-dismiss="alert" aria-label="close"></a>
                                            </div>)}

                                            <PasswordInput
                                                name='password'
                                                handleInputChange={handleInputChange}
                                                formData={form}
                                            />

                                            <PasswordInput
                                                name='newpassword'
                                                titre='Votre nouveau mot de passe'
                                                handleInputChange={handleInputChange}
                                                formData={form}
                                            />

                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Confirmer le nouveau mot de passe
                                                </label>
                                                <div className="input-group input-group-flat">
                                                    <input tabIndex={0} type='password' className="form-control bg-rdark"
                                                        placeholder="········" aria-autocomplete="list"
                                                        name='newpassword2'
                                                        onChange={handleInputChange}
                                                        value={form['newpassword2']}
                                                        autoComplete="off" />
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <Captcha />
                                            </div>

                                            <button tabIndex={0} type="submit"
                                                className="mt-3 btn btn-primary w-100">
                                                Sauvegarder
                                            </button>

                                        </form>
                                    }
                                </div>
                            </div>
                        };
                    return <>
                        <h3 className="card-title mt-4">Mot de pasee</h3>
                        <p className="card-subtitle">Votre mot de passe unique</p>
                        <div>
                            <button role="button" onClick={() => setOpen(!open)} className="btn bg-rdark">
                                Modifier
                            </button>
                        </div>
                        {open && <div className="modal modal-blur d-flex justify-content-center align-items-center show" id="exampleModal" tabIndex={-1} style={{ display: 'block' }} aria-modal="true" role="dialog">
                            <div className="modal-dialog w-full modal-lg " role="document">
                                <Modal />
                            </div>
                        </div>}
                    </>
                },
                Public = () => {
                    const [isChecked, setIsChecked] = useState(data.public);
                    return <>
                        <h3 className="card-title mt-4">Profil public</h3>
                        <p className="card-subtitle">Rendre votre profil public signifie que n'importe qui pourra voir votre profil.</p>
                        <div>
                            <label className="form-check form-switch form-switch-lg">
                                <input className="form-check-input cursor-pointer" type="checkbox"
                                    onChange={async () => {
                                        const
                                            newValue = !isChecked,
                                            r = data.public,
                                            d = await editData('public', newValue ? undefined : true);
                                        if (d && d?.success) {
                                            data.public = !(newValue ? undefined : true);
                                            setIsChecked(newValue)
                                        } else {
                                            data.public = r
                                        }
                                        setData(data)
                                    }}
                                    checked={isChecked} />
                                <span className="form-check-label form-check-label-on">Vous êtes actuellement visible</span>
                                <span className="form-check-label form-check-label-off">Vous êtes actuellement invisible</span>
                            </label>
                        </div>
                    </>
                };
            return <section className="section-abso" style={{ top: '64%' }}>
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
                                            <Link href="/user" className="list-group-item list-group-item-action d-flex align-items-center active">Mon compte</Link>
                                            <Link href="/user/list" className="list-group-item list-group-item-action d-flex align-items-center">Mes listes</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-9 d-flex flex-column">
                                    <div className="card-body">
                                        <h2 className="mb-4">Mon compte</h2>

                                        <Username />
                                        <Password />
                                        <Public />
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
        }}
    />

}

Account.getInitialProps = () => ({
    title: 'Mon compte',
    navtransparent: 'spe'
});

export default Account
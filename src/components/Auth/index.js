import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Captcha from "../Captcha";
import Loader from '../Loader';
import Password from "./Password";
export default function ({
    router,
    password2,
    captcha,
    submit
}) {
    const
        goto = router.query.goto ? `?goto=${router.query.goto}` : "",
        [formData, setFormData] = useState({
            username: '',
            password: '',
            password2: password2 ? '' : undefined,
            captcha: undefined,
            error: false,
            loading: true
        }),
        handleInputChange = (e) => {
            const {
                name,
                value
            } = e.target;
            setFormData(e => ({
                ...e,
                [name]: value,
            }));
        };
    useEffect(() => setFormData(e => ({ ...e, loading: !e.loading })), []);
    return <div className="container-xl h-full">
        <div className="d-flex align-items-center justify-content-center w-full h-full">
            <div className="container container-tight py-4 mt-0 mb-0">
                <div className="text-center mb-4">
                    <Link href="/" className="navbar-brand navbar-brand-autodark" tabIndex={0}>
                        <LazyLoadImage src="/icons/logo.png" className="grayscallover card-link-rotate" width="250px"
                        /></Link>
                </div>
                {formData.error && (<div className="alert alert-important alert-danger alert-dismissible" role="alert">
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
                        <div>{formData.error}</div>
                    </div>
                    <a className="btn-close btn-close-white" tabIndex={0} data-bs-dismiss="alert" aria-label="close"></a>
                </div>)}
                <form
                    className="card card-md bg-rdark"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit(e, formData, setFormData)
                    }}
                    autoComplete="off"
                >
                    <div className="card-body">
                        {formData.loading ? <div className="py-8"><Loader spe={true} /></div> : <>
                            <div className="mb-3">
                                <label className="form-label">Identifiant</label>
                                <input tabIndex={0} type="text" className="form-control bg-rdark"
                                    placeholder="Zezzzz311"
                                    autoComplete="new-password"
                                    name="username"
                                    onChange={handleInputChange}
                                    value={formData.username}
                                />
                            </div>
                            <Password
                                name='password'
                                handleInputChange={handleInputChange}
                                formData={formData}
                            />
                            {password2 && <Password
                                name='password2'
                                handleInputChange={handleInputChange}
                                formData={formData}
                            />}
                            {captcha && <Captcha />}
                            <div className="form-footer">
                                <button tabIndex={0} type="submit"
                                    className="mt-3 btn btn-primary w-100">
                                    {!password2 ?
                                        'Connexion' :
                                        'Crée un compte'}

                                </button>
                            </div>
                        </>}
                    </div>
                    <div className="hr-text">ou</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                {!password2 ?
                                    <Link href={`/auth/create${goto}`} className="btn btn-primary w-100">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-user-plus" width="24"
                                            height="24" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" fill="none" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                            <path d="M16 11h6m-3 -3v6"></path>
                                        </svg>
                                        Créer un compte </Link> :
                                    <Link href={`/auth${goto}`} className="btn btn-primary w-100">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-user-check" width="24"
                                            height="24" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" fill="none" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                            <path d="M16 11l2 2l4 -4"></path>
                                        </svg>
                                        Connexion </Link>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}
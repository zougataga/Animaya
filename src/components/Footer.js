import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function () {
    return (<footer className="mt-6 w-full footer footer-transparent d-print-none">
            <hr />
            <div className="container-xl">
                <div className="row text-center align-items-center flex-row-reverse pb-6">
                    <div className="col-lg-auto ms-lg-auto">
                        <ul className="list-inline list-inline-dots mb-0">
                            <li className="list-inline-item ">
                                Copyright © 2024 <strong>Animaya</strong>. All rights reserved.
                            </li>
                            <li className="list-inline-item ">
                                <a
                                    role="button"
                                    onClick={() => document.body.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0}
                                    title="Aller en haut"
                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Aller en haut"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 15l6 -6l6 6" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                        <ul className="list-inline list-inline-dots mb-0">
                            <li className="list-inline-item">
                                <Link href="/" >
                                    <LazyLoadImage effect="blur" className="h-4-5 grayscallover card-link-rotate" src="/icons/logo.png" alt="Logo AM bannière" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </footer>);
}
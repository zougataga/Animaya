import { useCallback, useEffect, useState } from "react";
import {
    Fetch,
    FetchClient
} from '../../lib/Fetch';
import Quest from "./Quest";
export default function () {
    const
        { data, loading } = Fetch({
            url: '/api/captcha',
            method: 'POST'
        }),
        [load, setLoad] = useState(true),
        [open, setOpen] = useState(false),
        [error, setError] = useState(false),
        [active, setActive] = useState(false),
        solutionType = async (t) => {
            setLoad(true);
            try {
                const {
                    success,
                    open,
                    error
                } = await FetchClient({
                    url: '/api/captcha/verify',
                    method: 'POST'
                });
                if (success) setActive(true);
                else if (open && t) setOpen(true);
                else if (t) setError('Une erreur est survenue')
            } catch (error) {
                setError('Une erreur est survenue')
                console.error('Erreur inattendue :', error);
            }
            setLoad(false)
        };

    useEffect(() => setLoad(loading), [loading]);
    useEffect(() => {
        if (
            !loading &&
            (
                !data ||
                data && data.error
            )
        ) {
            setError('Une erreur est survenue')
        }
    }, [data]);
    useEffect(() => {
        solutionType()
    }, []);
    return <div role="button" tabIndex={0} className="captcha">
        <div className="d-flex align-items-center">
            <div className="me-3 h-5 w-5 d-flex align-items-center justify-content-center">
                {load ? <div className="spinner-border text-primary"></div> :
                    active ? <div className="text-success">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" STROKEWIDTH="2" stroke="currentColor" fill="none" strokelinecap="round" strokelinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" /><path d="M15 19l2 2l4 -4" /></svg>
                    </div> :
                        error ? <div className="text-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokewidth="2" stroke="currentColor" fill="none" strokelinecap="round" strokelinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13.252 20.601c-.408 .155 -.826 .288 -1.252 .399a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.19 7.357" /><path d="M22 22l-5 -5" /><path d="M17 22l5 -5" /></svg>
                        </div> :
                            <button
                                onClick={solutionType}
                                className="btn p-3" ></button>
                }
            </div>
            <div>
                <h3 className="m-0 p-0">Je ne suis pas un robot</h3>
                {error && <p className="p-0 m-0 text-danger">{error}</p>}
            </div>
        </div>
        {open && <div className="modal modal-blur d-flex justify-content-center align-items-center show" id="exampleModal" tabIndex={-1} style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <Quest
                        close={() => setOpen(false)}
                        success={async () => {
                            setLoad(true);
                            try {
                                const {
                                    success,
                                    error
                                } = await FetchClient({
                                    url: '/api/captcha/verify',
                                    method: 'POST',
                                    body: {
                                        questPassed: true
                                    }
                                });
                                if (success) setActive(true);
                                else setError('Une erreur est survenue')
                            } catch (error) {
                                setError('Une erreur est survenue')
                                console.error('Erreur inattendue :', error);
                            }
                            setLoad(false)
                        }}
                        error={(err = true) => setError(err)}
                    />
                </div>
            </div>
        </div>}
    </div>
}
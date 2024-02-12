import { useState } from "react";
import AgendaRow from "./Row";
import Calendrier from './Calendrier';
export default function ({
    agenda,
    calendrier,
    loading
}) {
    const
        [open, setOpen] = useState(null),
        j = new Date().getDay(),
        jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        getNextJ = (j) => jours[(j + 1) % 7],
        getPrevJ = (j) => jours[(j + 6) % 7];
    return (<div className='row mt-5' >
        <div className='container-fluid p-4 '>
            <div className="header">
                <h3 className="title">{agenda ? 'Agenda' : 'Nouveaux épisodes'.toUpperCase()}</h3>
                {!agenda && <a href="/catalogue/agenda" target="__blank" className="btn btn-outline-dark text-white">
                    VOIR L'AGENDA
                    <svg xmlns="http://www.w3.org/2000/svg" className="ms-1" width="17" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                </a>}
            </div>
            {/* {<AgendaRow titre={`Aujourd'hui`} data={calendrier?.[jours[j]]} loading={loading} />}
            {agenda && (() => {
                let a = [];
                for (let i = 0; i < jours.length; i++) {
                    const o = getNextJ(i === 0 ? j : j + i);
                    a.push(<AgendaRow titre={i === 0 ? 'Demain' : o} data={calendrier?.[o]} loading={loading} />)
                }
                return a
            })()} */}
            {agenda ? <><hr /><Calendrier rj={jours[j]} data={calendrier} loading={loading} /></> : <AgendaRow titre={`Aujourd'hui`} data={calendrier?.[jours[j]]} loading={loading} />}
            {(!agenda && !loading) && (open ? (<>
                {<AgendaRow titre={`Hier`} data={calendrier?.[getPrevJ(j)]} loading={loading} />}
                {<AgendaRow titre={getPrevJ(j - 1)} data={calendrier?.[getPrevJ(j - 1)]} loading={loading} />}
                <a href="/catalogue/agenda" target="__blank" className="mt-5 btn btn-outline-dark text-white w-full">VOIR L'AGENDA</a>
            </>) : <button type="button" className="mt-5 btn btn" onClick={() => setOpen(true)}>AFFICHER PLUS</button>)}
        </div>
    </div >)
}
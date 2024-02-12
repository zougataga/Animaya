import { useState } from "react";
export default function ({
    name,
    titre,
    handleInputChange,
    formData
}) {
    const [vu, setVu] = useState(null);
    return <div className="mb-3">
        <label className="form-label">
            {titre ?? (name === 'password' ? 'Mot de passe' : 'Confirmer le mot de passe')}
        </label>
        <div className="input-group input-group-flat">
            <input tabIndex={0} type={vu ? 'text' : 'password'} className="form-control bg-rdark"
                placeholder="········" aria-autocomplete="list"
                name={name}
                onChange={handleInputChange}
                value={formData[name]}
                autoComplete="off" />
            <span className="input-group-text border-start-0 bg-rdark">
                <a onClick={() => setVu(!vu)} role="button" className={`showpass${vu ? ' barrer' : ''}`}
                    title="Voir le mot de passe"
                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Voir le mot de passe"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="2"
                        stroke="currentColor" fill="none" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path
                            d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7">
                        </path>
                    </svg>
                </a>
            </span>
        </div>
    </div>
}
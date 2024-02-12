export function genId(count = 40) {
    const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
    let b = [];
    for (let i = 0; i < count; i++) {
        b[i] = a[(Math.random() * (a.length - 1)).toFixed(0)]
    }
    return b.join("")
}


export function generateInitials(name) {
    let initials = "";
    if (name && name.length >= 2) {
        initials = name.substring(0, 2).toUpperCase()
    } else if (name && name.length === 1) {
        initials = name.toUpperCase() + "_"
    } else {
        initials = "NA"
    }
    return initials;
}

export function getAvatar(existingUser, Get) {
    let
        url = Get('avatar'),
        rurl = "https://via.placeholder.com/100/151F2C/?text=" + generateInitials(existingUser.username);
    if (!url) url = rurl;
    else url = `/assets/user/${existingUser.id}/avatar.${url}`;
    return {
        url,
        reel: rurl,
        default: url == rurl
    }
}

export function getBanner(existingUser, Get) {
    let
        url = Get('banner'),
        rurl = '/assets/banner.png';
    if (!url) url = rurl;
    else url = `/assets/user/${existingUser.id}/banner.${url}`;
    return {
        url,
        default: url == rurl
    }
}


export function AccountDb(db, get, req, res, n) {
    const
        name = () => n ?? get({ id: "id", req, res }),
        v = n ? ({ username }) => username === name() : ({ id }) => id === name(),
        find = (db.get('users') ?? []).find(v);
    let valid = false;
    if (name() && find) {
        valid = find
    }
    return {
        valid,
        Get: (id, nodata) => valid && (() => {
            let d = (db.get('users') ?? []).find(v);
            if (d) {
                if (nodata) d = d?.[id];
                else d = d?.['data']?.[id]
            } else d = undefined;
            return d
        })(),
        Set: (id, value, nodata = false) => {
            if (!valid) return;
            const
                users = (db.get('users') ?? []),
                user = users.find(v);
            if (user) {
                if (!nodata && !user['data']) user['data'] = {};
                if (nodata) user[id] = value;
                else user['data'][id] = value
            }
            return db.set('users', users)
        },
        Remove: (id, nodata) => {
            if (!valid) return;
            const
                users = ((db.get('users') ?? [])),
                user = users.find(v);
            if (nodata) {
                if (user[id]) {
                    delete (user[id])
                }
            } else {
                if (user['data']?.[id]) {
                    delete (user['data'][id])
                }
            }
            return db.set('users', users)
        }
    }
}

export const Genres = [
    {
        genre: "Action",
        'desc': "Tout ce qui concerne les bastons et les grosses explosions !",
        'svg': (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-flame" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" /></svg>)
    },
    {
        genre: "Aventure",
        'desc': "Partez à l'aventure avec des héros qui espèrent réaliser leurs rêves !",
        'svg': (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-route" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" /><path d="M9 12v.01" /><path d="M6 13v.01" /><path d="M17 15l-4 -4" /><path d="M13 15l4 -4" /></svg>)
    },
    {
        genre: "Combats",
        'svg': (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-karate" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M3 9l4.5 1l3 2.5" /><path d="M13 21v-8l3 -5.5" /><path d="M8 4.5l4 2l4 1l4 3.5l-2 3.5" /></svg>)
    },
    {
        genre: "Comédie",
        desc: "Rigolez un bon coup avec de l'humour tarte à la crème ou des classiques de l'humour profond.",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-funimation" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M8 13h8a4 4 0 1 1 -8 0z" /></svg>)
    },
    {
        genre: "Drame",
        desc: "C'est l'heure d'aller en profondeur chercher cette dernière chance... avec passion !",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-broken" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /><path d="M12 6l-2 4l4 3l-2 4v3" /></svg>)
    }
    ,
    {
        genre: "Ecchi",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-tinder" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.918 8.174c2.56 4.982 .501 11.656 -5.38 12.626c-7.702 1.687 -12.84 -7.716 -7.054 -13.229c.309 -.305 1.161 -1.095 1.516 -1.349c0 .528 .27 3.475 1 3.167c3 0 4 -4.222 3.587 -7.389c2.7 1.411 4.987 3.376 6.331 6.174z" /></svg>)
    }
    ,
    {
        genre: "École",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-school" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>)
    }
    ,
    {
        genre: "Fantaisie",
        desc: "La magie et les monstres ne sont pas à la hauteur des aventures proposées ici !",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sword" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9z" /><path d="M6.5 11.5l6 6" /></svg>)
    }
    ,
    {
        genre: "Horreur",
        desc: `Une parfaite sélection de séries qui vous feront ressentir ce petit frisson dans le dos et crier devant l'écran : "Va pas par là !"`,
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-slice" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19l15 -15l3 3l-6 6l2 2a14 14 0 0 1 -14 4" /></svg>)
    }
    ,
    {
        genre: "Isekai",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>)
    }
    ,
    {
        genre: "Josei",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-gender-femme" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M12 14v7" /><path d="M7 18h10" /></svg>)
    }
    ,
    {
        genre: "Mystère",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-puzzled" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794" /><path d="M10 10h.01" /><path d="M14 8h.01" /><path d="M12 15c1 -1.333 2 -2 3 -2" /><path d="M20 9v.01" /><path d="M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>)
    }
    ,
    {
        genre: "Psychologique",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brain" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>)
    }
    ,
    {
        genre: "Quotidien",
        desc: "De la lenteur et de la stabilité ? C'est exactement mon style d'humeur.",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar-month" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>)
    }
    ,
    {
        genre: "Romance",
        desc: "Tu veux sentir battre ton cœur et tu crois à l'amour après l'amour ? Ici, c'est le bon endroit pour les romantiques.",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>)
    }
    ,
    {
        genre: "Seinen",
        desc: "Si tu te sens un peu plus adulte, ceci devrait correspondre à tes goûts.",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-confetti" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 5h2" /><path d="M5 4v2" /><path d="M11.5 4l-.5 2" /><path d="M18 5h2" /><path d="M19 4v2" /><path d="M15 9l-1 1" /><path d="M18 13l2 -.5" /><path d="M18 19h2" /><path d="M19 18v2" /><path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z" /></svg>)
    }
    ,
    {
        genre: "Shônen",
        desc: "Le travail d'équipe, la puissance de l'amitié et la réalisation de ses rêves : tous les fondamentaux sont là !",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-smile-beam" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" /><path d="M10 10c-.5 -1 -2.5 -1 -3 0" /><path d="M17 10c-.5 -1 -2.5 -1 -3 0" /><path d="M14.5 15a3.5 3.5 0 0 1 -5 0" /></svg>)
    }
    ,
    {
        genre: "Shôjo",
        desc: "Le printemps qui fleure bon la jeunesse, ce regard que tu as lancé à ton premier amour et ce sens aigu de la mode. Ces filles ont tous ces atouts.",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-heart" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 12a9 9 0 1 0 -8.012 8.946" /><path d="M9 10h.01" /><path d="M15 10h.01" /><path d="M9.5 15a3.59 3.59 0 0 0 2.774 .99" /><path d="M18.994 21.5l2.518 -2.58a1.74 1.74 0 0 0 .004 -2.413a1.627 1.627 0 0 0 -2.346 -.005l-.168 .172l-.168 -.172a1.627 1.627 0 0 0 -2.346 -.004a1.74 1.74 0 0 0 -.004 2.412l2.51 2.59z" /></svg>)
    }
    ,
    {
        genre: "Sports",
        desc: "Le ballon (et toutes les autres activités physiques), c'est la vie !",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pennant-2-filled" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a1 1 0 0 1 .993 .883l.007 .117v17h1a1 1 0 0 1 .117 1.993l-.117 .007h-4a1 1 0 0 1 -.117 -1.993l.117 -.007h1v-7.351l-8.406 -3.735c-.752 -.335 -.79 -1.365 -.113 -1.77l.113 -.058l8.406 -3.736v-.35a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor" /></svg>)
    }
    ,
    {
        genre: "Surnaturel",
        desc: "Gargouilles, fantômes et gobelins grouillent parmi d'autres créatures !",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ghost" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" /><path d="M10 10l.01 0" /><path d="M14 10l.01 0" /><path d="M10 14a3.5 3.5 0 0 0 4 0" /></svg>)
    }
    ,
    {
        genre: "Tournois",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tournament" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 20m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M6 12h3a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-3" /><path d="M6 4h7a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-2" /><path d="M14 10h4" /></svg>)
    }
    ,
    {
        genre: "Webcomic",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-book" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6l0 13" /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg>)
    }
    ,
    {
        genre: "Yaoi",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-gender-transgender" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M15 9l6 -6" /><path d="M21 7v-4h-4" /><path d="M9 9l-6 -6" /><path d="M3 7v-4h4" /><path d="M5.5 8.5l3 -3" /><path d="M12 16v5" /><path d="M9.5 19h5" /></svg>)
    }
    ,
    {
        genre: "Yuri",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-gender-femme" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M12 14v7" /><path d="M7 18h10" /></svg>)

    }
]
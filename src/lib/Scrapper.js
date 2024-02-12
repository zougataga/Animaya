import fetch from 'cross-fetch';
import { parse } from 'node-html-parser';
import UserAgent from 'user-agents';
import fs from 'fs';
import { Genres } from './Import';
const titreImgPath = './public/assets/titleImg';
export default class Scrapper {
    constructor({
        ip,
        agent = (new UserAgent({ deviceCategory: 'mobile' })).toString(),
        origin = 'https://animeflix.live/'
    }) {
        this.ip = ip;
        this.agent = agent;
        this.origin = origin;
    }

    Home = ({ agenda } = {}) => new Promise(resolve =>
        this.#getData({ url: this.#baseDomain })
            .then(async dom => {
                const
                    calendrier = {},
                    jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
                for (const div of dom.querySelectorAll('.fadeJours')) {
                    const
                        script = div.querySelector('script'),
                        jour = jours[Number(div.id)],
                        setCalendrier = (name, url, image, heure, probleme, lg, type) => {
                            if (!calendrier[jour]) calendrier[jour] = [];
                            const [id, saison, langue] = url.split('/');
                            calendrier[jour].push({
                                name,
                                id,
                                saison,
                                image: this.#getImage(image),
                                heure,
                                probleme,
                                langue,
                                type
                            });

                        },
                        document = { write: () => { } },
                        cartePlanningScan = (name, url, image, heure, probleme, langue) => setCalendrier(name, url, image, heure, probleme, langue, 'scan'),
                        cartePlanningAnime = (name, url, image, heure, probleme, langue) => setCalendrier(name, url, image, heure, probleme, langue, 'anime');
                    eval(script?.innerHTML);
                }

                // jours.forEach(e => calendrier[e].sort((a, b) => parseInt(a?.heure?.split(h)[0]) + parseInt(b?.heure?.split(h)[0])));

                const animes = {};
                if (!agenda) {
                    for (let div of dom.querySelectorAll('.scrollBarStyled.flex.flex-nowrap.overflow-y-hidden.mb-6.bg-slate-900.bg-opacity-70.rounded')) {
                        const script = div.querySelector('script');
                        if (
                            script?.innerHTML &&
                            (() => {
                                let result = '';
                                for (let line of (script?.innerHTML ?? '').split('\n')) {
                                    line = line.trim();
                                    if (line.startsWith('cartePepite("') ||
                                        line.startsWith('carteClassique("')
                                    ) {
                                        result = line;
                                    }

                                    if (result != '') {
                                        break
                                    }
                                }
                                return result
                            })()
                        ) {
                            const
                                setAnimes = (name, id, img, genre, type) => {
                                    if (!animes[type]) animes[type] = [];
                                    animes[type].push({
                                        name,
                                        id,
                                        image: this.#getImage(img),
                                        genre
                                    })
                                },
                                carteClassique = (name, url, img, genre) => setAnimes(name, url, img, genre, 'clasiques'),
                                cartePepite = (name, url, img, genre) => setAnimes(name, url, img, genre, 'pepites');
                            eval(script?.innerHTML);
                        } else {
                            div = div.querySelectorAll('.shrink-0');
                            const allRecent = [];
                            if (div?.length != 0) {
                                for (const rdiv of div) {
                                    const rname = this.#getRname(rdiv, 'a');
                                    allRecent.push({
                                        id: rname,
                                        image: this.#getImage(rname),
                                        name: this.#getText(rdiv, 'h1'),
                                        name2: this.#getText(rdiv, 'p')
                                    })
                                }
                                if (!animes['recent']) animes['recent'] = [];
                                animes['recent'].push(...allRecent)
                            }
                        }
                    }
                }

                let o;
                if (agenda) o = { calendrier };
                else o = {
                    cover: await this['Cover'](),
                    // : this.#getRandom(await this['Catalogue'](), 5),
                    calendrier,
                    animes
                };
                resolve(o)
            })
            .catch(err => {
                console.log(`[ERROR / SCRAPPER / HOME] -`, err);
                resolve({ error: true })
            })
    );

    Cover = ({ r, scan } = {}) => new Promise(async resolve => {
        try {
            let cover;
            if (scan) {
                const ca = r ?? this.#getRandom(await this['Catalogue'](), 20);
                for (let index = 0; index < ca.length; index++) {
                    const { id, type } = ca[index];
                    if (type.includes('Scans')) {
                        cover = await this['Info']({ id });
                        break
                    }
                }
            }

            if (!cover) cover = await this['Info']({
                id: this.#getRandom(
                    (fs.readdirSync(titreImgPath, { withFileTypes: true }))
                        .filter(dirent => dirent.isFile())
                        .map(dirent => dirent.name.split('.')[0])
                )[0]
            });
            resolve(cover)
            // : this.#getRandom(await this['Catalogue'](), 5),
        } catch (error) {
            console.log(`[SCRAPPER / COVER ] - `, error)
            resolve(false)
        }
    });

    Genres = ({ allt, animes, scans } = {}) => new Promise(async resolve => {
        try {
            let cover, all = {};

            if (allt) {
                all = []
            } else {
                cover = await this['Cover']({ scan: !animes });
            }

            let r = this.#getRandom(await this['Catalogue'](), 'all');
            if (animes) r = r.filter(({ type }) => (type.map(e => e.toLowerCase())).includes('anime'));
            else if (scans) r = r.filter(({ type }) => (type.map(e => e.toLowerCase())).includes('scans'));

            for (const { genre } of Genres) {
                const d = r.filter(({ genres }) => genres.includes(genre));
                if (d.length !== 0) {
                    if (allt) {
                        all.push(...d)
                    } else {
                        all[genre] = d;
                    }
                }
            }

            if (allt) {
                const item = [];
                for (const { id } of all) {
                    if (
                        !item.includes(id)
                    ) {
                        item.push(id)
                    }
                }
                const d = this.#getRandom(all.filter(({ id }) => item.includes(id)), 'all');
                if (d.length !== 0) all = d
            } else {
                const item = [];
                for (const [key, value] of Object.entries(all)) {
                    for (const { id } of value) {
                        if (
                            !item.includes(id) &&
                            cover.id !== id
                        ) {
                            item.push(id)
                        }
                    }
                    const d = this.#getRandom(value.filter(({ id }) => item.includes(id)), 25);
                    if (d.length !== 0) all[key] = d
                }
            }

            resolve({
                cover,
                all
            })
            // : this.#getRandom(await this['Catalogue'](), 5),
        } catch (error) {
            console.log(`[SCRAPPER / GENRES ] - `, error)
            resolve(false)
        }
    });

    Genre = ({ allt, animes, scans, genre } = {}) => new Promise(async resolve => {
        try {
            genre = genre.toLowerCase();
            genre = genre.charAt(0).toUpperCase() + genre.slice(1);
            let r = this.#getRandom(await this['Catalogue'](), 'all');
            if (animes) r = r.filter(({ type }) => (type.map(e => e.toLowerCase())).includes('anime'));
            else if (scans) r = r.filter(({ type }) => (type.map(e => e.toLowerCase())).includes('scans'));
            let cover;
            if (!allt) {
                cover = await this['Cover']({ r, scan: !animes });
                r = r.filter(({ id }) => id !== cover.id)
            }
            r = r.filter(({ genres }) => genres.includes(genre));
            resolve({
                cover,
                all: allt ? r : this.#getAllGenre(r, genre)
            })
        } catch (error) {
            console.log(`[SCRAPPER / GENRE ] - `, error)
            resolve(false)
        }
    });

    Catalogue = () => new Promise(resolve =>
        this.#getData({ url: this.#baseDomain + '/catalogue/listing_all.php', body: new URLSearchParams({ query: '' }) })
            .then(dom => {
                const all = [];
                for (const card of dom.querySelectorAll('.cardListAnime')) {
                    const ar = card._attrs.class.split(' ');
                    ar.shift();
                    const rname = this.#getRname(card.querySelector('.shrink-0'), 'a');
                    if (rname == '') return;
                    all.push({
                        id: rname,
                        image: this.#getImage(rname),
                        name: this.#getText(card, 'h1'),
                        name2: this.#getText(card, 'p'),
                        genres: ar.filter(e => !['anime', 'vostfr', 'vf', 'scans', 'film', 'autres', '', '-'].includes((e.split(',')[0] ?? e).toLowerCase().trim())).map(e => e.split(',')[0] ?? e),
                        type: ar.filter(e => ['anime', 'scans', 'film', 'autres'].includes((e.split(',')[0] ?? e).toLowerCase().trim())).map(e => e.split(',')[0] ?? e),
                        lang: ar.filter(e => ['vostfr', 'vf'].includes((e.split(',')[0] ?? e).toLowerCase().trim())).map(e => e.split(',')[0] ?? e)
                    })
                }
                resolve(all)
            })
            .catch(err => {
                console.log(`[ERROR / SCRAPPER / CATALOGUE] -`, err);
                resolve({ error: true })
            })
    );

    Search = ({ query = '' } = {}) => new Promise(async resolve => {
        try {
            let r = [];
            const
                rr = await this['Catalogue'](),
                r0 = [],
                ar = {
                    r1: [],
                    r2: [],
                    r3: [],
                    r4: []
                };
            query = query.toLowerCase();
            for (const a of rr) {
                const
                    add = (k) => ar[k].push(a),
                    name = (n, k) => {
                        n = n.toLowerCase();
                        if (n.startsWith(query)) r0.push(a);
                        else if (n.includes(query)) ar[k].push(a)
                    },
                    incl = (n, k) => {
                        n = a[n].map(e => e.toLowerCase());
                        if (n.includes(query)) ar[k].push(a)
                    };
                name(a.name, 'r1');
                name(a.name2, 'r2');
                incl('genres', 'r3');
                incl('lang', 'r4')
            }
            r = [].concat(...Object.values(ar));
            resolve({
                all: this.#unique(r),
                best: this.#unique(r0)
            })
        } catch (err) {
            console.log(`[ERROR / SCRAPPER / SEARCH] -`, err);
            resolve({ error: true })
        }
    });

    Random = () => new Promise(async resolve => {
        try {
            resolve(...(this.#getRandom(await this['Catalogue']())))
        } catch (err) {
            console.log(`[ERROR / SCRAPPER / RANDOM] -`, err);
            resolve({ error: true })
        }
    });

    Info = ({ id }) => {
        id = id.toLowerCase();
        return new Promise(resolve => id && (
            this.#getData({ url: this.#baseDomain + `/catalogue/${id}` })
                .then(async dom => {
                    const
                        mx3 = dom.querySelector('.mx-3.md\\:mx-10'),
                        h2 = (
                            mx3.querySelectorAll('h2.text-xl.text-white.text-xl.font-bold.uppercase.border-b-2.mt-5.border-slate-500')
                            ?? []
                        ).map(el => ({
                            name: el?.innerHTML,
                            description: (() => {
                                const nextPElement = el?.nextElementSibling;
                                if (
                                    nextPElement &&
                                    nextPElement.classList.contains('text-gray-300') &&
                                    nextPElement.classList.contains('text-xs') &&
                                    nextPElement.classList.contains('md:text-sm')
                                ) {
                                    return (nextPElement?.textContent)?.trim()
                                }
                            })()
                        })),
                        div = (
                            mx3.querySelectorAll('div.flex.flex-wrap')
                            ?? []
                        ).map(el => (el?.querySelector('script'))?.innerHTML);
                    if (h2.length !== div.length) {
                        console.log(`[ERROR / SCRAPPER / INFO2] -`, 'h2 length !== div length');
                        resolve({ error: true });
                        return
                    }

                    const saison = [];
                    h2.forEach(({ name, description }, i) => {
                        const
                            all = [],
                            script = div[i],
                            setPanneau = (name, url, type) => {
                                const [saison, lang] = url.split('/');
                                all.push({
                                    name,
                                    saison,
                                    lang,
                                    type
                                })
                            },
                            panneauAnime = (name, url) => setPanneau(name, url, 'anime'),
                            panneauScan = (name, url) => setPanneau(name, url, 'scan');
                        eval(script);
                        saison.push({
                            name,
                            description,
                            all
                        })
                    });
                    const allAS = (
                        dom.querySelectorAll('p.text-white.font-semibold.text-sm')
                        ?? []
                    ).map(e => this.#getText(e, 'a.font-normal.text-gray-400'));
                    let bandeannonce;
                    for (const script of dom.getElementsByTagName('script')) {
                        const scriptContent = script.innerHTML.trim();
                        if (scriptContent.includes(`$("#bandeannonce").attr("src",`)) {
                            const
                                document = '',
                                $ = (el) => {
                                    return {
                                        ready: (c) => c(),
                                        attr: (t, u) => u.includes('youtube') && (bandeannonce = {
                                            reel: u,
                                            cover: `https://www.youtube-nocookie.com/embed/${u.split('/')[4]}?${new URLSearchParams({
                                                autoplay: 1,
                                                controls: 0,
                                                rel: 0,
                                                showinfo: 0,
                                                mute: 1,
                                                modestbranding: 1,
                                                iv_load_policy: 3,
                                                playsinline: 1,
                                                start: 15,
                                                loop: 1,
                                                playlist: u.split('/')[4],
                                                enablejsapi: 1,
                                                origin: this.origin,
                                                widgetid: 1
                                            }).toString()}`
                                        })
                                    }
                                }

                            eval(scriptContent)
                        }
                    }
                    const genres = (this.#getText(dom, 'a.text-sm.text-gray-300.mt-2')).replaceAll(' - ', ', ');
                    resolve({
                        name: this.#getText(dom, '#titreOeuvre'),
                        name2: this.#getText(dom, '#titreAlter'),
                        similaire: await (async () => {
                            const
                                genresArray = genres.split(', '),
                                r = await this['Catalogue']();
                            let similaire = [];
                            for (const result of await Promise.all(genresArray.map(genre => (
                                this.#getRandom(
                                    r.filter(e => e.genres.includes(genre)), 'all')
                            ).slice(0, Math.ceil(25 / genresArray.length))
                            ))) {
                                similaire.push(...result)
                            }
                            similaire = similaire.slice(0, 25);
                            return similaire
                        })(),
                        titleImg: fs.existsSync(`${titreImgPath}/${id}.webp`),
                        id,
                        bandeannonce,
                        image: this.#getImage(id),
                        synopsis: this.#getText(dom, 'p.text-sm.text-gray-400.mt-2'),
                        genres,
                        avancement: allAS[0],
                        correspondance: allAS[1],
                        saison
                    })
                })
                .catch(err => {
                    console.log(`[ERROR / SCRAPPER / INFO] -`, err);
                    resolve({ error: true })
                }))
        )
    }

    Watch = ({ id, saison, lang, uall }) => {
        const
            type = saison,
            url = this.#baseDomain + `/catalogue/${id}/${type}/${lang}`;
        id = id.toLowerCase();
        return new Promise(resolve => (id && type && lang) && (
            this.#getData({ url })
                .then(async dom => {
                    const
                        info = await this['Info']({ id }),
                        titre = this.#getText(dom, 'h3#titreOeuvre'),
                        data = {
                            saisonTrouvee: '',
                            isAnime: false,
                            suivant: undefined,
                            precedent: undefined,
                            probleme: '',
                            js: {
                                ls: '',
                                fetch: []
                            }
                        };


                    for (let i = 0; i < (info.saison).length; i++) {
                        const { all } = (info.saison)[i];
                        for (let j = 0; j < all.length; j++) {
                            const item = all[j];
                            if (item.saison === type.toLowerCase()) {
                                data['saisonTrouvee'] = { i, j, ...item };
                                if (item.type == 'anime') data['isAnime'] = true
                            }
                            if (data['saisonTrouvee'] != '') {
                                break;
                            }
                        }
                    }

                    if (data['saisonTrouvee'] == '') {
                        resolve({ error: true });
                        return
                    }


                    if (!uall) {
                        let exist;
                        for (const { all } of info.saison) {
                            for (let i = 0; i < all.length; i++) {
                                const { saison } = all[i];
                                if (saison === type) {
                                    exist = {
                                        i,
                                        all
                                    };
                                    break
                                }
                            }
                        }
                        if (exist) {
                            data['precedent'] = (exist.all)[exist.i - 1];
                            data['suivant'] = (exist.all)[exist.i + 1];
                            if (data['suivant']) data['suivant'] = {
                                ...data['suivant'],
                                // ...await (this['Watch']({ uall: true, id, ...data['suivant'] }))
                            }
                        }
                    }

                    for (const script of dom.getElementsByTagName('script')) {
                        const
                            scriptContent = script.innerHTML,
                            src = script.getAttribute('src');

                        if (src) {
                            if (
                                src.startsWith('episodes.js?filever=')
                                // || src.startsWith('../../../../js/contenu/script_videos.js?filever=')
                            ) data['js']['fetch'].push(src)
                        }

                        if (!uall) {
                            if (
                                scriptContent.includes('#messagePage') &&
                                scriptContent != ''
                            ) {
                                const probleme = scriptContent.trim().split('\n').filter(e => e.includes('messagePage')).join('');
                                if (probleme) {
                                    let r;
                                    const $ = () => ({ html: (e) => r = e });
                                    eval(probleme);
                                    if (r) data['probleme'] = r
                                }
                            }
                        }

                        for (const call of scriptContent.split('\n')) {
                            const isCom = this.#getIsCommented(scriptContent, call);
                            if (
                                !isCom &&
                                !(scriptContent).includes('//check si episode existe')
                            ) {
                                if (
                                    (
                                        (call.includes('creerListe') && (!call.includes('newSPF') || call.includes('newSPF'))) ||
                                        call.includes('newSPF') ||
                                        (!call.includes('function') && (call.includes('finirListe') || call.includes('finirListeOP')))
                                    ) &&
                                    !call.trim().startsWith('//')
                                ) {
                                    data['js']['ls'] = (data['js']['ls']) + (call.trim() + '\n')
                                }
                            }
                        }
                    }

                    this.#getData({ url: url + '/' + data['js']['fetch'][0], dom: false })
                        .then(data2 => {
                            for (let rdata of data2.split('\n')) {
                                rdata = rdata.trim();
                                if (rdata.startsWith('var eps')) {
                                    const number = rdata.split('var eps')[1].split('=')[0].trim();
                                    data2 = data2
                                        .replace(`var eps${number}=`, `var eps${number} =`)
                                        .replace(`var eps${number}  =`, `var eps${number} =`);
                                    if (number == 'AS') {
                                        data2 = data2.replace(`var eps${number}`, `var eps${number.replaceAll('AS', '111111111')}`)
                                    }
                                }
                            }
                            data2 = data2.trim().replaceAll('\n\n', '');
                            const
                                js = ((regex = /var\seps(\d+)\s=\s(\[[\s\S]*?\])/g) => {
                                    const result = [];
                                    let match;
                                    while (match = regex.exec(data2)) {
                                        const matchResult = [];
                                        for (let match2 of match[2].split('\n')) {
                                            match2 = match2.trim()
                                            if (
                                                !match2.startsWith('//') &&
                                                match2 != '['
                                            ) {
                                                matchResult.push(match2
                                                    .replaceAll(',', '')
                                                    .replaceAll('[', '')
                                                    .replaceAll(']', '')
                                                    .replaceAll('"', '')
                                                )
                                            }
                                        }
                                        let lecteur = eval(matchResult.filter(e => e.trim() != ''));
                                        if (match[1] === '111111111') {
                                            lecteur = lecteur.map(e => '/catalogue/' + id + '/' + saison + '/' + lang + '/lecteur?d=' +
                                                encodeURIComponent(e
                                                    .replace('https://s22.anime-sama.fr/videos/', '')
                                                    .replace('.mp4', '')
                                                ));
                                        }
                                        if (matchResult?.length != 0) result.push({ number: match[1], lecteur })
                                    }
                                    return result.sort((a, b) => {
                                        const s = (a) => a === '111111111' ? 0 : a;
                                        return Number(s(a.number)) - Number(s(b.number))
                                    })
                                })(),
                                all = [],
                                total = js[0]?.lecteur?.length ?? 0,
                                getLecteur = (i) => {
                                    const forma = (e) => e.replaceAll("'", '').replaceAll('"', '');
                                    if (data['isAnime']) return js.map(({ lecteur }) => forma(lecteur[i]));
                                    else {
                                        let jsfind = js.find(({ number, lecteur }, i) => (Number(number) - 1) === i);
                                        jsfind = jsfind.lecteur.map(forma);
                                        return [
                                            (jsfind.map((o, j) => `https://s22.anime-sama.fr/s1/scans/${titre}/${i + 1}/${j + 1}.jpg`)),
                                            jsfind
                                        ]
                                    }

                                };
                            let
                                rd = -1,
                                retards = 0;
                            const
                                creerListe = (debut, fin) => {
                                    for (var i = debut; i <= fin; i++) {
                                        rd++;
                                        all.push({
                                            number: rd,
                                            reel: i,
                                            lecteur: getLecteur(rd)
                                        })
                                    }
                                },
                                newSP = (spe) => {
                                    retards++;
                                    rd++;
                                    all.push({
                                        number: rd,
                                        reel: spe,
                                        lecteur: getLecteur(rd)
                                    })
                                },
                                newSPF = (spe) => newSP(spe),
                                finirListeOP = (debut) => {
                                    for (var i = debut; i <= (877 + (total - retards)); i++) {
                                        rd++;
                                        all.push({
                                            number: rd,
                                            reel: i,
                                            lecteur: getLecteur(rd)
                                        })
                                    }
                                },
                                finirListe = (debut) => {
                                    for (var i = debut; i <= (total - retards); i++) {
                                        rd++;
                                        all.push({
                                            number: rd,
                                            reel: i,
                                            lecteur: getLecteur(rd)
                                        })
                                    }
                                };
                            if (data['js']['ls'] != '') eval(data['js']['ls']);
                            else {
                                for (let i = 0; i < total; i++) {
                                    all.push({
                                        number: i,
                                        reel: i + 1,
                                        lecteur: getLecteur(i)
                                    })
                                }
                            }

                            let obj = {
                                titre,
                                ...info,
                                probleme: data['probleme'],
                                isAnime: data['isAnime'],
                                saisonTrouvee: data['saisonTrouvee'],
                                suivant: data['suivant'],
                                precedent: data['precedent'],
                                all
                            };
                            if (uall) obj = {
                                isAnime: data['isAnime'],
                                saisonTrouvee: data['saisonTrouvee'],
                                all
                            };
                            const objvf = { ...obj, vf: true },
                                objnovf = { ...obj, vf: false };
                            if (!data['isAnime']) resolve(objvf);
                            else {
                                if (lang == 'vostfr') {
                                    this.#getData({ url: url.replace('/vostfr', '/vf') })
                                        .then(dom => {
                                            if (dom.querySelector('.w3-display-middle')) resolve(objnovf);
                                            else resolve(objvf)
                                        })
                                        .catch(() => resolve(objnovf))
                                } else if (lang == 'vf') resolve(objvf)
                            }
                        })
                        .catch(err => {
                            console.log(`[ERROR / SCRAPPER / WATCH 2] -`, err);
                            resolve({ error: true })
                        })
                })
                .catch(err => {
                    console.log(`[ERROR / SCRAPPER / WATCH] -`, err);
                    resolve({ error: true })
                }))
        )
    };

    #getAllGenre = (r, g, rd = true) => {
        if (rd) rd = this.#getRandom;
        else rd = (e) => e;
        const
            all = {},
            exist = new Set(),
            go = (genre,) => {
                const
                    d = r.filter(({ genres }) => genres.includes(genre)),
                    uniqueItems = [];
                for (const item of d) {
                    if (!exist.has(item.id)) {
                        exist.add(item.id);
                        uniqueItems.push(item)
                    }
                }
                if (uniqueItems.length !== 0) {
                    all[genre] = rd(uniqueItems, 'all')
                }
            };

        for (const { genre } of Genres) {
            if (g && genre === g) continue;
            go(genre)
        }

        if (g) {
            go(g)
        }

        return all;
    }
    #getRandom = (array, count = 1) => {
        if (count == 'all') count = array.length;
        const
            getRandomNumber = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min,
            shuffledArray = array.slice(),
            randomObjects = [];
        while (randomObjects.length < count && shuffledArray.length > 0) {
            randomObjects.push(shuffledArray.splice(getRandomNumber(0, shuffledArray.length - 1), 1)[0]);
        }
        return randomObjects
    };
    #unique = (arr) => {
        const uniqueValues = new Set();
        return arr.filter(value => {
            const valueType = typeof value;
            if (valueType === 'string' || valueType === 'object') {
                const jsonValue = JSON.stringify(value);
                if (!uniqueValues.has(jsonValue)) {
                    uniqueValues.add(jsonValue);
                    return true
                }
            }
            return false
        });
    }
    #getIsCommented = (script, call) => {
        const startIndex = script.indexOf(call);
        let isC = false;
        for (let k = startIndex; k >= 0; k--) {
            if (script.substring(k - 2, k) === '*/') {
                isC = false;
                break;
            }
            if (script.substring(k - 2, k) === '/*') {
                isC = true;
                break;
            }
            // if (script.substring(k - 2, k) === '//') {
            //     isC = true;
            //     break;
            // }
        };
        return isC
    };
    #getText = (dom, el, attr) => {
        el = dom?.querySelector(el);
        if (el) {
            el = el[0] ?? el;
            return attr ? el.getAttribute(attr) : el.innerText
        }
        return ''
    };
    #getRname = (dom, el) => {
        el = ((this.#getText(dom, el, 'href')).replace('https://anime-sama.fr/catalogue/', ''));
        return el.split('/')[0] ?? el;
    };
    #getImage = (rname) => `https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/${rname}.jpg`;
    #baseDomain = `https://anime-sama.fr`;
    #getData = ({ url, body, dom = true }) => {
        const {
            ip,
            agent
        } = this;
        return new Promise(async (resolve, reject) => {
            const opts = {
                headers: {
                    'User-Agent': agent,
                    'accept': 'application/json, text/plain, */*'
                }
            };
            if (ip) opts.headers['X-Forwarded-For'] = ip;
            if (body) {
                opts.method = 'POST';
                opts.body = JSON.stringify(body);
            }
            fetch(url, opts)
                .then(res => {
                    if (!res.ok) reject('Res OK');
                    return res.text();
                })
                .then(data => resolve(dom ? parse(data) : data))
                .catch(err => reject(err))
        })
    }
}
import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { get } from '../../../src/lib/Session';
import { AccountDb } from '../../../src/lib/Import';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        let name = req.body?.name;
        if (name) name = name.split('@')[1] ?? name;
        const {
            valid,
            Get,
            Set,
            Remove
        } = AccountDb(db, get, req, res, name);
        if (!valid) {
            res.status(500).json({ error: 'No log' });
            return;
        }
        const {
            type,
            key,
            data
        } = req.body;

        if (key.startsWith('list.')) {
            const
                t = key.split('.')[1],
                list = Get('list') ?? {},
                {
                    id,
                    saison,
                    lang
                } = data ?? {},
                v = el => (id && saison && lang) ?
                    el.id === id && el.saison === saison && el.lang === lang :
                    data && el.id === data.id;
            let arr = list[t] ?? [];
            if (type === 'set') {
                if (t === 'historique') {
                    const newd = [];
                    let exist = false;
                    for (const d of arr) {
                        if (!v(d)) {
                            newd.push(d)
                        } else exist = true
                    };
                    arr = newd;
                    arr.push(data)
                } else {
                    const existingIndex = arr.findIndex(v);
                    if (existingIndex !== -1) {
                        arr.splice(existingIndex, 1);
                    }

                    if (existingIndex === -1) {
                        arr.push(data)
                    }
                }

                if (arr.length === 30) {
                    arr.shift()
                }



                let r = { ...list, [t]: arr };
                if (!r[t] || r[t].length === 0) {
                    delete (r[t])
                }
                Set('list', r);
                res.json({ success: true })
            } else if (type === 'get') {
                const foundData = arr.find(v);
                if (foundData) {
                    res.json({ success: true, data: foundData })
                } else {
                    res.json(arr)
                }
            }
        }
    }
});

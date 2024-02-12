import { genId } from "./Import";
import db from "./db";

export function createUser({ ip, agent }) {
    const token = genId(100);
    db.pullDelete('tokens', d => d.ip === ip);
    db.push('tokens', {
        token,
        ip,
        agent: [agent]
    });
    return token
}

export function getUser({ ip, agent }) {
    const tokens = (db.get('tokens') ?? []);
    let r = tokens.find(d => d.ip === ip);
    if (!r) r = createUser({ ip, agent });
    else if (agent && !r.agent.includes(agent)) {
        const rt = [];
        for (const token of tokens) {
            if (token.ip === ip) {
                rt.push({
                    ...token,
                    agent: [...(token.agent ?? []), agent]
                })
            } else rt.push(token)
        }
        db.set('tokens', rt)
    }

    return r?.token
}

export function createId(req) {
    const
        timestamp = Date.now(),
        token = getUser(req),
        idObj = db.get('id') ?? {};
    idObj[token] = timestamp;
    db.set('id', idObj);
    return { [genId(60)]: true }
}

export function validId(req) {
    const
        token = getUser(req),
        find = (db.get('id') ?? {})[token];
    if (find && (
        43200000 // 12h
        - (Date.now() - find)
    ) > 0) {
        return { [genId(60)]: true }
    }
}
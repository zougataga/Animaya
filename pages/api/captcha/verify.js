import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { getUser } from '../../../src/lib/Id';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        const
            {
                questPassed
            } = req.body,
            token = getUser(req);
        if (token) {
            const
                o = {},
                cap = db.get('captcha') || {};
            if (questPassed) {
                if (!cap.deja) cap.deja = {};
                cap.deja[token] = true;
                cap[token] = true;
                db.set('captcha', cap);
                o.success = true
            } else if (cap[token] === false) {
                if (cap?.deja?.[token]) {
                    cap[token] = true;
                    db.set('captcha', cap);
                    o.success = true
                }
                else o.open = true
            } else o.open = true
            res.json(o);
            return
        }
        res.json({ error: true })
    }
})
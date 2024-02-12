import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { getUser } from '../../../src/lib/Id';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        const token = getUser(req);
        if (token) {
            const capObj = db.get('captcha') ?? {};
            capObj[token] = false;
            db.set('captcha', capObj);
            res.json({ success: true })
        }
    }
})
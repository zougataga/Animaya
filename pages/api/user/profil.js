import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { get } from '../../../src/lib/Session';
import {
    AccountDb,
    getAvatar,
    getBanner
} from '../../../src/lib/Import';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        let name = req.body?.name;
        if (!name) return;
        name = name.split('@')[1] ?? name;
        const
            {
                valid,
                Get
            } = AccountDb(db, get, req, res, name);
        let stats = false;
        if (valid) {
            stats = {
                ...valid,
                data: undefined,
                password: undefined,
                avatar: getAvatar(valid, Get),
                banner: getBanner(valid, Get),
                pseudo: Get('pseudo'),
                public: !Get('public'),
            }
        }
        res.status(200).json(stats)
    }
});

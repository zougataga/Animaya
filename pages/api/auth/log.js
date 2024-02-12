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
        const {
            valid,
            Get,
            Set,
            Remove
        } = AccountDb(db, get, req, res);
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
})
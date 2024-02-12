import fs from 'fs';
import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { get } from '../../../src/lib/Session';
import { AccountDb } from '../../../src/lib/Import';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
}
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
        if (!valid) {
            res.status(500).json({ error: 'No log' });
            return;
        }
        const {
            key,
            value
        } = req.body;

        if (
            !String(key) ||
            !String(value)
        ) {
            return
        }
        try {
            if (value) {
                if (key === 'avatar' || key === 'banner') {
                    const
                        nomDossier = './public/assets/user',
                        nowDossierUser = `${nomDossier}/${valid.id}`,
                        gtype = Get(key),
                        file = gtype && `${nowDossierUser}/${key}.${gtype}`,
                        type = value.split(';')[0].split('/')[1];
                    if (!fs.existsSync(nomDossier)) {
                        fs.mkdirSync(nomDossier)
                    }
                    if (!fs.existsSync(nowDossierUser)) {
                        fs.mkdirSync(nowDossierUser)
                    }
                    if (gtype && fs.existsSync(file)) {
                        fs.unlinkSync(file)
                    }
                    fs.writeFileSync(`${nowDossierUser}/${key}.${type}`, Buffer.from(value.split(',')[1], 'base64'), 'binary');
                    Set(key, type)
                } else Set(key, value)
            } else {
                Remove(key)
            }
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ error: true })
        }
    }
});

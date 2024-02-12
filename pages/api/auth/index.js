import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { Compare } from '../../../src/lib/Crypt';
import {
    get,
    set
} from '../../../src/lib/Session';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        const
            {
                username,
                password
            } = req.body,
            user = (db.get('users') ?? []).find((user) => user.username === username);
        let error;
        if (!username || !password) error = 'Des champs sont manquants.';
        else if (!user) error = 'Identifiant ou mot de passe invalide.';
        else if (!(Compare(password, user?.password))) error = 'Mot de passe invalide.';
        set({ id: 'id', data: user.id, req, res });
        let resData = {};
        if (error) resData = { error };
        else resData = ({
            success: true,
            id: get({ id: 'id', req, res })
        });
        res.status(200).json(resData);
    }
})
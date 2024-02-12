import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { Crypt } from '../../../src/lib/Crypt';
import {
    get,
    set
} from '../../../src/lib/Session';
import { getUser } from '../../../src/lib/Id';
import { genId } from '../../../src/lib/Import';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        const
            {
                username,
                password,
                password2
            } = req.body,
            token = getUser(req),
            cap = db.get('captcha') ?? {},
            existingUser = (db.get('users') ?? []).find((user) => user.username === username);
        let error;

        if (!username || !password || !password2) error = 'Des champs sont manquants.';
        else if (username.length < 3 || username.length > 20) error = 'Longueur du nom d\'utilisateur invalide, min : 3 / max : 20.';
        else if (password.length < 5 || password.length > 32) error = 'Longueur du mot de passe invalide, min : 5 / max : 32.';
        else if (password !== password2) error = 'Les mots de passe ne correspondent pas.';
        else if (existingUser) error = 'Ce nom d\'utilisateur existe déjà.';
        else if (!cap[token]) error = 'Vous êtes un robots ?';
        else {
            const {
                hash,
                err
            } = Crypt(password);
            if (err) error = err;
            else {
                const id = genId(50);
                db.push('users', {
                    id,
                    username,
                    password: hash,
                    timestamp: Date.now()
                });
                set({ id: 'id', data: id, req, res })
            }
        }

        if (cap[token]) {
            delete (cap[token]);
            db.set('captcha', cap)
        }

        let resData = {};
        if (error) {
            if (error.type) resData = { ...error };
            else resData = { error }
        }
        else resData = ({
            success: true,
            id: get({ id: 'id', req, res })
        });
        res.status(200).json(resData)
    }
})
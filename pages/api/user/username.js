import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import {
    set,
    get
} from '../../../src/lib/Session';
import { AccountDb } from '../../../src/lib/Import';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        const {
            valid,
            Get,
            Set
        } = AccountDb(db, get, req, res);
        if (!valid) {
            res.status(500).json({ error: 'No log' });
            return;
        }
        const
            { username } = req.body,
            now = Date.now(),
            existingUser = (db.get('users') ?? []).find((user) => user.username === username),
            rate = Get('rateTimestamp'),
            timeRate = 43200000;
        let error, success;
        if (!valid) error = "Vous n'êtes plus connecté.";
        else if (!username) error = 'Des champs sont manquants.';
        else if (username.length < 3 || username.length > 20) error = 'Longueur du nom d\'utilisateur invalide, min : 3 / max : 20.';
        else if (existingUser) error = 'Ce nom d\'utilisateur existe déjà.';
        else if (
            rate &&
            (
                timeRate
                - (now - rate)
            )
            > 0
        ) error = `Vous avez déjà changer votre nom d'utilisateur récemment||${now + timeRate - (now - rate)}`;
        else {
            Set('rateTimestamp', now);
            Set('username', username, true);
            success = "Nom d'utilisateur modifier avec succès"
        }

        let resData = {};
        if (error) resData = { error };
        else if (success) resData = { success };
        res.status(200).json(resData)

    }
});

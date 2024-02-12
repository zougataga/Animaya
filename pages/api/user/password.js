import withMiddleware from '../middleware';
import db from '../../../src/lib/db';
import { get } from '../../../src/lib/Session';
import { getUser } from '../../../src/lib/Id';
import { AccountDb } from '../../../src/lib/Import';
import {
    Compare,
    Crypt
} from '../../../src/lib/Crypt';
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
            {
                password,
                newpassword,
                newpassword2
            } = req.body,
            now = Date.now(),
            rate = Get('rateTimestampPassword'),
            timeRate = 43200000,
            token = getUser(req),
            cap = db.get('captcha') ?? {};
        let error, success;
        if (!valid) error = "Vous n'êtes plus connecté.";
        else if (!password || !newpassword || !newpassword2) error = 'Des champs sont manquants.';
        else if (!(Compare(password, valid?.password))) error = 'Mot de passe invalide.';
        else if (newpassword.length < 5 || newpassword.length > 32) error = 'Longueur du mot de passe invalide, min : 5 / max : 32.';
        else if (newpassword !== newpassword2) error = 'Les mots de passe ne correspondent pas.';
        else if (newpassword === password) error = 'Vous ne pouvez pas mettre à jour le même mot de passe';
        else if (!cap[token]) error = 'Vous êtes un robots ?';
        else if (
            rate &&
            (
                timeRate
                - (now - rate)
            )
            > 0
        ) error = `Vous avez déjà changer votre mot de passe récemment||${now + timeRate - (now - rate)}`;
        else {
            const {
                hash,
                err
            } = Crypt(newpassword);
            if (err) error = err;
            else {
                Set('rateTimestampPassword', now);
                Set('password', hash, true);
                success = true
            }
        }

        let resData = {};
        if (error) resData = { error };
        else if (success) resData = { success };
        res.status(200).json(resData)

    }
});


import Cipher from 'cipherdata';
const ci = new Cipher();

export function Crypt(s) {
    try {
        return { hash: btoa(JSON.stringify(ci.encryptData(s))) }
    } catch (err) {
        console.log(`[ALL / CRYPT] - `, err);
        return { err: 'Erreur de hachage du mot de passe.' }
    }
}

export function Compare(p, p2) {
    try {
        return ci.decryptData(Buffer.from(
            JSON.parse(
                atob(p2)
            ))).toString('utf8') === p
    } catch (erreur) {
        console.log(`[ALL / COMPARE] - `, erreur);
        return false
    }
}
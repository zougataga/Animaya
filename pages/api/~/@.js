import withMiddleware from '../middleware';
import cipherData from 'cipherdata';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: (req, res) => {
        try {
            res.json({
                success: true,
                data: btoa(JSON.stringify((new cipherData()).encryptData(atob(req.body['@']))))
            })
        } catch (error) {
            console.log(error);
            res.json({
                error: true
            })
        }
    }
})
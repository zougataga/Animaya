import withMiddleware from '../middleware';
import Scrapper from '../../../src/lib/Scrapper';
export default withMiddleware({
    method: 'POST',
    verifid: true,
    go: async (req, res) => {
        try {
            res.json(await (new Scrapper(req))[req.body.type ?? 'Home'](req.body))
        } catch (error) {
            res.json({ error: true })
        }
    }
})
import withMiddleware from '../middleware';
import {
    createId,
    validId
} from '../../../src/lib/Id';
export default withMiddleware({
    method: 'POST',
    go: (req, res) => {
        let valid = validId(req);
        if (!valid) valid = createId(req);
        res.json({ success: true })

    }
})
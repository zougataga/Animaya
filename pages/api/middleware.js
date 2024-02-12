import cipherData from 'cipherdata';
import db from '../../src/lib/db';
import { validId } from '../../src/lib/Id';
import { getUser } from '../../src/lib/Id';
export default function withMiddleware({
    method,
    verifid,
    rate = true,
    go
}) {
    return async (req, res) => {
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );

        let ip = (
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress
        ).replace('::ffff:', '');
        // if (
        //     ip === '127.0.0.1' ||
        //     ip === '::1'
        // ) {
        //     ip = undefined;
        // };
        req = {
            ip,
            agent: (req.headers['user-agents'] || req.headers['User-agents']),
            ...req
        };
        

        if (rate && !(() => {
            const
                limit = 50,
                interval = 5000,
                token = getUser(req),
                rate = db.get(`ratelimit`) ?? {};
            if (!token) return;
            let
                err = false,
                rateLimitTime = 30000,
                rateIp = rate[token];

            if (!rateIp) {
                rateIp = {
                    count: 0,
                    timestamp: Date.now()
                }
            }

            if (rateIp.rate?.count) rateLimitTime = rateLimitTime * (rateIp.rate.count);
            if (rateIp.rate?.timestamp && (Date.now() - rateIp.rate.timestamp < rateLimitTime)) {
                err = true
            } else {
                if (rateIp.rate?.timestamp) delete (rateIp.rate.timestamp);
                let count = rateIp.count;
                count += 1;
                if (Date.now() - rateIp.timestamp > interval) {
                    rateIp.timestamp = Date.now();
                    rateIp.count = 1;
                } else if (count > limit) {
                    delete (rateIp.count);
                    delete (rateIp.timestamp);
                    rateIp.rate = {
                        timestamp: Date.now(),
                        count: (rateIp.rate?.count ?? 1) + 1
                    };
                    err = true
                } else {
                    rateIp.count = count
                }
            }

            rate[token] = rateIp;
            db.set('ratelimit', rate);

            return !err
        })()) {
            res.status(429).json({ error: 'Rate limite' });
            return;
        }
        if (req.body) {
            try {
                req.body = JSON.parse(req.body)
            } catch (error) {
                // console.log('BODY PARSE ERROR : ', error);
            }

            try {
                if (verifid && !validId(req)) {
                    return
                }
            } catch (error) {
                console.log('[MIDDLEWARE / VERIFID] : ', error);
            }

            try {
                if (req.body['~']) {
                    req.body['~'] = ((new cipherData()).decryptData(Buffer.from(
                        JSON.parse(
                            atob(req.body['~'])
                        )))).toString('utf8');
                    req.body = JSON.parse(req.body['~']);
                    delete (req.body['~'])
                }
            } catch (error) {
                console.log('[MIDDLEWARE / DECRYPT] : ', error);
                return;
            }
        }

        if (
            (
                method.toLowerCase() === 'post' &&
                !req.body
            ) ||
            (
                method &&
                (
                    method.toLowerCase() !=
                    req.method.toLowerCase()
                )
            )
        ) {
            return
        }
        return go(req, res);
    };
}

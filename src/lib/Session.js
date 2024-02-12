import {
    setCookie,
    getCookie
} from 'cookies-next';
import cipherData from 'cipherdata';
const
    cipher = new cipherData(),
    initialize = (
        key = 'AnimayaSession',
        req, res
    ) => {
        let app = { req, res };
        if (typeof window !== 'undefined') {
            app = {};
        }

        function getAll() {
            try {
                let d = getCookie(key, app);
                if (d) {
                    d = Buffer.from(JSON.parse(d).data);
                    d = cipher.decryptData(d);
                    d = JSON.parse(d.toString('utf8'));
                }
                return d || {};
            } catch (error) {
                console.log(error);
                setAll({});
                return {};
            }
        }

        function setAll(obj) {
            try {
                let d = JSON.stringify(obj);
                d = cipher.encryptData(d);
                setCookie(key, d, app);
            } catch (error) {
                throw error;
            }
        }

        function getData(id, defaultData) {
            try {
                const fetched = getAll()[id];
                if (!fetched && defaultData) setData(id, defaultData);
                return fetched;
            } catch (error) {
                return;
            }
        }

        function setData(id, dataToSet) {
            try {
                const data = getAll();
                data[id] = dataToSet;
                setAll(data);
                return getData(id);
            } catch (error) {
                return;
            }
        }

        function removeData(id) {
            try {
                const data = getAll();
                delete data[id];
                setAll(data);
                return getData(id);
            } catch (error) {
                return;
            }
        }

        if (!getCookie(key, app)) {
            setAll({});
        }

        return {
            getAll,
            setAll,
            getData,
            setData,
            removeData
        };
    };

export function getAll(args = {}) {
    const
        { getAll } = initialize(args.key, args.req, args.res);
    const
        data = getAll(),
        all = [];
    for (let [key, value] of Object.entries(data)) {
        all.push({ id: key, data: value });
    }
    return all
}

export function deleteAll(args = {}) {
    const
        { setAll } = initialize(args.key, args.req, args.res);
    setAll({});
    return {}
}

export function get(args = {}) {
    const
        { getData } = initialize(args.key, args.req, args.res),
        { id } = args;
    if (!id) throw new TypeError('No id specified');
    if (typeof id !== 'string') throw new TypeError(`ID: '${id}' is not a string`);
    return getData(id)
}

export function set(args = {}) {
    const
        { setData } = initialize(args.key, args.req, args.res),
        {
            id,
            data
        } = args;
    if (!id) throw new TypeError('No id specified');
    if (typeof id !== 'string') throw new TypeError(`ID: '${id}' is not a string`);
    if (data === undefined) throw new TypeError(`Data @ ID: '${id}' is not specified`);
    return setData(id, data)
}

export function remove(args = {}) {
    const
        { removeData } = initialize(args.key, args.req, args.res),
        { id } = args;
    if (!id) throw new TypeError('No id specified');
    if (typeof id !== 'string') throw new TypeError(`ID: '${id}' is not a string`);
    return removeData(id)
}
import { useEffect, useState } from "react"
export async function FetchClient({
    url,
    method = 'GET',
    body,
}, setLoading) {
    const useFetch = async (url, opts) => {
        try {
            return await (await fetch(url, {
                ...opts,
                headers: {
                    'user-agents': (navigator ?? window.navigator).userAgent
                }
            })).json();
        } catch (error) {
            setLoading && setLoading(false);
            throw error
        }
    };
    try {
        let encrypted = Promise.resolve(JSON.stringify(body ?? {}));
        if (body) {
            encrypted = useFetch('/api/~/@', {
                method: 'POST',
                body: JSON.stringify({
                    '@': (body && btoa(JSON.stringify(body)))
                })
            }).then(({ data }) => JSON.stringify({ '~': data }));
        }
        const data = await useFetch(url, { method, body: await encrypted });
        setLoading && setLoading(false);
        return data;
    } catch (error) {
        setLoading && setLoading(false);
        console.error(error)
    }
}

export function Fetch(opts) {
    const
        [data, setData] = useState(null),
        [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!loading) return;
        const fetchData = async () => {
            setData(await FetchClient(opts, setLoading))
        };
        fetchData();
    }, [loading]);
    return {
        data,
        loading,
        setData,
        refetch: (body = {}) => {
            opts.body = { ...opts.body, ...body };
            setLoading(true);
        }
    };
}
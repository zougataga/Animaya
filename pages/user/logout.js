import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../../src/components/Loader';
import { remove } from '../../src/lib/Session';
export default function () {
    const
        router = useRouter(),
        { goto } = router.query;
    useEffect(() => {
        remove({ id: 'id' });
        router.push(goto ?? '/')
    }, [])
    return <Loader />
} 
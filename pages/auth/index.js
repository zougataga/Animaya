import { useRouter } from 'next/router';
import AuthP from '../../src/components/Auth';
import { FetchClient } from '../../src/lib/Fetch';
export function Auth() {
    const router = useRouter();
    return <AuthP
        router={router}
        submit={async (e, formData, setFormData) => {
            setFormData(e => ({ ...e, loading: true }));
            try {
                const data = await FetchClient({
                    url: '/api/auth',
                    method: 'POST',
                    body: formData,
                });
                if (data) {
                    if (!data.error) {
                        window.location.href = (router.query.goto || '/')
                    } else {
                        setFormData(e => ({ ...e, error: data.error, loading: !e.loading }))
                    }
                } else {
                    setFormData(e => ({ ...e, error: 'Échec de la connexion.', loading: !e.loading }))
                }
            } catch (error) {
                setFormData(e => ({ ...e, error: 'Échec de la connexion. (Erreur inattendue)', loading: !e.loading }))
                console.error('Erreur inattendue :', error);
            }
        }}
    />
}

Auth.getInitialProps = () => ({
    title: 'Auth',
    off: true
});

export default Auth
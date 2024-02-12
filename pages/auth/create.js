import { useRouter } from 'next/router';
import Auth from '../../src/components/Auth';
import { FetchClient } from '../../src/lib/Fetch';
export function Create() {
    const router = useRouter();
    return <Auth
        router={router}
        password2={true}
        captcha={true}
        submit={async (e, formData, setFormData) => {
            setFormData(e => ({ ...e, loading: !e.loading }));
            try {

                const data = await FetchClient({
                    url: '/api/auth/create',
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
                    setFormData(e => ({ ...e, error: 'Échec de la création du compte.', loading: !e.loading }))
                }
            } catch (error) {
                setFormData(e => ({ ...e, error: 'Échec de la création du compte. (Erreur inattendue)', loading: !e.loading }))
                console.error('Erreur inattendue :', error);
            }
        }}
    />
}

Create.getInitialProps = () => ({
    title: 'Create',
    off: true
});

export default Create
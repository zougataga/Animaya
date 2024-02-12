import Link from 'next/link';
export default function () {
    return (<div className='d-flex align-items-center justify-content-center' style={{ paddingTop: '50px', height: '70%' }}>
        <div className='empty'>
            <div className='empty-header'>404</div>
            <p className='empty-title'>Page introuvable</p>
            <p className='empty-subtitle text-secondary' style={{ maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}>
                Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.
            </p>
            <div className='empty-action'>
                <Link tabIndex={0} href='/' className='btn btn-outline-primary'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='icon' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                        <line x1='5' y1='12' x2='19' y2='12'></line>
                        <line x1='5' y1='12' x2='11' y2='18'></line>
                        <line x1='5' y1='12' x2='11' y2='6'></line>
                    </svg>
                    Accueil
                </Link>
            </div>
        </div>
    </div>)
}
export const getStaticProps = () => ({
    props: {
        title: 'Page introuvable',
        off: true
    },
})
export default function () {
    return (<div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '70%' }}>
            <div className='page page-center'>
                <div className='empty'>
                    <div className='empty-icon'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='icon' width='24' height='24' viewBox='0 0 24 24'
                            strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <circle cx='12' cy='12' r='9' />
                            <line x1='9' y1='10' x2='9.01' y2='10' />
                            <line x1='15' y1='10' x2='15.01' y2='10' />
                            <path d='M9.5 15.25a3.5 3.5 0 0 1 5 0' />
                        </svg>
                    </div>
                    <p className='empty-title'>Une erreur est survenue</p>
                    <p className='empty-subtitle text-secondary'>
                        Veuillez réessayer ultérieurement. </p>
                </div>
            </div>
        </div>)
}
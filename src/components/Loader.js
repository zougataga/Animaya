export default function ({ navbar, spe }) {
    const load = (<div className='d-flex align-items-center justify-content-center'
        style={{ height: (navbar ? '85' : '100') + '%' }}>
        <div className="spinner-grow spinner-grow-xl text-primary" role="status"></div>
    </div>);
    if (spe) return load;
    return (<div
        className='position-fixed start-0 h-full w-full'
        style={{
            top: navbar ? '60px' : '0px',
            zIndex: 2303030,
        }}
    >
        {load}
    </div>)
}
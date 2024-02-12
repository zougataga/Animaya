import Allt from "../../src/components/Catalogue/Allt";
function Scans() {
    return <Allt
        type='Genres'
        titre='Scans'
        t='scans'
        url='/catalogue/scans'
    />
}
Scans.getInitialProps = () => ({
    title: 'Scans',
    navtransparent: true
});
export default Scans
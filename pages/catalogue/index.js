import Allt from "../../src/components/Catalogue/Allt";
function Catalogue() {
    return <Allt
        type='Genres'
        titre='Catalogue'
        url='/catalogue'
    />
}
Catalogue.getInitialProps = () => ({
    title: 'Catalogue',
    navtransparent: true
});
export default Catalogue
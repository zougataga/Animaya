import Allt from "../../src/components/Catalogue/Allt";
function Animes() {
    return <Allt
        type='Genres'
        titre='Animes'
        t='animes'
        url='/catalogue/animes'
    />
}
Animes.getInitialProps = () => ({
    title: 'Animes',
    navtransparent: true
});
export default Animes
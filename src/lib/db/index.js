import zougatagaDb from 'zougatagadb';
export default new zougatagaDb({
    cryptData: false,
    path: './src/lib/db/data.json' // .db
})
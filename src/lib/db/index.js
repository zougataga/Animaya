import zougatagaDb from 'zougatagadb';
export default new zougatagaDb({
    cryptData: false,
    path: process.cwd() + '/src/lib/db/data.json' // .db
})

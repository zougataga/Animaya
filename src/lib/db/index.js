import zougatagaDb from 'zougatagadb';
export default new zougatagaDb({
    cryptData: false,
    path: __dirname+'\\src\\lib\\db\\data.json' // .db
})

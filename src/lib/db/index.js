import zougatagaDb from 'zougatagadb';
import fs from 'fs';
let path = process.cwd() + '/src/lib/db';
if (!fs.existsSync(path)) {
    path = './data.json'
} else {
    path += '/data.json'
}
export default new zougatagaDb({
    cryptData: false,
    path
})

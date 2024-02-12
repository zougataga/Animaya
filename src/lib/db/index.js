import zougatagaDb from 'zougatagadb';
import path from 'path';

export default new zougatagaDb({
    cryptData: false,
    path: path.join(process.cwd(), 'src', 'lib', 'db', 'data.json')
})

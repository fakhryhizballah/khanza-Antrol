const { icd10 } = require('./models');
async function createPasien() {
    let pasienData = await icd10.findOne();
    console.log(pasienData)
}
createPasien()
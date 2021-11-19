const db = require("../data/db");
const ClientDao = require("../data/ClientDao");

async function createSampleClients() {
    try {
        await db.connect();
        await ClientDao.create({
            name: "hubert",
            email: "leo@slack.com"
        })
    } catch (err) {
        console.log(err);
    }
}

createSampleClients();
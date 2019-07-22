const tomlRequire = require('toml-require').install({ toml: require('toml') })
const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 1337;
const settings = require('./config.toml')
const db = settings.db;

const classic_connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    database: db.database,
    password: db.password
});

classic_connection.on('connect', (msg) => {
    console.log("connected");
    app.get('/items', (req, res) => {
        classic_connection.query(
            'SELECT RewChoiceItemId1, RewChoiceItemId2, RewChoiceItemId3, RewChoiceItemId4, RewChoiceItemId5, RewChoiceItemId6 FROM classic.quest_template',
            (err, results, fields) => {
                let itemSet = new Set()

                results.forEach(reward => {
                    Object.keys(reward).forEach(value => {
                        itemSet.add(reward[value])
                    })
                })

                classic_connection.query(
                    'SELECT	name, Quality, ItemLevel, InventoryType, entry, RequiredLevel FROM classic.item_template WHERE Quality > 1 && InventoryType > 0;',
                    (err, results, fields) => {
                        const items = results.filter(item => {
                            return !itemSet.has(item.entry)
                        })
                        res.send(items);
                    });
            });
    });
})

classic_connection.on('error', (err) => {
    console.log("connected error");
    app.get('/items', (req, res) => {
        res.send(require('./items.json'))
    })
})

app.use(express.static('dist/EPGPbro'));
app.listen(port, () => console.log(`Running on port ${port}!`))

// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app)
// .listen(443, function () {
//   console.log('Example app listening on port 443! Go to https://localhost:443/')
// })
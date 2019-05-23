const express = require('express');

const server = express();
const db = require('./data/accounts-model.js')

//Middleware
server.use(express.json())

// Routing
server.get('/', (req, res) => {
    res.send(`
    <h2>
        WEBDB1 
    </h2>`)
})

server.get('/api/accounts', async (req, res) => {
    try{
        const accountList = await db.find();
        res.status(200).json(accountList)
    } catch (error) {
        res.status(500).json({
            message: 'The account list could not be retrieved.'
        })
    }
})

module.exports = server;
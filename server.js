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

server.get('/api/accounts/:id', async (req, res) => {
    try{
        const id = req.params.id
        const account = await db.findById(id)
        res.status(200).json(account)
    } catch (error) {
        res.status(500).json({
            message:"Account could not be found."
        })
    }
})

server.post('/api/accounts', async (req, res) => {
    try{
        const newAccount = req.body
        const addedAccount = await db.add(newAccount)
        res.status(201).json(addedAccount)
    } catch (error){
        res.status(500).json({
            message:"The account could not be added to the database."
        })
    }
})

server.delete('/api/accounts/:id', async (req, res) => {
    try{
        const id = req.params.id
        const removedAccount = await db.remove(id)
        if(removedAccount > 0){
            res.status(202).json({
                message:"Target destroyed"
            })
        } else {
            res.status(404).json({
                message:"The account with the specified id does not exist"
            })
        }
        } catch (error) {
            res.status(500).json({
                message:"Unable to delete"
            })
    } 
})

server.put('/api/accounts/:id', async (req, res) => {
    try{
        const updatedAccount = await db.update(req.params.id, req.body)
        if(updatedAccount){
        res.status(200).json(updatedAccount) 
    } else {
        res.status(404).json({
            message:"id not found"
        })
    }
    } catch (error) {
        res.status(500).json({
            message: "error updating"
        })
    }
})

module.exports = server;
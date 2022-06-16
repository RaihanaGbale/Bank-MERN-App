const express = require("express")
const Transaction = require('./Transaction')
const app = express.Router
const path = require('path');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/bankDB", { useNewUrlParser: true })

const api = require("./server/routes/api")
app.use('/', api)


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.get('/transactions', function (req, res) {
    Transaction.find({}).exec(function (err, transactions) { res.send(transactions) })
})

app.get('/breakdown', function (req, res) {
    Transaction.aggregate([
        {$group: { _id: '$category', sum: { $sum: "$amount" }}
        }
    ]).exec(function (err, transactions) {
        res.send(transactions)})
})

app.put('/transactions', function (req, res) {
    let newTransactionData = new Transaction(req.body)
    const newTransaction = new Transaction({
        amount: newTransactionData.amount,
        vendor: newTransactionData.vendor,
        category: newTransactionData.category,
    })
    newTransaction.save()
    res.send(newTransaction)
})

app.delete('/transactions', function (req, res) {
    Transaction.deleteTransaction(req.params.id)
    res.send()
})


const port = 8080
app.listen(port, function () { console.log(`running on port ${port}`) })

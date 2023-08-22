const express = require('express');
const app = express();
const mysql = require('mysql');
const _ = require('lodash');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(3000, () => {
    console.log('Nodejs is running on port 3000!')
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
    port: "3306"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//post create
app.post('/api/create', (req, res) => {
    // var id = _.get(req,['body','id']);
    var name = _.get(req, ['body', 'name']);
    var last = _.get(req, ['body', 'last']);


    try {
        if (name && last) {
            db.query('INSERT INTO tb_dealer (name,last) values (?,?) ', [
                name, last
            ], (err, resp, field) => {
                if (resp) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'sucess',
                    })
                } else {
                    console.log('ERR 2: bad sql')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad:sql ',
                        Log: 1
                    })
                }
            })
        } else {
            console.log('ERR 1: Invalid request')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad:Invalid request',
                Log: 1
            })
        }
    }
    catch {
        console.log('ERR :0', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})
//get
app.get('/api/getall', (req, res) => {
    try {
        db.query("SELECT * FROM tb_dealer", [],
            (err, data, fil) => {
                if (data && data[0]) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'sucess',
                        Result: data
                    })
                } else {
                    console.log('Not found data')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad Not found data',
                        Log: 1
                    })
                }
            })
    } catch (error) {
        console.log('ERR :0', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

//getbyid
app.get('/api/getbyid', (req, res) => {
    var id = _.get(req, ["body", "id"]);

    try {
        if (id) {
            db.query("SELECT * FROM tb_dealer WHERE id = ?", [
                id
            ],
                (err, data, fil) => {
                    if (data && data[0]) {
                        return res.status(200).json({
                            RespCode: 200,
                            RespMessage: 'sucess',
                            Result: data
                        })
                    } else {
                        console.log('ERR 1 Not found data')
                        return res.status(200).json({
                            RespCode: 400,
                            RespMessage: 'bad Not found data',
                            Log: 1
                        })
                    }
                })
        } else {
            console.log('ERR 2 invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad invalid data',
                Log: 2
            })
        }

    } catch (error) {
        console.log('ERR :0', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})
//update
app.put('/api/updatename', (req, res) => {

    var id = _.get(req, ["body", "id"]);
    var name = _.get(req, ["body", "name"]);
    var last = _.get(req, ["body", "last"]);
    try {
        if (id && name && last) {
            db.query('update tb_dealer SET name = ?, last = ? WHERE id = ?', [
                name, last, parseInt(id)
            ], (err, resp, fil) => {
                if (resp) {
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'sucess',
                    })
                } else {
                    console.log('ERR :2 Update fail')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: Update fail',
                        Log: 2
                    })
                }
            })
        }
        else {
            console.log('ERR :1 invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: invalid data',
                Log: 1
            })
        }
    }
    catch (error) {
        console.log('ERR :0', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})
//delete
app.delete('/api/deletebyid', (req, res) => {
    var id = _.get(req, ["body", "id"]);

    try {
        if (id) {
            
            db.query('delete from tb_dealer WHERE id = ?', [
            parseInt(id)
            
            ], (err, resp, fil) => {
                if (resp.affectedRows == 1) {
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'sucess',
                    })
                } else {
                    console.log('ERR :2 Update fail')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: Update fail',
                        Log: 2
                    })
                }
            })
        }
        else {
            console.log('ERR :1 invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: invalid data',
                Log: 1
            })
        }
    }
    catch (error) {
        console.log('ERR :0', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

module

module.exports = app;
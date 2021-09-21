const express = require('express')
const app = express()
const config = require('../config/config')
const router = express.Router()
const mysql = require('mysql2');
require('dotenv').config()
const { registrValidation, loginValidation } = require('../validation')
const bcrypt = require('bcrypt')
const conn = mysql.createConnection(config)
const jwt = require('jsonwebtoken')

router.post('/registr', async (req, res) => {
  //validation
  const { error } = registrValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //new user
  const regName = req.body.regName
  const regEmail = req.body.regEmail
  const regPasswd = await bcrypt.hash(req.body.regPasswd, 10)
  const sql = `insert into users (name, email, password) values (?, ?, ?)`

  try {
    conn.query(await sql, [regName, regEmail, regPasswd], (error, result) => {
      if (error) console.log(error);
      return false
    })
  } catch (error) {
    res.status(400).send(error)
  }
})


router.post('/login', async (req, res) => {
  //validation
  const { error } = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //login user
  const logName = req.body.logName
  const sql = `select * from users where name =?` 
  const isLoggedIn = false

  try {
    conn.query(await sql, [logName], (error, result) => {
      if(result.length == 0) {
        res.send('now such user');
      }
      else {
        const bcryptPasswd = result[0].password
        // console.log(req.body.logPasswd);

        if(bcrypt.compareSync(req.body.logPasswd, bcryptPasswd)) {
          jwt.sign({ id: result[0].password.id }, 'token', (error, token) => {
            res.send({
              token: token,
              isLoggedIn: true
            })
          })
        }
        else {
          res.send('not allowed')
        }
      }
    })
  } catch (error) {
    res.status(400).send(error) 
  }
})




module.exports = router
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
const uuid = require('uuid')
const { mailer } = require('../service/mail-service')

router.post('/registr', async (req, res) => {
  //validation
  const { error } = registrValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //new user
  const regName = req.body.regName
  const regEmail = req.body.regEmail
  const regPasswd = await bcrypt.hash(req.body.regPasswd, 10)
  const sqlInsert = `insert into users (name, email, password) values (?, ?, ?)`
  const sqlTryFind = `select * from users where email =?`
  const activationLink = uuid.v4()

  try {
    conn.query( await sqlTryFind, regEmail, (error, result) => {
      if (!result.length == 0) {
        console.log('alredy exist');
      }
      else {
        conn.query(sqlInsert, [regName, regEmail, regPasswd], (error, result) => {
          if (error) console.log(error);
          return false
        })
        mailer(regEmail, activationLink)
      }
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
      console.log(result);
      if(result.length == 0) {
        res.send('now such user');
      }
      else {
        const bcryptPasswd = result[0].password

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
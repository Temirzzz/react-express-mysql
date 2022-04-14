const express = require('express')
const app = express()
const config = require('../config/config')
const router = express.Router()
const mysql = require('mysql2');
const conn = mysql.createConnection(config)
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const isLoggedIn = false


router.post('/adminPanel', async (req, res) => {

  const admin = req.body.adminName
  const password = req.body.adminPasswd
  const sqlCompare = `select * from admin` 

  try {
    conn.query( await sqlCompare, (error, result) => {
      if(result[0].admin === admin && result[0].password === md5(password)) {
        jwt.sign({ result }, process.env.JWT_TOKEN, { expiresIn: '30s' },  (error, token) => {
          res.send({
            token: token,
            isLoggedIn: true
          })
        })
      }
      else {
        res.redirect('login')
      }
    })
  } catch (error) {
    console.log(error);
  }
})

module.exports = router

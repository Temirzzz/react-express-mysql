const express = require('express')
const app = express()
const config = require('../config/config')
const router = express.Router()
const mysql = require('mysql2');
const conn = mysql.createConnection(config)
const md5 = require('md5')




router.post('/adminPanel', async (req, res) => {

  const admin = req.body.adminName
  const password = req.body.adminPasswd
  const sqlCompare = `select * from admin` 


  console.log(admin);
  console.log(md5(password));

  try {
    conn.query( await sqlCompare, (error, result) => {
      if(result[0].admin === admin && result[0].password === md5(password)) {
        res.send('succsess')
      }
      else {
        res.send(result)

      }
    })
  } catch (error) {
    console.log(error);
  }
})

module.exports = router

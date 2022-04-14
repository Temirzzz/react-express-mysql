const express = require('express')
const app = express()
const config = require('../config/config')
const router = express.Router()
const mysql = require('mysql2')
require('dotenv').config()
const { registrValidation, loginValidation, postsValidation } = require('../validation')
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
  const sqlInsert = `insert into users (name, email, password) values (?, ?, ?)`
  const sqlTryFind = `select * from users where email =?`
  const activationLink = uuid.v4()

  try {
    conn.query( await sqlTryFind, regEmail, (error, result) => {
      if (!result.length == 0) {
        res.send('alredy exist')
      }
      else {
        conn.query(sqlInsert, [regName, regEmail, regPasswd], (error, result) => {
          if (error) console.log(error)
          return false
        })
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
        res.send('now such user')
      }
      else {
        const bcryptPasswd = result[0].password

        if(bcrypt.compareSync(req.body.logPasswd, bcryptPasswd)) {
          jwt.sign({ result }, process.env.JWT_TOKEN, { expiresIn: '30s' },  (error, token) => {
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

router.get('/posts', async (req, res) => {
  const sql = `select * from posts` 

  try {
    conn.query( await sql, (error, result) => {
      if(result.length == 0) {
        return
      }
      else {
        res.send(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
})



router.post('/posts', async (req, res) => {
  // validation
  const { error } = postsValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  const posts = req.body.posts
  const title = req.body.title

  const sqlPosts = `insert into posts (title, post) values (?, ?)`

  try {
    conn.query(await sqlPosts, [title, posts], (error, result) => {
      if(error) throw error
      return
    })
  } catch (error) {
    res.status(400).send(error) 
  }
})

module.exports = router
const joi = require('@hapi/joi')

const registrValidation = data => {
  const schema = joi.object({
    regName: joi.string().min(4).max(50).required(),
    regPasswd: joi.string().min(6).max(100).required(),
    regEmail: joi.string().min(6).max(100).required()
  })
  
  return  schema.validate(data)
}

const loginValidation = data => {
  const schema = joi.object({
    logName: joi.string().min(4).max(50).required(),
    logPasswd: joi.string().min(6).max(100).required()
  })
  
  return  schema.validate(data)
}

module.exports.registrValidation = registrValidation
module.exports.loginValidation = loginValidation
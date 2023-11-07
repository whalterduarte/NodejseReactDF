const { checkSchema } = require('express-validator')
const { signin } = require('../controllers/AuthController')
module.exports = {
    signup: checkSchema({
      name: {
        trim:true,
        notEmpty:true,
        isLength:{
          options:{min: 2}
        },
        errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
      },
      email:{
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'E-Mail inválido'
      },
      password:{
        isLength:{
          options:{min: 2}
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
      },
      state: {
        notEmpty:true,
        errorMessage: 'Estado não preenchido'
      }
    }),
    signin: checkSchema({
      email:{
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'E-Mail inválido'
      },
      password:{
        isLength:{
          options:{min: 2}
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
      }
    })
}

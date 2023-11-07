const { checkSchema } = require('express-validator')
const { signin } = require('../controllers/AuthController')
module.exports = {
    editAction: checkSchema({
      token: {
        notEmpty: true
      },
      name: {
        optional: true,
        trim:true,
        notEmpty:true,
        isLength:{
          options:{min: 2}
        },
        errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
      },
      email:{
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'E-Mail inválido'
      },
      password:{
        optional: true,
        isLength:{
          options:{min: 2}
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
      },
      state: {
        optional: true,
        notEmpty:true,
        errorMessage: 'Estado não preenchido'
      }
    }),
}

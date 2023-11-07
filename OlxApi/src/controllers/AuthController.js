const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/User')
const State = require('../models/State')

module.exports = {
  //Login
  signin: async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      res.json({error: errors.mapped()})
      return
    }
    const data = matchedData(req)

     //Validando o email
    const user= await User.findOne({email:data.email})
    if(!user){
      res.json({error: 'E-mail e/ou senha errados!'})
      return
    }

    //Validadndo a senha
    const match = await bcrypt.compare(data.password, user.passwordHash)
    if(!match){
      res.json({error: 'E-mail e/ou senha errados!'})
      return
    }
  
    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10)
  
    user.token = token
    await user.save(

      res.json({token, email: data.email})
    )
  },
  //Cadastro
  signup: async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      res.json({error: errors.mapped()})
      return
    }

    const data = matchedData(req)

    //Verifica se email ja existe
    const user = await User.findOne({
      email: data.email
    })
    if(user){
      res.json({
        error: {email:{msg: 'E-mail ja existe'}}
      })
      return
    }

    // Verifica se o  estado existe
    if(mongoose.Types.ObjectId.isValid(data.state)){
    const stateItem = await State.findById(data.state)
    if(!stateItem){
      res.json({
        error: {state:{msg: 'Estado não exite'}}
      })
      return
    }
  } else {
    res.json({
      error: {state:{msg: 'Código de estado invalido'}}
    })
    return
  }
  const passwordHash = await bcrypt.hash(data.password, 10)
  const payload = (Date.now() + Math.random()).toString()
  const token = await bcrypt.hash(payload, 10)

  const newUser = new User({
    name: data.name,
    email: data.email,
    passwordHash,
    token,
    state: data.state
  })
  await newUser.save()

  res.json({token})
  }
}
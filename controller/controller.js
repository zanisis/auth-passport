// const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

let controller = {}

controller.register = (req,res,next)=>{
  let hash = passwordHash.generate(req.body.password)
  let data = user ({
    username : req.body.username,
    password : hash,
    role : req.body.role
  })

  data.save((err)=>{
    if(err) throw err
    res.send('Register Success')
  })
}

controller.login = (req,res,next)=>{
  let obj = req.user
  if(obj.hasOwnProperty("message")) {
    res.send(obj.message)}
  else {
    let token = jwt.sign({
      username : obj.username,
      role : obj.role
    },'secret',{
      expiresIn : '1h'
    })
    res.send(token)
  }
}

controller.findall = (req,res,next)=>{
  // res.send(req.headers.token)
  jwt.verify(req.headers.token, 'secret', (err,decode)=>{
    if(err) throw err
    if(decode.role == 'admin'){
      user.find({},(err,users)=>{
        if(err) throw err
        res.send(users)
      })
    } else {
      res.send(`You Don't Have Authorized`)
    }
  })
}

module.exports = controller;
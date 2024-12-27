const express = require('express')
const UserService = require('../service/user.service')
const router = express.Router()


router.post('/signup', (req, res)=>{
    UserService.signUp(req.body).then((data)=>{
        res.status(201).send({msg:"user created successfully", user: data})
    }).catch((error)=>{
        res.status(400).send({msg:"error creating user", error: error})
    })
})
router.post('/login', (req, res)=>{
    UserService.login(req.body).then((data)=>{
        res.status(201).send({msg:"user fetched successfully", user: data})
    }).catch((error)=>{
        res.status(400).send({msg:"error fetching user", error: error})
    })
})


module.exports = router
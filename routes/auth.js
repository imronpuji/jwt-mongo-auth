const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')

const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    
    const {error} = registerValidation(req.body)

    if(error) return res.status(400).json({error : error.details[0].message})
    
    const isEmailExist = await User.findOne({email : req.body.email})
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    
    if(isEmailExist) return res.status(400).json({error : "Email already exist"})

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        role : 'admin',
        password
    })

    try {
        const savedUser = await user.save();
        res.json({error : null, data: savedUser});
    } catch (error){
        res.status(400).json({error})
    }
})

router.post('/login', async (req, res) => {
    
    const {error} = loginValidation(req.body)
    
    if(error) return res.status(400).json({error : error.details[0].message})

    const user = await User.findOne({email : req.body.email})

    if(!user) return res.status(400).json({error : "Email is wrong"})

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) return res.status(400).json({error : 'password is wrong'})

    const token = jwt.sign(
        {
            email : req.body.email,
            role : user.role,
            id : user._id
        } ,
        'secret'
    )
    res.header("auth-token", token).json({
        error: null,
        data: {
          token,
        },
      });
})

module.exports = router
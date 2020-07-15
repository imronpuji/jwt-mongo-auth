const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Provinsi = require('../model/Provinsi')
const Kota = require('../model/Kota')
const Sekolah = require('../model/Sekolah')
const bcrypt = require('bcryptjs')
const User = require('../model/User')
router.post('/add-provinsi', async (req, res) => {
    const provinsi = new Provinsi({
        name : req.body.name,
        NP : req.body.NP
    })

    try {
        const savedProvinsi = await provinsi.save()
        res.json({error : null, saved : savedProvinsi})
    } catch (error){
        res.status(400).json({error})
    }
} )

router.get('/get-provinsi', async (req, res) => {
    Provinsi.find({}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })
})

router.delete('/delete-provinsi/:id', async (req, res) => {
    Provinsi.deleteOne({_id:req.params.id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })
})

router.put('/update-provinsi/:id', async (req, res) => {
    
    try {
        const savedProvinsi = await Provinsi.findOneAndUpdate({_id:req.params.id},req.body)
        res.json({error : null, saved : savedProvinsi})
    } catch (error){
        res.status(400).json({error})
    }
    
})

router.post('/search-provinsi', async (req, res) => {
    if(req.body.name.length >= 1 ){
        await Provinsi.find({name : {$regex : '.*' + req.body.name + '.*'}}, (err, respon) => {
            if(err) return res.json({err : err})
            res.json({result : respon})
        })
    } 
  
})


// api kota

router.post('/add-kota', async (req, res) => {
    const kota = new Kota({
        name : req.body.name,
        NK : req.body.NK,
        _idProvinsi : req.body._idProvinsi
    })

    try {
        const savedKota = await kota.save()
        res.json({error : null, saved : savedKota})
    } catch (error){
        res.status(400).json({error})
    }
} )

router.get('/get-kota', async (req, res) => {
    Kota.find({}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })
})

router.delete('/delete-kota/:id', async (req, res) => {
    Kota.deleteOne({_id:req.params.id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })
})

router.put('/update-kota/:id', async (req, res) => {
    
    try {
        const savedKota = await Kota.findOneAndUpdate({_id:req.params.id},req.body)
        res.json({error : null, saved : savedKota})
    } catch (error){
        res.status(400).json({error})
    }
    
})

router.post('/search-Kota', async (req, res) => {
    if(req.body.name.length >= 1 ){
        await Kota.find({name : {$regex : '.*' + req.body.name + '.*'}}, (err, respon) => {
            if(err) return res.json({err : err})
            res.json({result : respon})
        })
    } 
  
})


// api sekolah

router.post('/add-sekolah', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    
    const sekolah = new Sekolah({
        name : req.body.name,
        email : req.body.email,
        NPSN : req.body.NPSN,
        _idKota : req.body._idKota
    })

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password,
        role : 'sekolah'
    })

    try {
        const savedSekolah = await sekolah.save()
        const savedUser = await user.save()

        res.json({error : null, saved : savedSekolah, savedUser})
    } catch (error){
        res.status(400).json({error})
    }
} )

router.get('/get-sekolah', async (req, res) => {
    Sekolah.find({}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })
})

router.delete('/delete-sekolah/:id', async (req, res) => {
    Sekolah.deleteOne({_id:req.params.id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })
})

router.put('/update-sekolah/:id', async (req, res) => {
    
    try {
        const savedSekolah = await Sekolah.findOneAndUpdate({_id:req.params.id},req.body)
        res.json({error : null, saved : savedSekolah})
    } catch (error){
        res.status(400).json({error})
    }
    
})

router.post('/search-sekolah', async (req, res) => {
    if(req.body.name.length >= 1 ){
        await Sekolah.find({name : {$regex : '.*' + req.body.name + '.*'}}, (err, respon) => {
            if(err) return res.json({err : err})
            res.json({result : respon})
        })
    } 
  
})


module.exports = router
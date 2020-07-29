
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Kelas = require('../model/Kelas')
const Siswa = require('../model/Siswa')
const User = require('../model/User')
const Ujian = require('../model/Ujian')
const Soal = require('../model/Soal')
const Nilai = require('../model/Nilai')
// api sekolah

router.post('/add-kelas', async (req, res) => {

    const kelas = new Kelas({
        name : req.body.name,
        _idSekolah : req.body._idSekolah,
    })

    try {
        const savedKelas = await kelas.save()
        res.json({error : null, saved : savedKelas})
    } catch (error){
        res.status(400).json({error})
    }
} )

router.get('/get-kelas/:id', async (req, res) => {
    Kelas.find({_idSekolah : req.params.id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })
})

router.delete('/delete-kelas/:id', async (req, res) => {
    Kelas.deleteOne({_id:req.params.id}, (err, respon) => {
            if(err) return res.json({err : err})
             res.json({result : respon})
    })
})

router.put('/update-Kelas/:id', async (req, res) => {
    
    try {
        const savedKelas = await Kelas.findOneAndUpdate({_id:req.params.id},req.body)
        res.json({error : null, saved : savedKelas})
    } catch (error){
        res.status(400).json({error})
    }
    
})

router.post('/search-Kelas', async (req, res) => {
    if(req.body.name.length >= 1 ){
        await Kelas.find({name : {$regex : '.*' + req.body.name + '.*'}}, (err, respon) => {
            if(err) return res.json({err : err})
            res.json({result : respon})
        })
    } 
  
})


// api siswa

router.post('/add-siswa', async (req, res) => {
 
   
    try {
     
        const savedSiswa = await Siswa.insertMany(req.body)
        res.json({error : null, saved : {savedSiswa}})
    } catch (error){
        res.status(400).json({error})
    }

} )

router.post('/register-siswa', async (req, res) => {
    
    try {
     
        const savedUser = await User.insertMany(req.body)
        // const savedUser = await user.save()
        res.json({error : null, saved : savedUser})
    } catch (error){
        res.status(400).json({error})
    }

} )

router.get('/get-siswa/:id', async (req, res) => {
    const id = req.params.id
    Siswa.find({_idKelas : id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })

} )

router.get('/get-email-siswa/:id', async (req, res) => {
    const id = req.params.id
    Siswa.find({email : id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })

} )

router.delete('/delete-siswa/:id', async (req, res) => {
    
    Siswa.deleteOne({_id:req.params.id}, (err, respon) => {
        if(err) return res.json({err : err})
         res.json({result : respon})
})
} )

router.put('/edit-siswa/:id', async (req, res) => {
    try {
        const savedSiswa = await Siswa.findOneAndUpdate({_id:req.params.id},req.body)
        res.json({error : null, saved : savedSiswa})
    } catch (error){
        res.status(400).json({error})
    }
} )





// api ujian

router.post('/add-ujian/:id', async (req, res) => {
 
    const ujian = new Ujian({
        
        name : req.body.name,
        tgl : req.body.tgl,
        waktu : req.body.waktu,
        lama_ujian : req.body.lama_ujian,
        _idKelas : req.params.id

    })
    console.log(ujian)
   
    try {
        const savedUjian = await ujian.save()
        res.json({error : null, saved : {savedUjian}})
    }   catch (error){
        res.status(400).json({error})
    }

} )



router.get('/get-ujian/:id', async (req, res) => {
    const id = req.params.id
    Ujian.find({_idKelas : id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })

} )

router.delete('/delete-ujian/:id', async (req, res) => {
    
    Ujian.deleteOne({_id:req.params.id}, (err, respon) => {
        if(err) return res.json({err : err})
         res.json({result : respon})
})
} )


// api soal



router.post('/add-soal/:id', async (req, res) => {
 
    const soal = new Soal({
        
        soal : req.body.soal,
        _idUjian : req.params.id,
        A : req.body.A,
        B : req.body.B,
        C : req.body.C,
        D : req.body.D,
        bobot_soal : req.body.bobot_soal,
        jawaban_benar : req.body.jawaban_benar
    })

   
    try {
        const savedSoal = await soal.save()
        res.json({error : null, saved : {savedSoal}})
    }   catch (error){
        res.status(400).json({error})
    }

} )

router.get('/get-soal/:id', async (req, res) => {
    const id = req.params.id

    console.log(id)

    Soal.find({_idUjian : id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })

} )

// nilai

router.post('/add-nilai/:id', async (req, res) => {
 
    const nilai = new Nilai({

        _idUjian : req.params.id,
        _idSiswa : req.body._idSiswa,
        nilai : req.body.nilai,

    })

   
    try {
        const savedNilai = await nilai.save()
        res.json({error : null, saved : {savedNilai}})
    }   catch (error){
        res.status(400).json({error})
    }

} )

router.get('/get-nilai/:id', async (req, res) => {
    const id = req.params.id

    Nilai.find({_idSiswa : id}, (err, respon) => {
        if(err) return res.json({err : err})
        res.json({result : respon})
    })

} )


module.exports = router
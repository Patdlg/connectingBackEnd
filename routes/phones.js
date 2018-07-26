const express = require('express')
const router = express.Router()
const Phone = require('../models/Phone')

//RESTful API

//get phone
router.get('/', (req, res) => {
    // res.send('phone')
    Phone.find()
        .then(phones => {
            return res.status(200).json(phones); //200: The request was fulfilled.                       
        })
        .catch(e => next(e))

});

//get one phone
router.get('/:id', (req, res) => {
    Phone.findById(req.params.id)
        .then(phone => {
            if (!phone) return res.status(404)
            return res.status(200).json(phone);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});

//post new phone
router.post('/', (req, res) => {
    Phone.create(req.body)
        .then(phone => {
            return res.status(201).json(phone)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
                        
})

//edit a phone
router.put('/:id', (req, res, next) => {
    Phone.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(phone => {
            return res.status(202).json(phone)
        }).catch(err => {
            return res.status(404).json(err);
          
        });

})
//delete a phone

router.delete('/:id', (req, res, next) => {
    Phone.findByIdAndRemove(req.params.id)
        .then(phone => {
            res.redirect('/')
        
        })
        .catch(e=>console.log(e))
});

module.exports = router
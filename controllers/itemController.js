const router = require('express').Router();

const Item = require('../db').import('../models/item');
// const validateSession = require('../middleware/validate-session');



//GET ALL MY ITEMS
// Gives "unhandled rejection" but still works

    router.get('/', (req, res) => {
        Item.findAll()
            .then(item => res.status(200).json(item))
            .catch(err => res.status(500).json({ error: err}))
    })



//POST A NEW ITEM TO LIST

router.post('/', (req, res) =>{
    const itemFromRequest = {
        nameOfItem: req.body.nameOfItem,
        quantity: req.body.quantity
    }
    Item.create(itemFromRequest)
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
})

//UPDATE AN EXISTING POST
// only needed if changing quantity
//works, but always returns [1] instead of returning the updated item like {"nameOfItem": "banana", "quantity": 2}

router.put('/:id', (req, res) => {
    Item.update(req.body, { where: { id: req.params.id }})  
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({error: err})) 
  })

//DELETE AN EXISTING USER

router.delete('/:id', (req, res) => {
    Item.destroy({
        where: { id: req.params.id }
    })
    .then(item => res.status(200).json(item))
    .catch (err => res.status(500).json({error: err}))
})

module.exports = router;
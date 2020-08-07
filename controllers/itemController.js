const router = require('express').Router();

const Item = require('../db').import('../models/item');
const validateSession = require('../middleware/validate-session');



//GET ALL MY ITEMS

    router.get('/', validateSession, (req, res) => {
        let userid = req.user.id
        Item.findAll({
            where: { owner: userid }
        })
            .then(item => res.status(200).json(item))
            .catch(err => res.status(500).json({ error: err}))
    })



//POST A NEW ITEM TO LIST

router.post('/', validateSession, (req, res) =>{
    const itemFromRequest = {
        nameOfItem: req.body.nameOfItem,
        quantity: req.body.quantity,
        owner: req.user.id
    }
    Item.create(itemFromRequest)
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
})

//UPDATE AN EXISTING POST
// only needed if changing quantity

router.put('/:id', validateSession, (req, res) => {
    Item.update(req.body, { where: { id: req.params.id }})  
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({error: err})) 
  })

//DELETE AN EXISTING USER

router.delete('/:id', validateSession, (req, res) => {
    Item.destroy({
        where: { id: req.params.id }
    })
    .then(item => res.status(200).json(item))
    .catch (err => res.status(500).json({error: err}))
})

module.exports = router;
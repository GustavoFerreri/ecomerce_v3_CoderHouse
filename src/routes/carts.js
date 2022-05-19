const { Router } = require ('express');
const router = Router();
const { addCart} = require ('../controllers/task.controller')

// router.get('/', getAll)
router.get('/', (req, res)=>{
    res.render('productWeb')
})

// router api/productos
// habilitado para usr y adm
// router.get('/:id?', allInOne) 


// habilitados solo para adm
router.post('/', addCart)
// router.put('/:id?', updateProduct)
// router.delete('/:id?', deleteProduct)

// router api/carritos

module.exports = router; 
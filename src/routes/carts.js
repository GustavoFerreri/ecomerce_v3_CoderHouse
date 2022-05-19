const { Router } = require ('express');
const router = Router();
const { addCart, showCart, deleteItemCart} = require ('../controllers/task.controller')


router.get('/', showCart);

// habilitado para usr y adm
// router.get('/:id?', allInOne) 


// habilitados solo para adm
router.post('/', addCart)
// router.put('/:id?', updateProduct)
router.delete('/:id?', deleteItemCart)

// router api/carritos

module.exports = router; 
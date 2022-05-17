const { Router } = require ('express');
const router = Router();
const { allInOne, getAll, createProduct, updateProduct, deleteProduct} = require ('../controllers/task.controller')

router.get('/', getAll)
router.get('/product', (req, res)=>{
    res.render('productWeb')
})

// router api/productos
// habilitado para usr y adm
router.get('/:id?', allInOne) 


// habilitados solo para adm
router.post('/', createProduct)
router.put('/:id?', updateProduct)
router.delete('/:id?', deleteProduct)

// router api/carritos

module.exports = router; 
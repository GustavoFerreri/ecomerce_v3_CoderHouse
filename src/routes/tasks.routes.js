const { Router } = require ('express');
const router = Router();
const { getAll } = require ('../controllers/task.controller')

router.get('/', getAll)

module.exports = router; 
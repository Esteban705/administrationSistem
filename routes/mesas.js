const { Router } = require("express");
const { check } = require("express-validator");
const { createNewTable, tablesAvailable, deleteTable } = require("../controllers/createNewTable");
const validations = require("../middlewares/validarCampos");
const router = Router();


router.post('/new/table',
createNewTable);

router.get('/',
tablesAvailable
)

router.put('/delete/table',
deleteTable)





    module.exports = router;
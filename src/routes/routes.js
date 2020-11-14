const express = require('express');
const ClienteController = require ('../controllers/ClienteController.js');
const router = express.Router();

router.post('/clientes', ClienteController.Insert);
router.get('/test', (req, res) => {
    res.send('Testando');
})

module.exports = router;

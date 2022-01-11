const { Router } = require('express');

const router = Router();

const ClientController = require('./app/controllers/ClientController');
const StoreController = require('./app/controllers/StoreController');
const PlanController = require('./app/controllers/PlanController');

/* Clients */
router.get('/clients', ClientController.index);
router.get('/clients/:id', ClientController.show);
router.post('/clients', ClientController.store);
router.put('/clients/:id', ClientController.update);
router.delete('/clients/:id', ClientController.delete);

/* Stores */

router.get('/stores', StoreController.index);
router.get('/stores/:id', StoreController.show);
router.post('/stores', StoreController.store);
router.delete('/stores/:id', StoreController.delete);

/* Plans */

router.get('/plans', PlanController.index);
router.post('/plans/', PlanController.store);

module.exports = router;

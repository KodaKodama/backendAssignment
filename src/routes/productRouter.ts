import { Router } from "express";
const {isAuthenticated, isSeller} = require('../middlewares/auth');
const {createProductController} = require('../controllers/createProductController');
const router = Router();

router.post('/create', isAuthenticated, isSeller, createProductController);
// router.get('/get/all', getAllProducts);

module.exports = router;
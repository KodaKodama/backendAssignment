import { Router } from "express";
const {isAuthenticated, isSeller} = require('../middlewares/auth');
const {createProductController, getAllProducts} = require('../controllers/productController');
const router = Router();

router.get('/get/all', getAllProducts);
router.post('/create', isAuthenticated, isSeller, createProductController);

module.exports = router;
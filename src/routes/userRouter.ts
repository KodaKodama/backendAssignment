import { Router } from "express";
const {isAuthenticated} = require('../middlewares/auth');
import { userLogin, userRegister, userLogout, editUser } from "../controllers/userController";

const router = Router();

// User registration
router.post('/register', userRegister);

// User login
router.post('/login', userLogin);

// User logout
router.get('/logout', userLogout); 

router.put('/edit', isAuthenticated, editUser);


module.exports = router;
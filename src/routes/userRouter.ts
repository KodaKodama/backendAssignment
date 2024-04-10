import { Router } from "express";
import { userLogin, userRegister, userLogout } from "../controllers/userController";

const router = Router();

// User registration
router.post('/register', userRegister);

// User login
router.post('/login', userLogin);

// User logout
router.get('/logout', userLogout); 


module.exports = router;
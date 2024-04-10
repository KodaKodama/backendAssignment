import { Router } from "express";
import { userLogin, userRegister } from "../controllers/userController";

const router = Router();

// User registration
router.post('/register', userRegister);

router.post('/login', userLogin);


module.exports = router;
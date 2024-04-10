import { Router } from "express";
import { getUser } from "../controllers/user";
const router = Router();

// User registration
router.post('/register', (request, response) => {
    response.send('resigter')
});

// // User login
// router.post('/login', ()=> console.log('login')
// );

module.exports = router;
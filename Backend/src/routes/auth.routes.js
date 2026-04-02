const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authmiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/get-me", authmiddleware.authUser, authController.getMe);

router.get("/logout", authController.logoutUser);


module.exports = router;
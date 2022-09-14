const router = require('express').Router();
const PaintingController = require('../controllers/PaintingController');
const UserController = require('../controllers/UserController')
// const authentication = require("../middlewares/authentication")

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-sign-in', UserController.googleSignIn)
router.get('/favourites', PaintingController.getPainting)
// router.use(authentication)
// router.use('/products', ProductRouter);
// router.use('/histories', HistoryRouter)

module.exports = router;

const router = require('express').Router();
const PaintingController = require('../controllers/PaintingController');
const UserController = require('../controllers/UserController')
const authentication = require("../middlewares/authentication")
const {authorization, ownedAuthorization} = require('../middlewares/authorization')
const IndexController = require('../controllers/IndexController')
const MidTransController = require('../controllers/MidTransController')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-sign-in', UserController.googleSignIn)
router.use(authentication)
router.post("/owned/:id", PaintingController.addOwned)
router.get('/owned', ownedAuthorization, PaintingController.getOwned)
// router.post('/charge', IndexController.bankTransfer)
router.post('/token', MidTransController.getToken)
// router.use(authentication)
// router.use('/products', ProductRouter);
// router.use('/histories', HistoryRouter)

module.exports = router;

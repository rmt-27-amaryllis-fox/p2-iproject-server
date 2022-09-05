const EmployeeController = require("../controller/employe");
const userController = require("../controller/user");
const router = require("express").Router();
const auth = require("../middleware/auth");
const inventoryController = require("../controller/inventory");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(auth);
router.get("/employees", EmployeeController.getEmployee);
router.post("/employees", EmployeeController.AddEmployee);
router.delete("/employees/:id", EmployeeController.DeleteEmployee);
router.put("/employees/:id", EmployeeController.EditEmployee);
router.get("/employees/:id", EmployeeController.FindByPkEmployee);

router.get("/inventories", inventoryController.getInventory);
router.post("/inventories", inventoryController.AddInventory);
module.exports = router;

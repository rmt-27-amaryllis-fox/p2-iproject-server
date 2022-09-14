const EmployeeController = require("../controller/employe");
const userController = require("../controller/user");
const router = require("express").Router();
const auth = require("../middleware/auth");
const inventoryController = require("../controller/inventory");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(auth);
router.get("/employees", EmployeeController.getEmployee);
router.post(
  "/employees",
  upload.single("imageUrl"),
  EmployeeController.AddEmployee
);
router.delete("/employees/:id", EmployeeController.DeleteEmployee);
router.put(
  "/employees/:id",
  upload.single("imageUrl"),
  EmployeeController.EditEmployee
);
router.get("/employees/:id", EmployeeController.FindByPkEmployee);

router.get("/inventories", inventoryController.getInventory);
router.get("/categories", inventoryController.getCategory);
router.post("/inventories", inventoryController.AddInventory);
router.put("/inventories/:id", inventoryController.editInventory);
router.delete("/inventories/:id", inventoryController.deleteInventory);
router.get("/inventories/:id", inventoryController.FindByPkInventory);
module.exports = router;

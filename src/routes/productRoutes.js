const router = require("express").Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, productController.createProduct);
router.get("/", authMiddleware, productController.getProducts);
router.delete("/:id", authMiddleware, productController.deleteProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.get("/summary", authMiddleware, productController.getDashboardSummary);

module.exports = router;
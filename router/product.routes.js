const {Router} = require("express")
const { addProduct, getProduct, getOneProduct, updateProduct, deleteProduct } = require("../controller/product.controller")
const {checkAdmin} =require("../middleware/admin_cheker_middleware");

const productRouter = Router()

productRouter.get("/get_products", getProduct)
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/add_product",checkAdmin ,addProduct)
productRouter.put("/update_product/:id", checkAdmin,updateProduct)
productRouter.delete("/delete_product/:id", deleteProduct)


module.exports = {productRouter}
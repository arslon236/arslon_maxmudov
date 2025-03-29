const {Router} = require("express")
const { register, login, addadmin, deleteAdmin } = require("../controller/auth.controller")
const { checksuperAdmin } = require("../middleware/superadminChekerMiddleware")


const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login",login)
authRouter.post("/add_admin",checksuperAdmin,addadmin)
authRouter.post("/delete_admin",checksuperAdmin,deleteAdmin)


module.exports = {authRouter}

const express = require("express")
const cors = require("cors")
const { authRouter } = require("./router/auth.routes")
const { productRouter } = require("./router/product.routes")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(productRouter)

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`Server ishladi https://localhost:${PORT}`);
})
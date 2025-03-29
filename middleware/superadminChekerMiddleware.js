const jwt = require("jsonwebtoken");

async function checksuperAdmin(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "authorization emas",
      });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        message: "bearer yoki token topilmadi",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;

    const roles = ["superadmin" ]

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Sizda bu imkoniyat yoq faqat superadmin qilishi mumkun",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


module.exports = { checksuperAdmin };

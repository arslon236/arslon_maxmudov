const { read_file, write_file } = require("../api/metods");
const bcryptjs = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    const readFileData = read_file("user.json");
    const foundedData = readFileData.find((item) => item.email === email);

    if (foundedData) {
      return res.json({
        message: "Foydalanuvchi avvaldan mavjud",
      });
    }
    const hash = await bcryptjs.hash(password, 10);
    readFileData.push({ id: v4(), user, email, password: hash, role: "user" });
    write_file("user.json", readFileData);
    res.status(201).json({
      message: "Ro`yxatdan o`tildi",
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const readFileData = read_file("user.json");
    const foundedData = readFileData.find((item) => item.email === email);
    if (!foundedData) {
      return res.json({
        message: "Foydalanuvchi topilmadi",
      });
    }
    const decode = await bcryptjs.compare(password, foundedData.password);
    const patload = {
      user: foundedData.user,
      email: foundedData.email,
      id: foundedData.id,
      role: foundedData.role,
    };
    if (decode) {
      const token = jwt.sign(patload, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXP,
      });
      return res.status(200).json({
        message: "Togri parol",
        token,
      });
    } else {
      return res.status(401).json({
        message: "Parol xato ",
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const addadmin = async (req, res) => {
  try {
    const { email, password, adminId } = req.body;
    const readFileData = read_file("user.json");
    const foundedData = readFileData.find((item) => item.email === email);
    if (!foundedData) {
      return res.json({
        message: "Foydalanuvchi topilmadi",
      });
    }

    const decode = await bcryptjs.compare(password, foundedData.password);

    if (!decode) {
      return res.status(401).json({
        message: "Parol xato ",
      });
    }

    const foundedAdmin = readFileData.find((item) => item.id === adminId);
    if (!foundedAdmin) {
      return res.json({
        message: "Bolajak admin topilmadi",
      });
    }
    readFileData.forEach((element) => {
      if (element.id === adminId) {
        element.role = "admin";
      }
    });
    write_file("user.json",readFileData)
    res.status(201).json({
        message:"Admin muvoffaqiyatli tayinlandi"
    })
  } catch (error) {
    return res.send(error.message);
  }
};


const deleteAdmin = async (req, res) => {
    try {
      const { email, password, adminId } = req.body;
      const readFileData = read_file("user.json");
      const foundedData = readFileData.find((item) => item.email === email);
      if (!foundedData) {
        return res.json({
          message: "Foydalanuvchi topilmadi",
        });
      }
  
      const decode = await bcryptjs.compare(password, foundedData.password);
  
      if (!decode) {
        return res.status(401).json({
          message: "Parol xato ",
        });
      }
  
      const foundedAdmin = readFileData.find((item) => item.id === adminId);
      if (!foundedAdmin) {
        return res.json({
          message: "Admin topilmadi",
        });
      }
      readFileData.forEach((element) => {
        if (element.id === adminId) {
          element.role = "user";
        }
      });
      write_file("user.json",readFileData)
      res.status(201).json({
          message:"Admin ochirildi"
      })
    } catch (error) {
      return res.send(error.message);
    }
  };
  

module.exports = {
  register,
  login,
  addadmin,
  deleteAdmin
};

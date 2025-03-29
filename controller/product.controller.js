const { read_file, write_file } = require("../api/metods");
const bcryptjs = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const getProduct = async (req, res) => {
  try {
    const readFileData = read_file("product.json");
    res.status(201).json(readFileData);
  } catch (error) {
    return res.send(error.message);
  }
};
const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const readFileData = read_file("product.json");
    const foundedData = readFileData.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).send({
        message: `${id} bunday idli mahsulot topilmadi`,
      });
    }
    res.status(200).send(foundedData);
  } catch (error) {
    return res.send(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, desc, price, quantity } = req.body;
    const readFileData = read_file("product.json");

    readFileData.push({ id: v4(), title, desc, price, quantity });
    write_file("product.json", readFileData);
    res.status(201).json({
      message: "Yangi malumot qoshildi",
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, price, quantity } = req.body;
    const readFileData = read_file("product.json");
    const foundedData = readFileData.find((item) => item.id === id);

    if (!foundedData) {
      res.status(404).send({
        message: `${id} bunday mahsulot topilmadi`,
      });
    }
    readFileData.forEach((item) => {
      if (item.id === id) {
        (item.title = title ? title : item.title),
          (item.desc = desc ? desc : item.desc),
          (item.price = price ? price : item.price),
          (item.quantity = quantity ? quantity : item.quantity);
      }
    });
    write_file("product.json", readFileData);
    res.status(200).send({
      message: `Mahsulot ozgartrildi`,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const readFileData = read_file("product.json");
    const foundedData = readFileData.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).send({
        message: `${id} bunday idli mahsulot topilmadi`,
      });
    }
    readFileData.forEach((item, index) => {
      if (item.id === id) {
        readFileData.splice(index, 1);
      }
    });
    write_file("product.json", readFileData);
    res.status(200).json({
      message: "Mahsulot ochirildi",
    });
  } catch (error) {
    return res.send(error.message);
  }
};
module.exports = {
  getProduct,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

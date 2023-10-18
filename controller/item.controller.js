const itemService = require("../service/item.service");

const getAllItems = async (req, res) => {
  const items = await itemService.getAllItems();
  return res
    .json({
      message: "Successfully fetched items",
      status: "success",
      data: items,
    })
    .status(200);
};

const addNewItem = async (req, res) => {
  const body = req.body;
  const { itemExist, items } = await itemService.addNewItem(body);
  if (itemExist) {
    return res
      .json({
        message: "Item already exist in the database",
        status: "error",
      })
      .status(400);
  }

  return res
    .json({
      message: "New Item added successfully",
      status: "success",
      data: items,
    })
    .status(201);
};

const getItemById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const { rows, rowCount } = await itemService.getItemById(id, body);
  if (rowCount == 0) {
    return res
      .json({
        message: "Item not found",
        status: "error",
      })
      .status(400);
  }

  return res
    .json({
      message: "Item fetched successfully",
      status: "success",
      data: rows[0],
    })
    .status(200);
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const { itemExist } = await itemService.updateItem(id, body);
  if (!itemExist) {
    return res
      .json({
        message: "Item not found in the array",
        status: "error",
      })
      .status(400);
  }

  return res
    .json({
      message: "Item updated successfully",
      status: "success",
      data: null,
    })
    .status(200);
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  const { itemExist, items } = await itemService.deleteItem(id);
  if (!itemExist) {
    return res
      .json({
        message: "Item not found in the array",
        status: "error",
      })
      .status(400);
  }

  return res
    .json({
      message: "Item deleted successfully",
      status: "success",
      data: items,
    })
    .status(200);
};

module.exports = {
  getAllItems,
  addNewItem,
  updateItem,
  deleteItem,
  getItemById,
};

const express = require("express");
const router = express.Router();

const itemController = require("../controller/item.controller");
const itemMiddleware = require("../middlewares/item.middleware");

router.get("", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.post("", itemMiddleware.validateRequestBody, itemController.addNewItem);
router.put(
  "/:id",
  itemMiddleware.validateRequestBody,
  itemController.updateItem
);
router.delete("/:id", itemController.deleteItem);

module.exports = router;

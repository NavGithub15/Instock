const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

function readInventory() {
  const inventoryFile = fs.readFileSync("./data/inventories.json");
  const inventoryData = JSON.parse(inventoryFile);
  return inventoryData;
}

//POST inventory item
router.post("/", (req, res) => {
  if (
    !req.body.warehouseName ||
    !req.body.itemName ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    res.status(400).send("Please fill in all form inputs");
    return;
  }
  const newInventory = {
    id: uuid(),
    warehouseID: req.body.warehouseID,
    warehouseName: req.body.warehouseName,
    itemName: req.body.itemName,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity,
  };

  const inventories = readInventory();
  inventories.push(newInventory);
  fs.writeFileSync(
    "./data/inventories.json",
    JSON.stringify(inventories)
  );
  res.status(201).json(newInventory);
});

//GET all Inventory Items
router.get("/", (req, res) => {
  const allInventoryItems = readInventory();

  const inventoryList = allInventoryItems.map((item) => {
    return {
      id: item.id,
      itemName: item.itemName,
      category: item.category,
      status: item.status,
      quantity: item.quantity,
      warehouseName: item.warehouseName,
      warehouseID: item.warehouseID,
    };
  });
  if (!inventoryList) {
    return res.status(400).send("Inventory List failed to load");
  }
  return res.json(inventoryList);
});

// GET single Inventory Item
router.get("/:inventoryId", (req, res) => {
  const inventories = readInventory();
  const inventory = inventories.find(
    (inventory) => inventory.id === req.params.inventoryId
  );

  if (!inventory) {
    return res.status(401).send("Inventory item failed to load");
  }
  res.json(inventory);
});

//GET REQUEST SPECIFIC INVENTORY FOR WAREHOUSE
router.get("/warehouses/:warehouseId", (req, res) => {
  const allInventoryItems = readInventory();

  const itemsByWarehouseId = allInventoryItems.filter(
    (inventory) => inventory.warehouseID === req.params.warehouseId
  );
  res.json(itemsByWarehouseId);
});

// Delete REQUEST SINGLE INVENTORY ITEM
router.delete("/:inventoryId", (req, res) => {
  const inventories = readInventory();
  const inventoryId = req.params.inventoryId;

  const deletedInventory = inventories.findIndex(
    (inventory) => inventory.id === inventoryId
  );
  inventories.splice(deletedInventory, 1);
  fs.writeFileSync(
    "./data/inventories.json",
    JSON.stringify(inventories)
  );
  res.json(req.params.inventoryId);
});

//PUT single inventory item
router.put("/:inventoryId", (req, res) => {
  const inventoryList = readInventory();
  const inventoryCopy = [];
  let inventoryIdCopy = req.params.inventoryId;

  inventoryList.map((inventoryItem) => {
    if (inventoryItem.id === inventoryIdCopy) {
      inventoryCopy.push(req.body);
    } else {
      inventoryCopy.push(inventoryItem);
    }
  });
  fs.writeFileSync(
    "./data/inventories.json",
    JSON.stringify(inventoryCopy)
  );
  console.log(inventoryList);
  res.status(200).json(req.body);
});

module.exports = router;

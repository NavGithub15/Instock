const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuid } = require('uuid');


function readWarehouses() {
  const warehouseFile = fs.readFileSync('./data/warehouses.json');
  const warehouseData = JSON.parse(warehouseFile);
  return warehouseData;
}

// GET WAREHOUSE LIST
router.get("/", (_req, res) => {
    const warehouses = readWarehouses();

    const warehousesList = warehouses.map((warehouse) => {
        return {
            id: warehouse.id,
            name: warehouse.name,
            address: warehouse.address,
            city: warehouse.city,
            country: warehouse.country,
            contact: {
                name: warehouse.contact.name,
                position: warehouse.contact.position,
                phone: warehouse.contact.phone,
                email: warehouse.contact.email,
            },
        };
    });
    res.status(200).json(warehousesList);
});

// GET SINGLE WAREHOUSE
router.get('/:warehouseId', (req, res) => {
  const warehousesList = readWarehouses();
  const foundWarehouse = warehousesList.find(warehouse => warehouse.id === req.params.warehouseId)
  res.status(200).json(foundWarehouse)
})

// POST REQUEST
router.post('/', (req, res) => {

  if (
    !req.body.name || 
    !req.body.address || 
    !req.body.city || 
    !req.body.country ||
    !req.body.contact.name || 
    !req.body.contact.position || 
    !req.body.contact.phone || 
    !req.body.contact.email) {
    res.status(400).send("Please fill in all form inputs");
    return;
  }
  
  const newWarehouse = {
    id: uuid(),
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: {
      name: req.body.contact.name,
      position: req.body.contact.position,
      phone: req.body.contact.phone,
      email: req.body.contact.email
    }
  }
  
  const warehouses = readWarehouses()
  warehouses.push(newWarehouse)
  fs.writeFileSync('./data/warehouses.json', JSON.stringify(warehouses))

  res.status(201).json(newWarehouse)
});

// PUT WAREHOUSE
router.put('/:warehouseId', (req, res) => {

  if (
    !req.body.name || 
    !req.body.address || 
    !req.body.city || 
    !req.body.country ||
    !req.body.contact.name || 
    !req.body.contact.position || 
    !req.body.contact.phone || 
    !req.body.contact.email) {
    res.status(400).send("Please fill in all form inputs");
    return;
  }
  
  const warehousesList = readWarehouses();
  const editInfo = req.body
  const warehouseId = req.params.warehouseId
  const editedWarehouse = { ...editInfo, id:warehouseId}
  warehousesList.splice(warehousesList.findIndex(warehouse => warehouse.id === req.params.warehouseId), 1, editedWarehouse)
  fs.writeFileSync('./data/warehouses.json', JSON.stringify(warehousesList))
  res.status(200).json(editInfo)
})

//GET SINGLE WAREHOUSE REQUEST
router.get('/:warehouseId',(req, res) => {
  const warehouses = readWarehouses();
  const selectedWarehouse = warehouses.find((warehouse) => warehouse.id === req.params.warehouseId)

  if (!selectedWarehouse) {
    return res.status(400).send("There seems to be a hiccup please refresh");
  }

  return res.json(selectedWarehouse)
})

// DELETE REQUEST FOR SINGLE WAREHOUSE
router.delete("/:warehouseId", (req, res) => {
    const warehouses = readWarehouses();
    const warehouseId = req.params.warehouseId;

    const deletedItem = warehouses.findIndex((item) => item.id === warehouseId);
      warehouses.splice(deletedItem, 1);
      fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouses))
      res.json(req.params.warehouseId)
  })

module.exports = router;
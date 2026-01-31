const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.products, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const product = data.products.find(p => p.PARTNAME === req.params.key);
  if (!product) {
    return res.status(404).json({ error: 'Not Found', message: `Product '${req.params.key}' not found` });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const { PARTNAME, PARTDES, BARCODE, UNIT, SELLPRICE, COSTPRICE, INVENTORY, FAMILY, STATUS } = req.body;
  if (!PARTNAME) {
    return res.status(400).json({ error: 'Bad Request', message: 'PARTNAME is required' });
  }
  if (data.products.find(p => p.PARTNAME === PARTNAME)) {
    return res.status(409).json({ error: 'Conflict', message: `Product '${PARTNAME}' already exists` });
  }
  const newProduct = {
    PARTNAME,
    PARTDES: PARTDES || '',
    BARCODE: BARCODE || '',
    UNIT: UNIT || 'EA',
    SELLPRICE: SELLPRICE || 0,
    COSTPRICE: COSTPRICE || 0,
    INVENTORY: INVENTORY || 0,
    FAMILY: FAMILY || '',
    STATUS: STATUS || 'A'
  };
  data.products.push(newProduct);
  res.status(201).json(newProduct);
});

router.patch('/:key', (req, res) => {
  const idx = data.products.findIndex(p => p.PARTNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Product '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.PARTNAME;
  Object.assign(data.products[idx], updates);
  res.json(data.products[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.products.findIndex(p => p.PARTNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Product '${req.params.key}' not found` });
  }
  data.products.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.suppliers, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const supplier = data.suppliers.find(s => s.SUPNAME === req.params.key);
  if (!supplier) {
    return res.status(404).json({ error: 'Not Found', message: `Supplier '${req.params.key}' not found` });
  }
  res.json(supplier);
});

router.post('/', (req, res) => {
  const { SUPNAME, SUPDES, PHONE, EMAIL, ADDRESS, COUNTRY, STATUS } = req.body;
  if (!SUPNAME) {
    return res.status(400).json({ error: 'Bad Request', message: 'SUPNAME is required' });
  }
  if (data.suppliers.find(s => s.SUPNAME === SUPNAME)) {
    return res.status(409).json({ error: 'Conflict', message: `Supplier '${SUPNAME}' already exists` });
  }
  const newSupplier = {
    SUPNAME,
    SUPDES: SUPDES || '',
    PHONE: PHONE || '',
    EMAIL: EMAIL || '',
    ADDRESS: ADDRESS || '',
    COUNTRY: COUNTRY || '',
    STATUS: STATUS || 'A'
  };
  data.suppliers.push(newSupplier);
  res.status(201).json(newSupplier);
});

router.patch('/:key', (req, res) => {
  const idx = data.suppliers.findIndex(s => s.SUPNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Supplier '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.SUPNAME;
  Object.assign(data.suppliers[idx], updates);
  res.json(data.suppliers[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.suppliers.findIndex(s => s.SUPNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Supplier '${req.params.key}' not found` });
  }
  data.suppliers.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

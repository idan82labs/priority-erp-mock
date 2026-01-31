const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  let result = applyQuery(data.boms, req.query);
  if (req.query.$expand === 'BOMITEMS_SUBFORM') {
    result = result.map(bom => ({
      ...bom,
      BOMITEMS_SUBFORM: data.bomItems.filter(i => i.BOMNAME === bom.BOMNAME)
    }));
  }
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const bom = data.boms.find(b => b.BOMNAME === req.params.key);
  if (!bom) {
    return res.status(404).json({ error: 'Not Found', message: `BOM '${req.params.key}' not found` });
  }
  const result = { ...bom };
  if (req.query.$expand === 'BOMITEMS_SUBFORM') {
    result.BOMITEMS_SUBFORM = data.bomItems.filter(i => i.BOMNAME === bom.BOMNAME);
  }
  res.json(result);
});

router.post('/', (req, res) => {
  const { BOMNAME, PARTNAME, BOMDES, REVISION, STATUS } = req.body;
  if (!BOMNAME) {
    return res.status(400).json({ error: 'Bad Request', message: 'BOMNAME is required' });
  }
  if (data.boms.find(b => b.BOMNAME === BOMNAME)) {
    return res.status(409).json({ error: 'Conflict', message: `BOM '${BOMNAME}' already exists` });
  }
  const newBom = {
    BOMNAME,
    PARTNAME: PARTNAME || '',
    BOMDES: BOMDES || '',
    REVISION: REVISION || 'A',
    STATUS: STATUS || 'A'
  };
  data.boms.push(newBom);
  res.status(201).json(newBom);
});

router.patch('/:key', (req, res) => {
  const idx = data.boms.findIndex(b => b.BOMNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `BOM '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.BOMNAME;
  Object.assign(data.boms[idx], updates);
  res.json(data.boms[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.boms.findIndex(b => b.BOMNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `BOM '${req.params.key}' not found` });
  }
  data.bomItems = data.bomItems.filter(i => i.BOMNAME !== req.params.key);
  data.boms.splice(idx, 1);
  res.status(204).send();
});

// --- BOMITEMS_SUBFORM ---

router.get('/:key/BOMITEMS_SUBFORM', (req, res) => {
  const bom = data.boms.find(b => b.BOMNAME === req.params.key);
  if (!bom) {
    return res.status(404).json({ error: 'Not Found', message: `BOM '${req.params.key}' not found` });
  }
  const items = data.bomItems.filter(i => i.BOMNAME === req.params.key);
  const result = applyQuery(items, req.query);
  res.json({ value: result });
});

router.post('/:key/BOMITEMS_SUBFORM', (req, res) => {
  const bom = data.boms.find(b => b.BOMNAME === req.params.key);
  if (!bom) {
    return res.status(404).json({ error: 'Not Found', message: `BOM '${req.params.key}' not found` });
  }
  const existingItems = data.bomItems.filter(i => i.BOMNAME === req.params.key);
  const nextLine = existingItems.length > 0 ? Math.max(...existingItems.map(i => i.LINE)) + 1 : 1;
  const newItem = {
    BOMNAME: req.params.key,
    LINE: nextLine,
    CHILDPART: req.body.CHILDPART || '',
    TQUANT: req.body.TQUANT || 0,
    UNIT: req.body.UNIT || 'EA'
  };
  data.bomItems.push(newItem);
  res.status(201).json(newItem);
});

router.patch('/:key/BOMITEMS_SUBFORM/:line', (req, res) => {
  const line = parseInt(req.params.line);
  const idx = data.bomItems.findIndex(i => i.BOMNAME === req.params.key && i.LINE === line);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `BOM item line ${line} not found in BOM '${req.params.key}'` });
  }
  const updates = req.body;
  delete updates.BOMNAME;
  delete updates.LINE;
  Object.assign(data.bomItems[idx], updates);
  res.json(data.bomItems[idx]);
});

router.delete('/:key/BOMITEMS_SUBFORM/:line', (req, res) => {
  const line = parseInt(req.params.line);
  const idx = data.bomItems.findIndex(i => i.BOMNAME === req.params.key && i.LINE === line);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `BOM item line ${line} not found in BOM '${req.params.key}'` });
  }
  data.bomItems.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.workOrders, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const wo = data.workOrders.find(w => w.WONUM === req.params.key);
  if (!wo) {
    return res.status(404).json({ error: 'Not Found', message: `Work order '${req.params.key}' not found` });
  }
  res.json(wo);
});

router.post('/', (req, res) => {
  const { WONUM, PARTNAME, TQUANT, STARTDATE, ENDDATE, WOSTATUS, PRIORITY } = req.body;
  if (!WONUM) {
    return res.status(400).json({ error: 'Bad Request', message: 'WONUM is required' });
  }
  if (data.workOrders.find(w => w.WONUM === WONUM)) {
    return res.status(409).json({ error: 'Conflict', message: `Work order '${WONUM}' already exists` });
  }
  const newWO = {
    WONUM,
    PARTNAME: PARTNAME || '',
    TQUANT: TQUANT || 0,
    STARTDATE: STARTDATE || '',
    ENDDATE: ENDDATE || '',
    WOSTATUS: WOSTATUS || 'P',
    PRIORITY: PRIORITY || 3
  };
  data.workOrders.push(newWO);
  res.status(201).json(newWO);
});

router.patch('/:key', (req, res) => {
  const idx = data.workOrders.findIndex(w => w.WONUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Work order '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.WONUM;
  Object.assign(data.workOrders[idx], updates);
  res.json(data.workOrders[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.workOrders.findIndex(w => w.WONUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Work order '${req.params.key}' not found` });
  }
  data.workOrders.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

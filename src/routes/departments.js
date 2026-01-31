const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.departments, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const dept = data.departments.find(d => d.DEPTCODE === req.params.key);
  if (!dept) {
    return res.status(404).json({ error: 'Not Found', message: `Department '${req.params.key}' not found` });
  }
  res.json(dept);
});

router.post('/', (req, res) => {
  const { DEPTCODE, DEPTDES, MANAGER, HEADCOUNT } = req.body;
  if (!DEPTCODE) {
    return res.status(400).json({ error: 'Bad Request', message: 'DEPTCODE is required' });
  }
  if (data.departments.find(d => d.DEPTCODE === DEPTCODE)) {
    return res.status(409).json({ error: 'Conflict', message: `Department '${DEPTCODE}' already exists` });
  }
  const newDept = {
    DEPTCODE,
    DEPTDES: DEPTDES || '',
    MANAGER: MANAGER || '',
    HEADCOUNT: HEADCOUNT || 0
  };
  data.departments.push(newDept);
  res.status(201).json(newDept);
});

router.patch('/:key', (req, res) => {
  const idx = data.departments.findIndex(d => d.DEPTCODE === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Department '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.DEPTCODE;
  Object.assign(data.departments[idx], updates);
  res.json(data.departments[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.departments.findIndex(d => d.DEPTCODE === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Department '${req.params.key}' not found` });
  }
  data.departments.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

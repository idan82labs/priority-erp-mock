const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.employees, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const emp = data.employees.find(e => e.EMPNUM === req.params.key);
  if (!emp) {
    return res.status(404).json({ error: 'Not Found', message: `Employee '${req.params.key}' not found` });
  }
  res.json(emp);
});

router.post('/', (req, res) => {
  const { EMPNUM, EMPNAME, DEPT, POSITION, HIREDATE, PHONE, EMAIL, STATUS } = req.body;
  if (!EMPNUM) {
    return res.status(400).json({ error: 'Bad Request', message: 'EMPNUM is required' });
  }
  if (data.employees.find(e => e.EMPNUM === EMPNUM)) {
    return res.status(409).json({ error: 'Conflict', message: `Employee '${EMPNUM}' already exists` });
  }
  const newEmp = {
    EMPNUM,
    EMPNAME: EMPNAME || '',
    DEPT: DEPT || '',
    POSITION: POSITION || '',
    HIREDATE: HIREDATE || new Date().toISOString().split('T')[0],
    PHONE: PHONE || '',
    EMAIL: EMAIL || '',
    STATUS: STATUS || 'A'
  };
  data.employees.push(newEmp);
  res.status(201).json(newEmp);
});

router.patch('/:key', (req, res) => {
  const idx = data.employees.findIndex(e => e.EMPNUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Employee '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.EMPNUM;
  Object.assign(data.employees[idx], updates);
  res.json(data.employees[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.employees.findIndex(e => e.EMPNUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Employee '${req.params.key}' not found` });
  }
  data.employees.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

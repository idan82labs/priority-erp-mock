const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.customers, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const customer = data.customers.find(c => c.CUSTNAME === req.params.key);
  if (!customer) {
    return res.status(404).json({ error: 'Not Found', message: `Customer '${req.params.key}' not found` });
  }
  res.json(customer);
});

router.post('/', (req, res) => {
  const { CUSTNAME, CUSTDES, PHONE, EMAIL, ADDRESS, CITY, STATE, COUNTRY, BALANCE, CREDIT_LIMIT, STATUS } = req.body;
  if (!CUSTNAME) {
    return res.status(400).json({ error: 'Bad Request', message: 'CUSTNAME is required' });
  }
  if (data.customers.find(c => c.CUSTNAME === CUSTNAME)) {
    return res.status(409).json({ error: 'Conflict', message: `Customer '${CUSTNAME}' already exists` });
  }
  const newCustomer = {
    CUSTNAME,
    CUSTDES: CUSTDES || '',
    PHONE: PHONE || '',
    EMAIL: EMAIL || '',
    ADDRESS: ADDRESS || '',
    CITY: CITY || '',
    STATE: STATE || '',
    COUNTRY: COUNTRY || '',
    BALANCE: BALANCE || 0,
    CREDIT_LIMIT: CREDIT_LIMIT || 0,
    STATUS: STATUS || 'A'
  };
  data.customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

router.patch('/:key', (req, res) => {
  const idx = data.customers.findIndex(c => c.CUSTNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Customer '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.CUSTNAME;
  Object.assign(data.customers[idx], updates);
  res.json(data.customers[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.customers.findIndex(c => c.CUSTNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Customer '${req.params.key}' not found` });
  }
  data.customers.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

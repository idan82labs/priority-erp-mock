const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  let result = applyQuery(data.orders, req.query);
  if (req.query.$expand === 'ORDERITEMS_SUBFORM') {
    result = result.map(order => ({
      ...order,
      ORDERITEMS_SUBFORM: data.orderItems.filter(i => i.ORDNAME === order.ORDNAME)
    }));
  }
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const order = data.orders.find(o => o.ORDNAME === req.params.key);
  if (!order) {
    return res.status(404).json({ error: 'Not Found', message: `Order '${req.params.key}' not found` });
  }
  const result = { ...order };
  if (req.query.$expand === 'ORDERITEMS_SUBFORM') {
    result.ORDERITEMS_SUBFORM = data.orderItems.filter(i => i.ORDNAME === order.ORDNAME);
  }
  res.json(result);
});

router.post('/', (req, res) => {
  const { ORDNAME, CUSTNAME, CURDATE, ORDSTATUS, QPRICE, DETAILS } = req.body;
  if (!ORDNAME) {
    return res.status(400).json({ error: 'Bad Request', message: 'ORDNAME is required' });
  }
  if (data.orders.find(o => o.ORDNAME === ORDNAME)) {
    return res.status(409).json({ error: 'Conflict', message: `Order '${ORDNAME}' already exists` });
  }
  const newOrder = {
    ORDNAME,
    CUSTNAME: CUSTNAME || '',
    CURDATE: CURDATE || new Date().toISOString().split('T')[0],
    ORDSTATUS: ORDSTATUS || 'O',
    QPRICE: QPRICE || 0,
    DETAILS: DETAILS || ''
  };
  data.orders.push(newOrder);
  res.status(201).json(newOrder);
});

router.patch('/:key', (req, res) => {
  const idx = data.orders.findIndex(o => o.ORDNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Order '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.ORDNAME;
  Object.assign(data.orders[idx], updates);
  res.json(data.orders[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.orders.findIndex(o => o.ORDNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Order '${req.params.key}' not found` });
  }
  data.orderItems = data.orderItems.filter(i => i.ORDNAME !== req.params.key);
  data.orders.splice(idx, 1);
  res.status(204).send();
});

// --- ORDERITEMS_SUBFORM ---

router.get('/:key/ORDERITEMS_SUBFORM', (req, res) => {
  const order = data.orders.find(o => o.ORDNAME === req.params.key);
  if (!order) {
    return res.status(404).json({ error: 'Not Found', message: `Order '${req.params.key}' not found` });
  }
  const items = data.orderItems.filter(i => i.ORDNAME === req.params.key);
  const result = applyQuery(items, req.query);
  res.json({ value: result });
});

router.post('/:key/ORDERITEMS_SUBFORM', (req, res) => {
  const order = data.orders.find(o => o.ORDNAME === req.params.key);
  if (!order) {
    return res.status(404).json({ error: 'Not Found', message: `Order '${req.params.key}' not found` });
  }
  const existingItems = data.orderItems.filter(i => i.ORDNAME === req.params.key);
  const nextLine = existingItems.length > 0 ? Math.max(...existingItems.map(i => i.LINE)) + 1 : 1;
  const newItem = {
    ORDNAME: req.params.key,
    LINE: nextLine,
    PARTNAME: req.body.PARTNAME || '',
    TQUANT: req.body.TQUANT || 0,
    PRICE: req.body.PRICE || 0,
    DUEDATE: req.body.DUEDATE || '',
    KLINE: req.body.KLINE || 'O'
  };
  data.orderItems.push(newItem);
  res.status(201).json(newItem);
});

router.patch('/:key/ORDERITEMS_SUBFORM/:line', (req, res) => {
  const line = parseInt(req.params.line);
  const idx = data.orderItems.findIndex(i => i.ORDNAME === req.params.key && i.LINE === line);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Order item line ${line} not found in order '${req.params.key}'` });
  }
  const updates = req.body;
  delete updates.ORDNAME;
  delete updates.LINE;
  Object.assign(data.orderItems[idx], updates);
  res.json(data.orderItems[idx]);
});

router.delete('/:key/ORDERITEMS_SUBFORM/:line', (req, res) => {
  const line = parseInt(req.params.line);
  const idx = data.orderItems.findIndex(i => i.ORDNAME === req.params.key && i.LINE === line);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Order item line ${line} not found in order '${req.params.key}'` });
  }
  data.orderItems.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

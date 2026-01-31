const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  let result = applyQuery(data.invoices, req.query);
  if (req.query.$expand === 'AINVOICEITEMS_SUBFORM') {
    result = result.map(inv => ({
      ...inv,
      AINVOICEITEMS_SUBFORM: data.invoiceItems.filter(i => i.IVNUM === inv.IVNUM)
    }));
  }
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const invoice = data.invoices.find(i => i.IVNUM === req.params.key);
  if (!invoice) {
    return res.status(404).json({ error: 'Not Found', message: `Invoice '${req.params.key}' not found` });
  }
  const result = { ...invoice };
  if (req.query.$expand === 'AINVOICEITEMS_SUBFORM') {
    result.AINVOICEITEMS_SUBFORM = data.invoiceItems.filter(i => i.IVNUM === invoice.IVNUM);
  }
  res.json(result);
});

router.post('/', (req, res) => {
  const { IVNUM, CUSTNAME, IVDATE, TOTAL, IVSTATUS, PAYDATE } = req.body;
  if (!IVNUM) {
    return res.status(400).json({ error: 'Bad Request', message: 'IVNUM is required' });
  }
  if (data.invoices.find(i => i.IVNUM === IVNUM)) {
    return res.status(409).json({ error: 'Conflict', message: `Invoice '${IVNUM}' already exists` });
  }
  const newInvoice = {
    IVNUM,
    CUSTNAME: CUSTNAME || '',
    IVDATE: IVDATE || new Date().toISOString().split('T')[0],
    TOTAL: TOTAL || 0,
    IVSTATUS: IVSTATUS || 'O',
    PAYDATE: PAYDATE || ''
  };
  data.invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

router.patch('/:key', (req, res) => {
  const idx = data.invoices.findIndex(i => i.IVNUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Invoice '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.IVNUM;
  Object.assign(data.invoices[idx], updates);
  res.json(data.invoices[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.invoices.findIndex(i => i.IVNUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Invoice '${req.params.key}' not found` });
  }
  data.invoiceItems = data.invoiceItems.filter(i => i.IVNUM !== req.params.key);
  data.invoices.splice(idx, 1);
  res.status(204).send();
});

// --- AINVOICEITEMS_SUBFORM ---

router.get('/:key/AINVOICEITEMS_SUBFORM', (req, res) => {
  const invoice = data.invoices.find(i => i.IVNUM === req.params.key);
  if (!invoice) {
    return res.status(404).json({ error: 'Not Found', message: `Invoice '${req.params.key}' not found` });
  }
  const items = data.invoiceItems.filter(i => i.IVNUM === req.params.key);
  const result = applyQuery(items, req.query);
  res.json({ value: result });
});

router.post('/:key/AINVOICEITEMS_SUBFORM', (req, res) => {
  const invoice = data.invoices.find(i => i.IVNUM === req.params.key);
  if (!invoice) {
    return res.status(404).json({ error: 'Not Found', message: `Invoice '${req.params.key}' not found` });
  }
  const existingItems = data.invoiceItems.filter(i => i.IVNUM === req.params.key);
  const nextLine = existingItems.length > 0 ? Math.max(...existingItems.map(i => i.LINE)) + 1 : 1;
  const newItem = {
    IVNUM: req.params.key,
    LINE: nextLine,
    PARTNAME: req.body.PARTNAME || '',
    TQUANT: req.body.TQUANT || 0,
    PRICE: req.body.PRICE || 0
  };
  data.invoiceItems.push(newItem);
  res.status(201).json(newItem);
});

router.patch('/:key/AINVOICEITEMS_SUBFORM/:line', (req, res) => {
  const line = parseInt(req.params.line);
  const idx = data.invoiceItems.findIndex(i => i.IVNUM === req.params.key && i.LINE === line);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Invoice item line ${line} not found in invoice '${req.params.key}'` });
  }
  const updates = req.body;
  delete updates.IVNUM;
  delete updates.LINE;
  Object.assign(data.invoiceItems[idx], updates);
  res.json(data.invoiceItems[idx]);
});

router.delete('/:key/AINVOICEITEMS_SUBFORM/:line', (req, res) => {
  const line = parseInt(req.params.line);
  const idx = data.invoiceItems.findIndex(i => i.IVNUM === req.params.key && i.LINE === line);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Invoice item line ${line} not found in invoice '${req.params.key}'` });
  }
  data.invoiceItems.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

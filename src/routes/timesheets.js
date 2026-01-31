const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.timesheets, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const ts = data.timesheets.find(t => t.TSNUM === req.params.key);
  if (!ts) {
    return res.status(404).json({ error: 'Not Found', message: `Timesheet '${req.params.key}' not found` });
  }
  res.json(ts);
});

router.post('/', (req, res) => {
  const { TSNUM, EMPNUM, TSDATE, HOURS, PROJECT, DESCRIPTION } = req.body;
  if (!TSNUM) {
    return res.status(400).json({ error: 'Bad Request', message: 'TSNUM is required' });
  }
  if (data.timesheets.find(t => t.TSNUM === TSNUM)) {
    return res.status(409).json({ error: 'Conflict', message: `Timesheet '${TSNUM}' already exists` });
  }
  const newTS = {
    TSNUM,
    EMPNUM: EMPNUM || '',
    TSDATE: TSDATE || new Date().toISOString().split('T')[0],
    HOURS: HOURS || 0,
    PROJECT: PROJECT || '',
    DESCRIPTION: DESCRIPTION || ''
  };
  data.timesheets.push(newTS);
  res.status(201).json(newTS);
});

router.patch('/:key', (req, res) => {
  const idx = data.timesheets.findIndex(t => t.TSNUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Timesheet '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.TSNUM;
  Object.assign(data.timesheets[idx], updates);
  res.json(data.timesheets[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.timesheets.findIndex(t => t.TSNUM === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Timesheet '${req.params.key}' not found` });
  }
  data.timesheets.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

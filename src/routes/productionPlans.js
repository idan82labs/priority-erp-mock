const express = require('express');
const router = express.Router();
const data = require('../data/seed');
const { applyQuery } = require('../utils/queryHelpers');

router.get('/', (req, res) => {
  const result = applyQuery(data.productionPlans, req.query);
  res.json({ value: result });
});

router.get('/:key', (req, res) => {
  const plan = data.productionPlans.find(p => p.PLANNAME === req.params.key);
  if (!plan) {
    return res.status(404).json({ error: 'Not Found', message: `Production plan '${req.params.key}' not found` });
  }
  res.json(plan);
});

router.post('/', (req, res) => {
  const { PLANNAME, PLANDES, STARTDATE, ENDDATE, STATUS } = req.body;
  if (!PLANNAME) {
    return res.status(400).json({ error: 'Bad Request', message: 'PLANNAME is required' });
  }
  if (data.productionPlans.find(p => p.PLANNAME === PLANNAME)) {
    return res.status(409).json({ error: 'Conflict', message: `Production plan '${PLANNAME}' already exists` });
  }
  const newPlan = {
    PLANNAME,
    PLANDES: PLANDES || '',
    STARTDATE: STARTDATE || '',
    ENDDATE: ENDDATE || '',
    STATUS: STATUS || 'P'
  };
  data.productionPlans.push(newPlan);
  res.status(201).json(newPlan);
});

router.patch('/:key', (req, res) => {
  const idx = data.productionPlans.findIndex(p => p.PLANNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Production plan '${req.params.key}' not found` });
  }
  const updates = req.body;
  delete updates.PLANNAME;
  Object.assign(data.productionPlans[idx], updates);
  res.json(data.productionPlans[idx]);
});

router.delete('/:key', (req, res) => {
  const idx = data.productionPlans.findIndex(p => p.PLANNAME === req.params.key);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Production plan '${req.params.key}' not found` });
  }
  data.productionPlans.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

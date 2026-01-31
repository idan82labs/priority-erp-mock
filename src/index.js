require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static front-end
app.use(express.static(path.join(__dirname, '..', 'public')));

// OData URL rewriting middleware
// Converts /api/ENTITY('KEY') to /api/ENTITY/KEY
// Converts /api/ENTITY('KEY')/SUBFORM(LINE) to /api/ENTITY/KEY/SUBFORM/LINE
app.use('/api', (req, res, next) => {
  req.url = req.url.replace(/\('([^']+)'\)/g, '/$1');
  req.url = req.url.replace(/\((\d+)\)/g, '/$1');
  next();
});

// Load OpenAPI spec
const openapiPath = path.join(__dirname, '..', 'openapi.yaml');
let swaggerDocument = {};
try {
  const file = fs.readFileSync(openapiPath, 'utf8');
  swaggerDocument = YAML.parse(file);
} catch (err) {
  console.warn('Warning: Could not load openapi.yaml:', err.message);
}

// Public routes (no auth)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    entities: [
      'CUSTOMERS', 'ORDERS', 'LOGPART', 'AINVOICES', 'SUPPLIERS',
      'WORKORDERS', 'BOM', 'PRODUCTIONPLANS', 'EMPLOYEES', 'TIMESHEETS', 'DEPARTMENTS'
    ]
  });
});

app.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').sendFile(openapiPath);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: 'Priority ERP Mock API',
  customCss: '.swagger-ui .topbar { display: none }'
}));

// $metadata endpoint (public)
app.get('/api/\\$metadata', (req, res) => {
  res.json({
    entities: [
      { name: 'CUSTOMERS', key: 'CUSTNAME', fields: ['CUSTNAME', 'CUSTDES', 'PHONE', 'EMAIL', 'ADDRESS', 'CITY', 'STATE', 'COUNTRY', 'BALANCE', 'CREDIT_LIMIT', 'STATUS'] },
      { name: 'ORDERS', key: 'ORDNAME', fields: ['ORDNAME', 'CUSTNAME', 'CURDATE', 'ORDSTATUS', 'QPRICE', 'DETAILS'], subforms: ['ORDERITEMS_SUBFORM'] },
      { name: 'ORDERITEMS_SUBFORM', key: 'LINE', fields: ['LINE', 'PARTNAME', 'TQUANT', 'PRICE', 'DUEDATE', 'KLINE'], parent: 'ORDERS' },
      { name: 'LOGPART', key: 'PARTNAME', fields: ['PARTNAME', 'PARTDES', 'BARCODE', 'UNIT', 'SELLPRICE', 'COSTPRICE', 'INVENTORY', 'FAMILY', 'STATUS'] },
      { name: 'AINVOICES', key: 'IVNUM', fields: ['IVNUM', 'CUSTNAME', 'IVDATE', 'TOTAL', 'IVSTATUS', 'PAYDATE'], subforms: ['AINVOICEITEMS_SUBFORM'] },
      { name: 'AINVOICEITEMS_SUBFORM', key: 'LINE', fields: ['LINE', 'PARTNAME', 'TQUANT', 'PRICE'], parent: 'AINVOICES' },
      { name: 'SUPPLIERS', key: 'SUPNAME', fields: ['SUPNAME', 'SUPDES', 'PHONE', 'EMAIL', 'ADDRESS', 'COUNTRY', 'STATUS'] },
      { name: 'WORKORDERS', key: 'WONUM', fields: ['WONUM', 'PARTNAME', 'TQUANT', 'STARTDATE', 'ENDDATE', 'WOSTATUS', 'PRIORITY'] },
      { name: 'BOM', key: 'BOMNAME', fields: ['BOMNAME', 'PARTNAME', 'BOMDES', 'REVISION', 'STATUS'], subforms: ['BOMITEMS_SUBFORM'] },
      { name: 'BOMITEMS_SUBFORM', key: 'LINE', fields: ['LINE', 'CHILDPART', 'TQUANT', 'UNIT'], parent: 'BOM' },
      { name: 'PRODUCTIONPLANS', key: 'PLANNAME', fields: ['PLANNAME', 'PLANDES', 'STARTDATE', 'ENDDATE', 'STATUS'] },
      { name: 'EMPLOYEES', key: 'EMPNUM', fields: ['EMPNUM', 'EMPNAME', 'DEPT', 'POSITION', 'HIREDATE', 'PHONE', 'EMAIL', 'STATUS'] },
      { name: 'TIMESHEETS', key: 'TSNUM', fields: ['TSNUM', 'EMPNUM', 'TSDATE', 'HOURS', 'PROJECT', 'DESCRIPTION'] },
      { name: 'DEPARTMENTS', key: 'DEPTCODE', fields: ['DEPTCODE', 'DEPTDES', 'MANAGER', 'HEADCOUNT'] },
    ]
  });
});

// Protected routes (require API key)
app.use('/api/CUSTOMERS', authMiddleware, require('./routes/customers'));
app.use('/api/ORDERS', authMiddleware, require('./routes/orders'));
app.use('/api/LOGPART', authMiddleware, require('./routes/products'));
app.use('/api/AINVOICES', authMiddleware, require('./routes/invoices'));
app.use('/api/SUPPLIERS', authMiddleware, require('./routes/suppliers'));
app.use('/api/WORKORDERS', authMiddleware, require('./routes/workOrders'));
app.use('/api/BOM', authMiddleware, require('./routes/bom'));
app.use('/api/PRODUCTIONPLANS', authMiddleware, require('./routes/productionPlans'));
app.use('/api/EMPLOYEES', authMiddleware, require('./routes/employees'));
app.use('/api/TIMESHEETS', authMiddleware, require('./routes/timesheets'));
app.use('/api/DEPARTMENTS', authMiddleware, require('./routes/departments'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.method} ${req.path} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Priority ERP Mock API running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/docs`);
  console.log(`OpenAPI Spec: http://localhost:${PORT}/openapi.yaml`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;

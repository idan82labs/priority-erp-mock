/**
 * Priorit-AI ERP Front-End API Client
 * Communicates with the Priority ERP Mock API
 */

(function () {
  'use strict';

  const config = {
    BASE_URL: '',
    API_KEY: 'priority-adk-workshop-2026'
  };

  /**
   * Core request function for all API calls.
   * @param {string} method - HTTP method (GET, POST, PATCH, DELETE)
   * @param {string} path - API path (e.g. /api/CUSTOMERS)
   * @param {object|null} body - Request body for POST/PATCH
   * @param {object} params - Query parameters ($filter, $orderby, $top, $skip, $select, $expand)
   * @returns {Promise<object>} Parsed JSON response
   */
  async function request(method, path, body = null, params = {}) {
    const headers = {
      'X-API-Key': config.API_KEY
    };

    if (method === 'POST' || method === 'PATCH') {
      headers['Content-Type'] = 'application/json';
    }

    const queryParts = [];
    const validParams = ['$filter', '$orderby', '$top', '$skip', '$select', '$expand'];
    for (const key of Object.keys(params)) {
      if (validParams.includes(key) && params[key] !== undefined && params[key] !== null) {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
      }
    }

    let url = `${config.BASE_URL}${path}`;
    if (queryParts.length > 0) {
      url += `?${queryParts.join('&')}`;
    }

    const options = {
      method,
      headers
    };

    if (body !== null && (method === 'POST' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      let errorInfo;
      try {
        errorInfo = await response.json();
      } catch (e) {
        errorInfo = { message: response.statusText };
      }
      const error = new Error(errorInfo.message || errorInfo.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.details = errorInfo;
      throw error;
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  // ─── Customers ───────────────────────────────────────────────────────────────

  async function getCustomers(params = {}) {
    return request('GET', '/api/CUSTOMERS', null, params);
  }

  async function getCustomer(id) {
    return request('GET', `/api/CUSTOMERS('${id}')`);
  }

  async function createCustomer(data) {
    return request('POST', '/api/CUSTOMERS', data);
  }

  async function updateCustomer(id, data) {
    return request('PATCH', `/api/CUSTOMERS('${id}')`, data);
  }

  async function deleteCustomer(id) {
    return request('DELETE', `/api/CUSTOMERS('${id}')`);
  }

  // ─── Orders ──────────────────────────────────────────────────────────────────

  async function getOrders(params = {}) {
    const merged = { $expand: 'ORDERITEMS_SUBFORM', ...params };
    return request('GET', '/api/ORDERS', null, merged);
  }

  async function getOrder(id, expand = true) {
    const params = expand ? { $expand: 'ORDERITEMS_SUBFORM' } : {};
    return request('GET', `/api/ORDERS('${id}')`, null, params);
  }

  async function createOrder(data) {
    return request('POST', '/api/ORDERS', data);
  }

  async function updateOrder(id, data) {
    return request('PATCH', `/api/ORDERS('${id}')`, data);
  }

  async function deleteOrder(id) {
    return request('DELETE', `/api/ORDERS('${id}')`);
  }

  async function getOrderItems(orderId) {
    return request('GET', `/api/ORDERS('${orderId}')/ORDERITEMS_SUBFORM`);
  }

  async function addOrderItem(orderId, data) {
    return request('POST', `/api/ORDERS('${orderId}')/ORDERITEMS_SUBFORM`, data);
  }

  async function updateOrderItem(orderId, line, data) {
    return request('PATCH', `/api/ORDERS('${orderId}')/ORDERITEMS_SUBFORM(${line})`, data);
  }

  async function deleteOrderItem(orderId, line) {
    return request('DELETE', `/api/ORDERS('${orderId}')/ORDERITEMS_SUBFORM(${line})`);
  }

  // ─── Products ────────────────────────────────────────────────────────────────

  async function getProducts(params = {}) {
    return request('GET', '/api/LOGPART', null, params);
  }

  async function getProduct(id) {
    return request('GET', `/api/LOGPART('${id}')`);
  }

  async function createProduct(data) {
    return request('POST', '/api/LOGPART', data);
  }

  async function updateProduct(id, data) {
    return request('PATCH', `/api/LOGPART('${id}')`, data);
  }

  async function deleteProduct(id) {
    return request('DELETE', `/api/LOGPART('${id}')`);
  }

  // ─── Invoices ────────────────────────────────────────────────────────────────

  async function getInvoices(params = {}) {
    const merged = { $expand: 'AINVOICEITEMS_SUBFORM', ...params };
    return request('GET', '/api/AINVOICES', null, merged);
  }

  async function getInvoice(id) {
    return request('GET', `/api/AINVOICES('${id}')`, null, { $expand: 'AINVOICEITEMS_SUBFORM' });
  }

  async function createInvoice(data) {
    return request('POST', '/api/AINVOICES', data);
  }

  async function updateInvoice(id, data) {
    return request('PATCH', `/api/AINVOICES('${id}')`, data);
  }

  async function deleteInvoice(id) {
    return request('DELETE', `/api/AINVOICES('${id}')`);
  }

  // ─── Suppliers ───────────────────────────────────────────────────────────────

  async function getSuppliers(params = {}) {
    return request('GET', '/api/SUPPLIERS', null, params);
  }

  async function getSupplier(id) {
    return request('GET', `/api/SUPPLIERS('${id}')`);
  }

  async function createSupplier(data) {
    return request('POST', '/api/SUPPLIERS', data);
  }

  async function updateSupplier(id, data) {
    return request('PATCH', `/api/SUPPLIERS('${id}')`, data);
  }

  async function deleteSupplier(id) {
    return request('DELETE', `/api/SUPPLIERS('${id}')`);
  }

  // ─── Work Orders ─────────────────────────────────────────────────────────────

  async function getWorkOrders(params = {}) {
    return request('GET', '/api/WORKORDERS', null, params);
  }

  async function getWorkOrder(id) {
    return request('GET', `/api/WORKORDERS('${id}')`);
  }

  async function createWorkOrder(data) {
    return request('POST', '/api/WORKORDERS', data);
  }

  async function updateWorkOrder(id, data) {
    return request('PATCH', `/api/WORKORDERS('${id}')`, data);
  }

  async function deleteWorkOrder(id) {
    return request('DELETE', `/api/WORKORDERS('${id}')`);
  }

  // ─── BOM ─────────────────────────────────────────────────────────────────────

  async function getBOMs(params = {}) {
    const merged = { $expand: 'BOMITEMS_SUBFORM', ...params };
    return request('GET', '/api/BOM', null, merged);
  }

  async function getBOM(id) {
    return request('GET', `/api/BOM('${id}')`, null, { $expand: 'BOMITEMS_SUBFORM' });
  }

  async function createBOM(data) {
    return request('POST', '/api/BOM', data);
  }

  async function updateBOM(id, data) {
    return request('PATCH', `/api/BOM('${id}')`, data);
  }

  async function deleteBOM(id) {
    return request('DELETE', `/api/BOM('${id}')`);
  }

  async function getBOMItems(bomId) {
    return request('GET', `/api/BOM('${bomId}')/BOMITEMS_SUBFORM`);
  }

  async function addBOMItem(bomId, data) {
    return request('POST', `/api/BOM('${bomId}')/BOMITEMS_SUBFORM`, data);
  }

  // ─── Production Plans ────────────────────────────────────────────────────────

  async function getProductionPlans(params = {}) {
    return request('GET', '/api/PRODUCTIONPLANS', null, params);
  }

  async function createProductionPlan(data) {
    return request('POST', '/api/PRODUCTIONPLANS', data);
  }

  async function updateProductionPlan(id, data) {
    return request('PATCH', `/api/PRODUCTIONPLANS('${id}')`, data);
  }

  async function deleteProductionPlan(id) {
    return request('DELETE', `/api/PRODUCTIONPLANS('${id}')`);
  }

  // ─── Employees ───────────────────────────────────────────────────────────────

  async function getEmployees(params = {}) {
    return request('GET', '/api/EMPLOYEES', null, params);
  }

  async function getEmployee(id) {
    return request('GET', `/api/EMPLOYEES('${id}')`);
  }

  async function createEmployee(data) {
    return request('POST', '/api/EMPLOYEES', data);
  }

  async function updateEmployee(id, data) {
    return request('PATCH', `/api/EMPLOYEES('${id}')`, data);
  }

  async function deleteEmployee(id) {
    return request('DELETE', `/api/EMPLOYEES('${id}')`);
  }

  // ─── Timesheets ──────────────────────────────────────────────────────────────

  async function getTimesheets(params = {}) {
    return request('GET', '/api/TIMESHEETS', null, params);
  }

  async function createTimesheet(data) {
    return request('POST', '/api/TIMESHEETS', data);
  }

  async function updateTimesheet(id, data) {
    return request('PATCH', `/api/TIMESHEETS('${id}')`, data);
  }

  async function deleteTimesheet(id) {
    return request('DELETE', `/api/TIMESHEETS('${id}')`);
  }

  // ─── Departments ─────────────────────────────────────────────────────────────

  async function getDepartments(params = {}) {
    return request('GET', '/api/DEPARTMENTS', null, params);
  }

  async function createDepartment(data) {
    return request('POST', '/api/DEPARTMENTS', data);
  }

  async function updateDepartment(id, data) {
    return request('PATCH', `/api/DEPARTMENTS('${id}')`, data);
  }

  async function deleteDepartment(id) {
    return request('DELETE', `/api/DEPARTMENTS('${id}')`);
  }

  // ─── Health ──────────────────────────────────────────────────────────────────

  async function getHealth() {
    return request('GET', '/api/health');
  }

  // ─── Generic Entity Methods (used by app.js) ────────────────────────────────

  const expandEntities = {
    ORDERS: 'ORDERITEMS_SUBFORM',
    AINVOICES: 'AINVOICEITEMS_SUBFORM',
    BOM: 'BOMITEMS_SUBFORM'
  };

  async function getEntities(entity, params = {}) {
    const odataParams = {};
    if (params.filter) odataParams['$filter'] = params.filter;
    if (params.orderby) odataParams['$orderby'] = params.orderby;
    if (params.top) odataParams['$top'] = String(params.top);
    if (params.skip) odataParams['$skip'] = String(params.skip);
    if (params.select) odataParams['$select'] = params.select;
    if (expandEntities[entity]) odataParams['$expand'] = expandEntities[entity];
    const result = await request('GET', `/api/${entity}`, null, odataParams);
    return result.value || result;
  }

  async function createEntity(entity, data) {
    return request('POST', `/api/${entity}`, data);
  }

  async function updateEntity(entity, key, data) {
    return request('PATCH', `/api/${entity}('${key}')`, data);
  }

  async function deleteEntity(entity, key) {
    return request('DELETE', `/api/${entity}('${key}')`);
  }

  // ─── Export ──────────────────────────────────────────────────────────────────

  window.api = {
    config,
    request,

    // Customers
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,

    // Orders
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderItems,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem,

    // Products
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    // Invoices
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,

    // Suppliers
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,

    // Work Orders
    getWorkOrders,
    getWorkOrder,
    createWorkOrder,
    updateWorkOrder,
    deleteWorkOrder,

    // BOM
    getBOMs,
    getBOM,
    createBOM,
    updateBOM,
    deleteBOM,
    getBOMItems,
    addBOMItem,

    // Production Plans
    getProductionPlans,
    createProductionPlan,
    updateProductionPlan,
    deleteProductionPlan,

    // Employees
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,

    // Timesheets
    getTimesheets,
    createTimesheet,
    updateTimesheet,
    deleteTimesheet,

    // Departments
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,

    // Health
    getHealth,

    // Generic entity methods
    getEntities,
    createEntity,
    updateEntity,
    deleteEntity
  };
})();

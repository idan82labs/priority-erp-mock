/**
 * Priorit-AI ERP Front-End Application
 * Main application logic - depends on window.api (api.js) and window.i18n (i18n.js)
 */

(function () {
  'use strict';

  // ─── Module Configuration ───────────────────────────────────────────────────

  const modules = {
    customers: {
      entity: 'CUSTOMERS', key: 'CUSTNAME',
      columns: ['CUSTNAME', 'CUSTDES', 'PHONE', 'EMAIL', 'CITY', 'COUNTRY', 'BALANCE', 'CREDIT_LIMIT', 'STATUS'],
      formFields: ['CUSTNAME', 'CUSTDES', 'PHONE', 'EMAIL', 'ADDRESS', 'CITY', 'STATE', 'COUNTRY', 'BALANCE', 'CREDIT_LIMIT', 'STATUS']
    },
    orders: {
      entity: 'ORDERS', key: 'ORDNAME',
      columns: ['ORDNAME', 'CUSTNAME', 'CURDATE', 'ORDSTATUS', 'QPRICE', 'DETAILS'],
      formFields: ['ORDNAME', 'CUSTNAME', 'CURDATE', 'ORDSTATUS', 'QPRICE', 'DETAILS'],
      subform: 'ORDERITEMS_SUBFORM',
      subformColumns: ['LINE', 'PARTNAME', 'TQUANT', 'PRICE', 'DUEDATE', 'KLINE']
    },
    products: {
      entity: 'LOGPART', key: 'PARTNAME',
      columns: ['PARTNAME', 'PARTDES', 'UNIT', 'SELLPRICE', 'COSTPRICE', 'INVENTORY', 'FAMILY', 'STATUS'],
      formFields: ['PARTNAME', 'PARTDES', 'BARCODE', 'UNIT', 'SELLPRICE', 'COSTPRICE', 'INVENTORY', 'FAMILY', 'STATUS']
    },
    invoices: {
      entity: 'AINVOICES', key: 'IVNUM',
      columns: ['IVNUM', 'CUSTNAME', 'IVDATE', 'TOTAL', 'IVSTATUS', 'PAYDATE'],
      formFields: ['IVNUM', 'CUSTNAME', 'IVDATE', 'TOTAL', 'IVSTATUS', 'PAYDATE'],
      subform: 'AINVOICEITEMS_SUBFORM',
      subformColumns: ['LINE', 'PARTNAME', 'TQUANT', 'PRICE']
    },
    suppliers: {
      entity: 'SUPPLIERS', key: 'SUPNAME',
      columns: ['SUPNAME', 'SUPDES', 'PHONE', 'EMAIL', 'COUNTRY', 'STATUS'],
      formFields: ['SUPNAME', 'SUPDES', 'PHONE', 'EMAIL', 'ADDRESS', 'COUNTRY', 'STATUS']
    },
    workorders: {
      entity: 'WORKORDERS', key: 'WONUM',
      columns: ['WONUM', 'PARTNAME', 'TQUANT', 'STARTDATE', 'ENDDATE', 'WOSTATUS', 'PRIORITY'],
      formFields: ['WONUM', 'PARTNAME', 'TQUANT', 'STARTDATE', 'ENDDATE', 'WOSTATUS', 'PRIORITY']
    },
    bom: {
      entity: 'BOM', key: 'BOMNAME',
      columns: ['BOMNAME', 'PARTNAME', 'BOMDES', 'REVISION', 'STATUS'],
      formFields: ['BOMNAME', 'PARTNAME', 'BOMDES', 'REVISION', 'STATUS'],
      subform: 'BOMITEMS_SUBFORM',
      subformColumns: ['LINE', 'CHILDPART', 'TQUANT', 'UNIT']
    },
    production: {
      entity: 'PRODUCTIONPLANS', key: 'PLANNAME',
      columns: ['PLANNAME', 'PLANDES', 'STARTDATE', 'ENDDATE', 'STATUS'],
      formFields: ['PLANNAME', 'PLANDES', 'STARTDATE', 'ENDDATE', 'STATUS']
    },
    employees: {
      entity: 'EMPLOYEES', key: 'EMPNUM',
      columns: ['EMPNUM', 'EMPNAME', 'DEPT', 'POSITION', 'HIREDATE', 'PHONE', 'EMAIL', 'STATUS'],
      formFields: ['EMPNUM', 'EMPNAME', 'DEPT', 'POSITION', 'HIREDATE', 'PHONE', 'EMAIL', 'STATUS']
    },
    timesheets: {
      entity: 'TIMESHEETS', key: 'TSNUM',
      columns: ['TSNUM', 'EMPNUM', 'TSDATE', 'HOURS', 'PROJECT', 'DESCRIPTION'],
      formFields: ['TSNUM', 'EMPNUM', 'TSDATE', 'HOURS', 'PROJECT', 'DESCRIPTION']
    },
    departments: {
      entity: 'DEPARTMENTS', key: 'DEPTCODE',
      columns: ['DEPTCODE', 'DEPTDES', 'MANAGER', 'HEADCOUNT'],
      formFields: ['DEPTCODE', 'DEPTDES', 'MANAGER', 'HEADCOUNT']
    }
  };

  // ─── Field Type Definitions ─────────────────────────────────────────────────

  const numberFields = ['BALANCE', 'CREDIT_LIMIT', 'QPRICE', 'TOTAL', 'SELLPRICE', 'COSTPRICE', 'PRICE', 'TQUANT', 'HOURS', 'HEADCOUNT', 'INVENTORY', 'PRIORITY'];
  const dateFields = ['CURDATE', 'IVDATE', 'PAYDATE', 'STARTDATE', 'ENDDATE', 'HIREDATE', 'TSDATE', 'DUEDATE'];
  const statusFields = ['STATUS', 'ORDSTATUS', 'IVSTATUS', 'WOSTATUS'];

  const statusOptions = {
    STATUS: ['Active', 'Inactive', 'Pending', 'Closed'],
    ORDSTATUS: ['Open', 'In Progress', 'Shipped', 'Delivered', 'Cancelled'],
    IVSTATUS: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
    WOSTATUS: ['Planned', 'In Progress', 'Completed', 'On Hold', 'Cancelled']
  };

  // ─── Module Renderers Map ──────────────────────────────────────────────────

  const moduleRenderers = {
    dashboard: loadDashboard,
    orders: renderOrdersModule,
    workorders: renderWorkOrdersModule,
    bom: renderBOMModule,
    products: renderProductsModule,
    invoices: renderInvoicesModule,
    production: renderProductionModule,
    employees: renderEmployeesModule,
    timesheets: renderTimesheetsModule,
    customers: renderCustomersModule,
    suppliers: renderSuppliersModule,
    departments: renderDepartmentsModule
  };

  // ─── App State ──────────────────────────────────────────────────────────────

  let currentModule = 'dashboard';
  let currentData = [];
  let editingItem = null;
  let expandedRow = null;

  // Module-specific view states
  let viewStates = {
    workorders: 'kanban',
    products: 'cards',
    ordersFilter: 'All',
    invoicesFilter: 'All',
    productsFamily: 'all',
    timesheetWeekOffset: 0,
    bomExpanded: {}
  };

  // ─── DOM References ─────────────────────────────────────────────────────────

  const contentArea = () => document.getElementById('content-area-inner');
  const contentActions = () => document.getElementById('content-actions');
  const pageTitle = () => document.getElementById('page-title');
  const loadingOverlay = () => document.getElementById('loading-overlay');
  const modal = () => document.getElementById('modal');
  const modalTitle = () => document.getElementById('modal-title');
  const modalBody = () => document.getElementById('modal-body');
  const toastContainer = () => document.getElementById('toast-container');

  // ─── Loading State ──────────────────────────────────────────────────────────

  function showLoading() {
    const overlay = loadingOverlay();
    if (overlay) overlay.classList.add('visible');
  }

  function hideLoading() {
    const overlay = loadingOverlay();
    if (overlay) overlay.classList.remove('visible');
  }

  // ─── Toast Notifications ────────────────────────────────────────────────────

  function showToast(message, type = 'info') {
    const container = toastContainer();
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────

  function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const moduleName = this.dataset.module;
        if (!moduleName) return;

        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        loadModule(moduleName);
      });
    });
  }

  function loadModule(moduleName) {
    currentModule = moduleName;
    expandedRow = null;

    const title = pageTitle();
    if (title) {
      title.textContent = window.i18n ? window.i18n.t(moduleName) : moduleName;
    }

    const renderer = moduleRenderers[moduleName];
    if (renderer) {
      renderer();
    } else if (modules[moduleName]) {
      loadEntityModule(moduleName);
    }
  }

  // ─── Helper: Translation shortcut ─────────────────────────────────────────

  function t(key) {
    return window.i18n ? window.i18n.t(key) : key;
  }

  // ─── Dashboard (Enhanced) ─────────────────────────────────────────────────

  async function loadDashboard() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) actions.innerHTML = '';

    showLoading();

    try {
      const [customers, orders, products, workorders, invoices] = await Promise.all([
        window.api.getEntities('CUSTOMERS').catch(() => []),
        window.api.getEntities('ORDERS').catch(() => []),
        window.api.getEntities('LOGPART').catch(() => []),
        window.api.getEntities('WORKORDERS').catch(() => []),
        window.api.getEntities('AINVOICES').catch(() => [])
      ]);

      const openOrders = orders.filter(o => o.ORDSTATUS === 'Open');
      const inProgressOrders = orders.filter(o => o.ORDSTATUS === 'In Progress');
      const shippedOrders = orders.filter(o => o.ORDSTATUS === 'Shipped');
      const deliveredOrders = orders.filter(o => o.ORDSTATUS === 'Delivered');
      const activeWOs = workorders.filter(w => w.WOSTATUS === 'In Progress');
      const lowStock = products.filter(p => p.INVENTORY < 20);
      const overdueInvoices = invoices.filter(i => i.IVSTATUS === 'Overdue');
      const lateWOs = workorders.filter(w => {
        if (w.WOSTATUS === 'Completed' || w.WOSTATUS === 'Cancelled') return false;
        if (!w.ENDDATE) return false;
        return new Date(w.ENDDATE) < new Date();
      });

      let html = '';

      // KPI Cards with trends
      html += '<div class="dashboard-grid">';
      html += renderKpiCard(t('total_customers'), customers.length, '#3b82f6');
      html += renderKpiCard(t('open_orders'), openOrders.length, '#f59e0b');
      html += renderKpiCard(t('total_products'), products.length, '#10b981');
      html += renderKpiCard(t('active_workorders'), activeWOs.length, '#8b5cf6');
      html += '</div>';

      // Order Pipeline Bar
      html += '<div class="dashboard-section">';
      html += `<h3 class="section-title">${t('order_pipeline')}</h3>`;
      const totalOrders = orders.length || 1;
      html += '<div class="pipeline-bar">';
      if (openOrders.length) html += `<div class="pipeline-segment seg-open" style="flex:${openOrders.length}">${openOrders.length}</div>`;
      if (inProgressOrders.length) html += `<div class="pipeline-segment seg-in-progress" style="flex:${inProgressOrders.length}">${inProgressOrders.length}</div>`;
      if (shippedOrders.length) html += `<div class="pipeline-segment seg-shipped" style="flex:${shippedOrders.length}">${shippedOrders.length}</div>`;
      if (deliveredOrders.length) html += `<div class="pipeline-segment seg-delivered" style="flex:${deliveredOrders.length}">${deliveredOrders.length}</div>`;
      html += '</div>';
      html += '<div class="pipeline-legend">';
      html += `<div class="pipeline-legend-item"><div class="pipeline-legend-color" style="background:var(--info)"></div>${t('open')} (${openOrders.length})</div>`;
      html += `<div class="pipeline-legend-item"><div class="pipeline-legend-color" style="background:var(--warning)"></div>${t('in_progress')} (${inProgressOrders.length})</div>`;
      html += `<div class="pipeline-legend-item"><div class="pipeline-legend-color" style="background:#8e44ad"></div>${t('shipped')} (${shippedOrders.length})</div>`;
      html += `<div class="pipeline-legend-item"><div class="pipeline-legend-color" style="background:var(--success)"></div>${t('delivered')} (${deliveredOrders.length})</div>`;
      html += '</div>';
      html += '</div>';

      // WO Status Gauge + Alerts side by side
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">';

      // WO Status Gauge
      html += '<div class="dashboard-section" style="margin-bottom:0">';
      html += `<h3 class="section-title">${t('wo_status_gauge')}</h3>`;
      const woPlanned = workorders.filter(w => w.WOSTATUS === 'Planned').length;
      const woInProg = activeWOs.length;
      const woCompleted = workorders.filter(w => w.WOSTATUS === 'Completed').length;
      const woTotal = workorders.length || 1;
      const pPlanned = Math.round((woPlanned / woTotal) * 100);
      const pInProg = Math.round((woInProg / woTotal) * 100);
      const pCompleted = Math.round((woCompleted / woTotal) * 100);
      const pOther = 100 - pPlanned - pInProg - pCompleted;
      html += `<div class="status-gauge" style="background:conic-gradient(var(--info) 0% ${pPlanned}%, var(--warning) ${pPlanned}% ${pPlanned + pInProg}%, var(--success) ${pPlanned + pInProg}% ${pPlanned + pInProg + pCompleted}%, var(--gray-300) ${pPlanned + pInProg + pCompleted}% 100%)">`;
      html += `<div class="status-gauge-center"><span class="status-gauge-value">${workorders.length}</span><span class="status-gauge-label">Total</span></div>`;
      html += '</div>';
      html += '<div class="pipeline-legend" style="justify-content:center">';
      html += `<div class="pipeline-legend-item"><div class="pipeline-legend-color" style="background:var(--info)"></div>${t('planned')} ${woPlanned}</div>`;
      html += `<div class="pipeline-legend-item"><div class="pipeline-legend-color" style="background:var(--warning)"></div>${t('in_progress')} ${woInProg}</div>`;
      html += `<div class="pipeline-legend-item"><div class="pipeline-legend-color" style="background:var(--success)"></div>${t('completed')} ${woCompleted}</div>`;
      html += '</div>';
      html += '</div>';

      // Alerts
      html += '<div class="alerts-section" style="margin-bottom:0">';
      html += `<div class="alerts-title">${t('alerts')}</div>`;
      if (overdueInvoices.length > 0) {
        html += `<div class="alert-item alert-danger"><span class="alert-icon">!</span><span class="alert-text">${overdueInvoices.length} ${t('overdue_invoices')}</span></div>`;
      }
      if (lowStock.length > 0) {
        html += `<div class="alert-item alert-warning"><span class="alert-icon">!</span><span class="alert-text">${lowStock.length} ${t('low_stock_warning')}</span></div>`;
      }
      if (lateWOs.length > 0) {
        html += `<div class="alert-item alert-warning"><span class="alert-icon">!</span><span class="alert-text">${lateWOs.length} ${t('late_work_orders')}</span></div>`;
      }
      if (overdueInvoices.length === 0 && lowStock.length === 0 && lateWOs.length === 0) {
        html += `<div class="alert-item alert-info"><span class="alert-icon">&#10003;</span><span class="alert-text">No alerts</span></div>`;
      }
      html += '</div>';

      html += '</div>'; // grid

      // Mini Gantt of active production plans
      const plans = await window.api.getEntities('PRODUCTIONPLANS').catch(() => []);
      if (plans.length > 0) {
        html += '<div class="dashboard-section">';
        html += `<h3 class="section-title">${t('production')}</h3>`;
        html += renderMiniGantt(plans.slice(0, 6));
        html += '</div>';
      }

      content.innerHTML = html;

    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderKpiCard(label, value, color) {
    return `
      <div class="kpi-card" style="border-top: 3px solid ${color}">
        <div class="kpi-value" style="color: ${color}">${value}</div>
        <div class="kpi-label">${label}</div>
      </div>
    `;
  }

  function renderMiniGantt(plans) {
    if (!plans.length) return '';
    const allDates = plans.flatMap(p => [p.STARTDATE, p.ENDDATE]).filter(Boolean).map(d => new Date(d).getTime());
    const minDate = Math.min(...allDates, Date.now());
    const maxDate = Math.max(...allDates, Date.now());
    const range = maxDate - minDate || 1;

    let html = '<div style="position:relative;padding-left:140px">';
    plans.forEach(p => {
      const start = p.STARTDATE ? new Date(p.STARTDATE).getTime() : minDate;
      const end = p.ENDDATE ? new Date(p.ENDDATE).getTime() : maxDate;
      const left = ((start - minDate) / range) * 100;
      const width = Math.max(((end - start) / range) * 100, 3);
      const statusClass = p.STATUS === 'Active' ? 'status-active' : p.STATUS === 'Completed' ? 'status-completed' : 'status-planned';
      html += '<div class="gantt-row">';
      html += `<div class="gantt-row-label">${escapeHtml(p.PLANNAME || '')}</div>`;
      html += '<div class="gantt-row-track">';
      html += `<div class="gantt-bar ${statusClass}" style="left:${left}%;width:${width}%">${escapeHtml(p.PLANDES || '')}</div>`;
      html += '</div></div>';
    });
    // Today marker
    const todayPos = ((Date.now() - minDate) / range) * 100;
    if (todayPos >= 0 && todayPos <= 100) {
      html += `<div class="gantt-today" style="left:calc(140px + ${todayPos}%)"></div>`;
    }
    html += '</div>';
    return html;
  }

  // ─── Orders Module (Tabs + Expandable Rows) ───────────────────────────────

  async function renderOrdersModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('orders', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('ORDERS');
      renderOrdersView();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderOrdersView() {
    const content = contentArea();
    const filter = viewStates.ordersFilter;
    const filtered = filter === 'All' ? currentData : currentData.filter(o => o.ORDSTATUS === filter);

    // Summary bar
    const totalValue = currentData.reduce((sum, o) => sum + (parseFloat(o.QPRICE) || 0), 0);
    const avgValue = currentData.length ? totalValue / currentData.length : 0;

    let html = '';

    // Summary
    html += '<div class="summary-bar">';
    html += `<div class="summary-item"><div class="summary-value">${currentData.length}</div><div class="summary-label">${t('total_orders')}</div></div>`;
    html += `<div class="summary-item"><div class="summary-value">$${totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="summary-label">${t('total_value')}</div></div>`;
    html += `<div class="summary-item"><div class="summary-value">$${avgValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="summary-label">${t('avg_value')}</div></div>`;
    html += '</div>';

    // Status tabs
    const statuses = ['All', 'Open', 'In Progress', 'Shipped', 'Delivered', 'Cancelled'];
    html += '<div class="status-tabs">';
    statuses.forEach(s => {
      const count = s === 'All' ? currentData.length : currentData.filter(o => o.ORDSTATUS === s).length;
      const activeClass = filter === s ? ' active' : '';
      const label = t(s.toLowerCase().replace(/\s+/g, '_')) || s;
      html += `<div class="status-tab${activeClass}" data-filter="${s}">${label} <span class="tab-count">${count}</span></div>`;
    });
    html += '</div>';

    // Table
    if (filtered.length === 0) {
      html += `<div class="empty-state"><p>${t('no_data')}</p></div>`;
    } else {
      html += renderOrdersTable(filtered);
    }

    content.innerHTML = html;

    // Tab click handlers
    content.querySelectorAll('.status-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        viewStates.ordersFilter = tab.dataset.filter;
        renderOrdersView();
      });
    });

    // Row expansion and action handlers
    attachOrderTableListeners();
  }

  function renderOrdersTable(data) {
    const config = modules.orders;
    let html = '<div class="table-container"><table class="data-table"><thead><tr>';
    config.columns.forEach(col => {
      const alignClass = numberFields.includes(col) ? ' class="text-right"' : '';
      html += `<th${alignClass}>${t(col)}</th>`;
    });
    html += `<th class="actions-col">${t('actions')}</th></tr></thead><tbody>`;

    data.forEach((row, index) => {
      const dataIndex = currentData.indexOf(row);
      const isExpanded = expandedRow === dataIndex;
      html += `<tr class="data-row expandable${isExpanded ? ' expanded' : ''}" data-index="${dataIndex}">`;
      config.columns.forEach(col => {
        html += `<td class="${getCellClass(col)}">${formatCellValue(col, row[col])}</td>`;
      });
      html += '<td class="actions-col">';
      html += `<button class="btn btn-sm btn-edit" data-index="${dataIndex}" title="${t('edit')}">${t('edit')}</button>`;
      html += `<button class="btn btn-sm btn-delete" data-index="${dataIndex}" title="${t('delete')}">${t('delete')}</button>`;
      html += '</td></tr>';

      if (isExpanded) {
        html += renderSubformRow('orders', row, config.columns.length + 1);
      }
    });

    html += '</tbody></table></div>';
    return html;
  }

  function attachOrderTableListeners() {
    document.querySelectorAll('.data-row.expandable').forEach(row => {
      row.addEventListener('click', function (e) {
        if (e.target.closest('.btn')) return;
        const index = parseInt(this.dataset.index);
        expandedRow = expandedRow === index ? null : index;
        renderOrdersView();
      });
    });
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal('orders', currentData[parseInt(this.dataset.index)]);
      });
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        handleDelete('orders', currentData[parseInt(this.dataset.index)]);
      });
    });
  }

  // ─── Work Orders Module (Kanban) ──────────────────────────────────────────

  async function renderWorkOrdersModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `
        <div class="view-toggle">
          <button class="view-toggle-btn${viewStates.workorders === 'kanban' ? ' active' : ''}" data-view="kanban">${t('view_kanban')}</button>
          <button class="view-toggle-btn${viewStates.workorders === 'table' ? ' active' : ''}" data-view="table">${t('view_table')}</button>
        </div>
        <button class="btn btn-primary" id="btn-add-new" style="margin-left:8px">${t('add_new')}</button>
      `;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('workorders', null));
      actions.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          viewStates.workorders = btn.dataset.view;
          renderWorkOrdersView();
          actions.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewStates.workorders));
        });
      });
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('WORKORDERS');
      renderWorkOrdersView();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderWorkOrdersView() {
    const content = contentArea();
    if (viewStates.workorders === 'kanban') {
      renderWorkOrdersKanban(content);
    } else {
      renderTable('workorders', modules.workorders.columns, currentData);
    }
  }

  function renderWorkOrdersKanban(content) {
    const columns = [
      { key: 'Planned', class: 'col-planned', label: t('planned') },
      { key: 'In Progress', class: 'col-in-progress', label: t('in_progress') },
      { key: 'Completed', class: 'col-completed', label: t('completed') },
      { key: 'On Hold', class: 'col-on-hold', label: t('on_hold') }
    ];

    let html = '<div class="kanban-board">';
    columns.forEach(col => {
      const items = currentData.filter(w => w.WOSTATUS === col.key);
      html += `<div class="kanban-column ${col.class}">`;
      html += '<div class="kanban-column-header">';
      html += `<span class="kanban-column-title">${col.label}</span>`;
      html += `<span class="kanban-column-count">${items.length}</span>`;
      html += '</div>';
      html += '<div class="kanban-cards">';
      items.forEach(wo => {
        const priority = getPriorityClass(wo.PRIORITY);
        const isAnomaly = isWorkOrderAnomaly(wo);
        html += `<div class="kanban-card ${priority}${isAnomaly ? ' anomaly' : ''}" data-wonum="${escapeHtml(wo.WONUM || '')}">`;
        html += `<div class="kanban-card-title">${escapeHtml(wo.WONUM || '')}</div>`;
        html += `<div class="kanban-card-subtitle">${escapeHtml(wo.PARTNAME || '')}</div>`;
        html += '<div class="kanban-card-meta">';
        html += `<span class="kanban-card-qty">${t('TQUANT')}: ${(wo.TQUANT || 0).toLocaleString()}</span>`;
        if (wo.STARTDATE) {
          html += `<span>${formatDateShort(wo.STARTDATE)}</span>`;
        }
        html += '</div>';
        html += renderDurationBar(wo);
        html += '</div>';
      });
      html += '</div></div>';
    });
    html += '</div>';

    content.innerHTML = html;
  }

  function getPriorityClass(priority) {
    const p = parseInt(priority);
    if (p >= 8) return 'priority-high';
    if (p >= 4) return 'priority-medium';
    return 'priority-low';
  }

  function isWorkOrderAnomaly(wo) {
    if (wo.WOSTATUS === 'Completed' || wo.WOSTATUS === 'Cancelled') return false;
    if (!wo.ENDDATE) return false;
    return new Date(wo.ENDDATE) < new Date();
  }

  function renderDurationBar(wo) {
    if (!wo.STARTDATE || !wo.ENDDATE) return '';
    const start = new Date(wo.STARTDATE).getTime();
    const end = new Date(wo.ENDDATE).getTime();
    const now = Date.now();
    const total = end - start;
    if (total <= 0) return '';
    const elapsed = Math.min(now - start, total);
    const pct = Math.max(0, Math.min(100, (elapsed / total) * 100));
    let cls = 'on-track';
    if (pct > 90) cls = 'overdue';
    else if (pct > 70) cls = 'warning';
    return `<div class="duration-bar"><div class="duration-elapsed ${cls}" style="width:${pct}%"></div></div>`;
  }

  function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  // ─── BOM Module (Tree View) ───────────────────────────────────────────────

  async function renderBOMModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('bom', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('BOM');
      renderBOMTree();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderBOMTree() {
    const content = contentArea();
    if (!currentData || currentData.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    let html = '<div class="tree-view">';
    currentData.forEach((bom, index) => {
      const isExpanded = viewStates.bomExpanded[index];
      const subItems = bom.BOMITEMS_SUBFORM || [];
      html += `<div class="tree-node${isExpanded ? ' expanded' : ''}" data-index="${index}">`;
      html += '<div class="tree-node-header">';
      html += `<span class="tree-expand">${subItems.length > 0 ? '&#9654;' : ''}</span>`;
      html += '<div class="tree-node-content">';
      html += `<span class="tree-node-name">${escapeHtml(bom.BOMNAME || '')}</span>`;
      html += `<span class="tree-node-desc">${escapeHtml(bom.BOMDES || '')} - ${escapeHtml(bom.PARTNAME || '')}</span>`;
      if (bom.REVISION) html += `<span class="tree-node-badge badge badge-info">Rev ${escapeHtml(bom.REVISION)}</span>`;
      if (bom.STATUS) html += `<span class="tree-node-badge">${renderStatusBadge(bom.STATUS)}</span>`;
      html += '</div></div>';

      // Children
      if (subItems.length > 0) {
        html += '<div class="tree-children">';
        subItems.forEach(item => {
          html += '<div class="tree-child-item">';
          html += `<span class="tree-child-name">${escapeHtml(item.CHILDPART || '')}</span>`;
          html += `<span class="tree-child-qty">${t('TQUANT')}: ${(item.TQUANT || 0).toLocaleString()}</span>`;
          html += `<span class="tree-child-unit">${escapeHtml(item.UNIT || '')}</span>`;
          html += '</div>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    html += '</div>';

    content.innerHTML = html;

    // Toggle expansion
    content.querySelectorAll('.tree-node-header').forEach(header => {
      header.addEventListener('click', () => {
        const node = header.closest('.tree-node');
        const index = parseInt(node.dataset.index);
        viewStates.bomExpanded[index] = !viewStates.bomExpanded[index];
        renderBOMTree();
      });
    });
  }

  // ─── Products Module (Card Grid + Stock Gauges) ────────────────────────────

  async function renderProductsModule() {
    const content = contentArea();
    const actions = contentActions();

    showLoading();
    try {
      currentData = await window.api.getEntities('LOGPART');
      renderProductsActions();
      renderProductsView();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderProductsActions() {
    const actions = contentActions();
    if (!actions) return;

    const families = [...new Set(currentData.map(p => p.FAMILY).filter(Boolean))];

    actions.innerHTML = `
      <select class="filter-dropdown" id="family-filter">
        <option value="all">${t('all_families')}</option>
        ${families.map(f => `<option value="${escapeHtml(f)}"${viewStates.productsFamily === f ? ' selected' : ''}>${escapeHtml(f)}</option>`).join('')}
      </select>
      <div class="view-toggle">
        <button class="view-toggle-btn${viewStates.products === 'cards' ? ' active' : ''}" data-view="cards">${t('view_cards')}</button>
        <button class="view-toggle-btn${viewStates.products === 'table' ? ' active' : ''}" data-view="table">${t('view_table')}</button>
      </div>
      <button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>
    `;

    document.getElementById('btn-add-new').addEventListener('click', () => openModal('products', null));
    document.getElementById('family-filter').addEventListener('change', (e) => {
      viewStates.productsFamily = e.target.value;
      renderProductsView();
    });
    actions.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        viewStates.products = btn.dataset.view;
        renderProductsView();
        actions.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewStates.products));
      });
    });
  }

  function renderProductsView() {
    const content = contentArea();
    let filtered = currentData;
    if (viewStates.productsFamily !== 'all') {
      filtered = currentData.filter(p => p.FAMILY === viewStates.productsFamily);
    }

    if (viewStates.products === 'cards') {
      renderProductCards(content, filtered);
    } else {
      renderTable('products', modules.products.columns, filtered);
    }
  }

  function renderProductCards(content, data) {
    if (!data || data.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    let html = '<div class="card-grid">';
    data.forEach(product => {
      const inv = parseInt(product.INVENTORY) || 0;
      const isLow = inv < 20;
      const maxStock = 200;
      const pct = Math.min(100, (inv / maxStock) * 100);
      let gaugeClass = 'level-good';
      if (inv < 10) gaugeClass = 'level-danger';
      else if (inv < 30) gaugeClass = 'level-warning';

      html += `<div class="entity-card${isLow ? ' low-stock' : ''}">`;
      html += '<div class="entity-card-header">';
      html += `<div><div class="entity-card-title">${escapeHtml(product.PARTNAME || '')}</div>`;
      html += `<div class="entity-card-subtitle">${escapeHtml(product.PARTDES || '')}</div></div>`;
      if (product.FAMILY) html += `<span class="family-badge">${escapeHtml(product.FAMILY)}</span>`;
      html += '</div>';
      html += '<div class="entity-card-body">';
      html += `<span class="price-tag">$${(parseFloat(product.SELLPRICE) || 0).toLocaleString()}</span>`;
      html += '</div>';
      html += '<div class="stock-gauge">';
      html += `<div class="stock-gauge-label"><span>${t('stock_level')}</span><span>${inv} ${product.UNIT || ''}</span></div>`;
      html += `<div class="gauge-bar"><div class="gauge-fill ${gaugeClass}" style="width:${pct}%"></div></div>`;
      html += '</div>';
      if (isLow) {
        html += `<div class="entity-card-footer"><span class="stock-warning">${t('low_stock_warning')}</span></div>`;
      }
      html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;
  }

  // ─── Invoices Module (Aging Analysis) ─────────────────────────────────────

  async function renderInvoicesModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('invoices', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('AINVOICES');
      renderInvoicesView();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderInvoicesView() {
    const content = contentArea();
    const filter = viewStates.invoicesFilter;
    const filtered = filter === 'All' ? currentData : currentData.filter(i => i.IVSTATUS === filter);

    const now = new Date();
    let agingCurrent = 0, aging30 = 0, aging60 = 0, aging90 = 0;
    currentData.forEach(inv => {
      if (inv.IVSTATUS === 'Paid') return;
      const total = parseFloat(inv.TOTAL) || 0;
      const invDate = inv.IVDATE ? new Date(inv.IVDATE) : now;
      const daysDiff = Math.floor((now - invDate) / (1000 * 60 * 60 * 24));
      if (daysDiff > 90) aging90 += total;
      else if (daysDiff > 60) aging60 += total;
      else if (daysDiff > 30) aging30 += total;
      else agingCurrent += total;
    });

    const totalInvoiced = currentData.reduce((s, i) => s + (parseFloat(i.TOTAL) || 0), 0);
    const totalPaid = currentData.filter(i => i.IVSTATUS === 'Paid').reduce((s, i) => s + (parseFloat(i.TOTAL) || 0), 0);
    const totalOutstanding = totalInvoiced - totalPaid;

    let html = '';

    // Aging buckets
    html += '<div class="aging-buckets">';
    html += `<div class="aging-bucket bucket-current"><div class="aging-bucket-value">$${agingCurrent.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="aging-bucket-label">${t('aging_current')}</div></div>`;
    html += `<div class="aging-bucket bucket-30"><div class="aging-bucket-value">$${aging30.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="aging-bucket-label">${t('aging_30_60')}</div></div>`;
    html += `<div class="aging-bucket bucket-60"><div class="aging-bucket-value">$${aging60.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="aging-bucket-label">${t('aging_60_90')}</div></div>`;
    html += `<div class="aging-bucket bucket-90"><div class="aging-bucket-value">$${aging90.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="aging-bucket-label">${t('aging_90_plus')}</div></div>`;
    html += '</div>';

    // Summary bar
    html += '<div class="summary-bar">';
    html += `<div class="summary-item"><div class="summary-value">$${totalInvoiced.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="summary-label">${t('total_invoiced')}</div></div>`;
    html += `<div class="summary-item"><div class="summary-value">$${totalPaid.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="summary-label">${t('total_paid')}</div></div>`;
    html += `<div class="summary-item"><div class="summary-value">$${totalOutstanding.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="summary-label">${t('total_outstanding')}</div></div>`;
    html += '</div>';

    // Status tabs
    const statuses = ['All', 'Draft', 'Sent', 'Paid', 'Overdue'];
    html += '<div class="status-tabs">';
    statuses.forEach(s => {
      const count = s === 'All' ? currentData.length : currentData.filter(i => i.IVSTATUS === s).length;
      const activeClass = filter === s ? ' active' : '';
      const label = t(s.toLowerCase());
      html += `<div class="status-tab${activeClass}" data-filter="${s}">${label} <span class="tab-count">${count}</span></div>`;
    });
    html += '</div>';

    // Table
    if (filtered.length === 0) {
      html += `<div class="empty-state"><p>${t('no_data')}</p></div>`;
    } else {
      html += renderInvoicesTable(filtered);
    }

    content.innerHTML = html;

    // Tab click handlers
    content.querySelectorAll('.status-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        viewStates.invoicesFilter = tab.dataset.filter;
        renderInvoicesView();
      });
    });

    // Action handlers
    content.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal('invoices', currentData[parseInt(this.dataset.index)]);
      });
    });
    content.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        handleDelete('invoices', currentData[parseInt(this.dataset.index)]);
      });
    });
  }

  function renderInvoicesTable(data) {
    const config = modules.invoices;
    let html = '<div class="table-container"><table class="data-table"><thead><tr>';
    config.columns.forEach(col => {
      const alignClass = numberFields.includes(col) ? ' class="text-right"' : '';
      html += `<th${alignClass}>${t(col)}</th>`;
    });
    html += `<th class="actions-col">${t('actions')}</th></tr></thead><tbody>`;

    data.forEach(row => {
      const dataIndex = currentData.indexOf(row);
      const isOverdue = row.IVSTATUS === 'Overdue';
      html += `<tr class="data-row${isOverdue ? ' row-overdue' : ''}" data-index="${dataIndex}">`;
      config.columns.forEach(col => {
        html += `<td class="${getCellClass(col)}">${formatCellValue(col, row[col])}</td>`;
      });
      html += '<td class="actions-col">';
      html += `<button class="btn btn-sm btn-edit" data-index="${dataIndex}" title="${t('edit')}">${t('edit')}</button>`;
      html += `<button class="btn btn-sm btn-delete" data-index="${dataIndex}" title="${t('delete')}">${t('delete')}</button>`;
      html += '</td></tr>';
    });

    html += '</tbody></table></div>';
    return html;
  }

  // ─── Production Plans Module (Gantt) ──────────────────────────────────────

  async function renderProductionModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('production', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('PRODUCTIONPLANS');
      renderProductionGantt();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderProductionGantt() {
    const content = contentArea();
    if (!currentData || currentData.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    // Compute date range
    const allDates = currentData.flatMap(p => [p.STARTDATE, p.ENDDATE]).filter(Boolean).map(d => new Date(d).getTime());
    allDates.push(Date.now());
    const minDate = Math.min(...allDates);
    const maxDate = Math.max(...allDates);
    const range = maxDate - minDate || 1;

    // Generate week labels
    const weeks = [];
    let cursor = new Date(minDate);
    cursor.setDate(cursor.getDate() - cursor.getDay()); // Start of week
    while (cursor.getTime() < maxDate + 7 * 24 * 60 * 60 * 1000) {
      weeks.push(new Date(cursor));
      cursor = new Date(cursor.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    let html = '<div class="gantt-container">';
    html += '<div class="gantt-header">';
    html += `<div class="gantt-title">${t('timeline')}</div>`;
    html += '</div>';

    // Axis
    html += '<div class="gantt-axis">';
    weeks.forEach(w => {
      html += `<div class="gantt-axis-label">${w.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>`;
    });
    html += '</div>';

    // Rows
    html += '<div class="gantt-rows">';
    currentData.forEach(plan => {
      const start = plan.STARTDATE ? new Date(plan.STARTDATE).getTime() : minDate;
      const end = plan.ENDDATE ? new Date(plan.ENDDATE).getTime() : maxDate;
      const left = ((start - minDate) / range) * 100;
      const width = Math.max(((end - start) / range) * 100, 2);
      let statusClass = 'status-planned';
      if (plan.STATUS === 'Active') statusClass = 'status-active';
      else if (plan.STATUS === 'Completed') statusClass = 'status-completed';
      else if (plan.STATUS === 'On Hold') statusClass = 'status-on-hold';

      html += '<div class="gantt-row">';
      html += `<div class="gantt-row-label" title="${escapeHtml(plan.PLANDES || '')}">${escapeHtml(plan.PLANNAME || '')}</div>`;
      html += '<div class="gantt-row-track">';
      html += `<div class="gantt-bar ${statusClass}" style="left:${left}%;width:${width}%">${escapeHtml(plan.PLANDES || '')}</div>`;
      html += '</div></div>';
    });

    // Today marker
    const todayPos = ((Date.now() - minDate) / range) * 100;
    if (todayPos >= 0 && todayPos <= 100) {
      html += `<div class="gantt-today" style="left:${todayPos}%"></div>`;
    }
    html += '</div>'; // gantt-rows
    html += '</div>'; // gantt-container

    // Table fallback
    html += '<div style="margin-top:16px">';
    html += renderGenericTable('production', modules.production.columns, currentData);
    html += '</div>';

    content.innerHTML = html;
    attachGenericTableListeners('production');
  }

  // ─── Employees Module (Department Cards) ──────────────────────────────────

  async function renderEmployeesModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('employees', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('EMPLOYEES');
      renderEmployeesCards();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderEmployeesCards() {
    const content = contentArea();
    if (!currentData || currentData.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    // Group by department
    const deptMap = {};
    currentData.forEach(emp => {
      const dept = emp.DEPT || 'Other';
      if (!deptMap[dept]) deptMap[dept] = [];
      deptMap[dept].push(emp);
    });

    let html = '';
    Object.keys(deptMap).sort().forEach(dept => {
      const emps = deptMap[dept];
      html += '<div class="dept-section">';
      html += '<div class="dept-section-header">';
      html += `<span class="dept-section-title">${escapeHtml(dept)}</span>`;
      html += `<span class="dept-section-count">${emps.length} ${t('employees').toLowerCase()}</span>`;
      html += '</div>';
      html += '<div class="card-grid">';
      emps.forEach(emp => {
        const initials = (emp.EMPNAME || 'U').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        html += '<div class="dept-card">';
        html += `<div class="dept-card-avatar">${initials}</div>`;
        html += '<div class="dept-card-info">';
        html += `<div class="dept-card-name">${escapeHtml(emp.EMPNAME || '')}</div>`;
        html += `<div class="dept-card-position">${escapeHtml(emp.POSITION || '')}</div>`;
        if (emp.HIREDATE) html += `<div class="dept-card-meta">${t('HIREDATE')}: ${formatDateShort(emp.HIREDATE)}</div>`;
        html += '</div>';
        html += `<div>${renderStatusBadge(emp.STATUS || 'Active')}</div>`;
        html += '</div>';
      });
      html += '</div></div>';
    });

    content.innerHTML = html;
  }

  // ─── Timesheets Module (Weekly Grid) ──────────────────────────────────────

  async function renderTimesheetsModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('timesheets', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('TIMESHEETS');
      renderTimesheetGrid();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderTimesheetGrid() {
    const content = contentArea();
    if (!currentData || currentData.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    // Determine the week based on offset
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + (viewStates.timesheetWeekOffset * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      days.push(d);
    }

    // Group by employee
    const empMap = {};
    currentData.forEach(ts => {
      const emp = ts.EMPNUM || 'Unknown';
      if (!empMap[emp]) empMap[emp] = {};
      if (ts.TSDATE) {
        const tsDate = new Date(ts.TSDATE).toISOString().substring(0, 10);
        empMap[emp][tsDate] = (empMap[emp][tsDate] || 0) + (parseFloat(ts.HOURS) || 0);
      }
    });

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let html = '<div class="weekly-grid-container">';

    // Navigation
    html += '<div class="weekly-grid-nav">';
    html += `<button class="btn btn-sm btn-ghost" id="ts-prev">${t('prev')}</button>`;
    html += `<span class="week-label">${weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>`;
    html += `<button class="btn btn-sm btn-ghost" id="ts-next">${t('next')}</button>`;
    html += '</div>';

    // Grid table
    html += '<table class="weekly-grid"><thead><tr>';
    html += `<th>${t('EMPNUM')}</th>`;
    days.forEach((d, i) => {
      html += `<th>${dayNames[d.getDay()]}<br>${d.getDate()}</th>`;
    });
    html += `<th class="total-col">${t('TOTAL')}</th>`;
    html += '</tr></thead><tbody>';

    const dayTotals = new Array(7).fill(0);

    Object.keys(empMap).sort().forEach(emp => {
      html += '<tr>';
      html += `<td>${escapeHtml(emp)}</td>`;
      let empTotal = 0;
      days.forEach((d, i) => {
        const dateKey = d.toISOString().substring(0, 10);
        const hours = empMap[emp][dateKey] || 0;
        empTotal += hours;
        dayTotals[i] += hours;
        const cls = getHoursClass(hours);
        html += `<td class="hours-cell"><span class="hours-indicator ${cls}">${hours > 0 ? hours : '-'}</span></td>`;
      });
      html += `<td class="total-col">${empTotal > 0 ? empTotal : '-'}</td>`;
      html += '</tr>';
    });

    // Summary row
    html += '<tr class="summary-row">';
    html += `<td>${t('TOTAL')}</td>`;
    dayTotals.forEach(total => {
      html += `<td>${total > 0 ? total : '-'}</td>`;
    });
    const grandTotal = dayTotals.reduce((s, v) => s + v, 0);
    html += `<td>${grandTotal > 0 ? grandTotal : '-'}</td>`;
    html += '</tr>';

    html += '</tbody></table></div>';

    content.innerHTML = html;

    // Nav buttons
    const prevBtn = document.getElementById('ts-prev');
    const nextBtn = document.getElementById('ts-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { viewStates.timesheetWeekOffset--; renderTimesheetGrid(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { viewStates.timesheetWeekOffset++; renderTimesheetGrid(); });
  }

  function getHoursClass(hours) {
    if (hours === 0) return 'hours-0';
    if (hours <= 4) return 'hours-low';
    if (hours <= 8) return 'hours-med';
    if (hours <= 10) return 'hours-high';
    return 'hours-over';
  }

  // ─── Customers Module (Credit Bars) ───────────────────────────────────────

  async function renderCustomersModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('customers', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('CUSTOMERS');
      renderCustomersView();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderCustomersView() {
    const content = contentArea();
    if (!currentData || currentData.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    const totalBalance = currentData.reduce((s, c) => s + (parseFloat(c.BALANCE) || 0), 0);
    const totalCredit = currentData.reduce((s, c) => s + (parseFloat(c.CREDIT_LIMIT) || 0), 0);
    const avgUtil = totalCredit > 0 ? Math.round((totalBalance / totalCredit) * 100) : 0;

    let html = '';

    // Summary cards
    html += '<div class="summary-bar">';
    html += `<div class="summary-item"><div class="summary-value">${currentData.length}</div><div class="summary-label">${t('total_customers_count')}</div></div>`;
    html += `<div class="summary-item"><div class="summary-value">$${totalBalance.toLocaleString(undefined, {maximumFractionDigits: 0})}</div><div class="summary-label">${t('total_balance')}</div></div>`;
    html += `<div class="summary-item"><div class="summary-value">${avgUtil}%</div><div class="summary-label">${t('avg_credit')}</div></div>`;
    html += '</div>';

    // Table with credit bars
    const config = modules.customers;
    html += '<div class="table-container"><table class="data-table"><thead><tr>';
    config.columns.forEach(col => {
      const alignClass = numberFields.includes(col) ? ' class="text-right"' : '';
      html += `<th${alignClass}>${t(col)}</th>`;
    });
    html += `<th>${t('avg_credit')}</th>`;
    html += `<th class="actions-col">${t('actions')}</th></tr></thead><tbody>`;

    currentData.forEach((row, index) => {
      const balance = parseFloat(row.BALANCE) || 0;
      const creditLimit = parseFloat(row.CREDIT_LIMIT) || 1;
      const utilPct = Math.min(100, Math.round((balance / creditLimit) * 100));
      let levelClass = 'level-good';
      if (utilPct > 80) levelClass = 'level-danger';
      else if (utilPct > 60) levelClass = 'level-warning';

      html += `<tr class="data-row" data-index="${index}">`;
      config.columns.forEach(col => {
        html += `<td class="${getCellClass(col)}">${formatCellValue(col, row[col])}</td>`;
      });
      html += '<td>';
      html += `<div class="credit-bar"><div class="credit-fill ${levelClass}" style="width:${utilPct}%"></div></div>`;
      html += `<span class="credit-text ${levelClass}">${utilPct}%</span>`;
      html += '</td>';
      html += '<td class="actions-col">';
      html += `<button class="btn btn-sm btn-edit" data-index="${index}" title="${t('edit')}">${t('edit')}</button>`;
      html += `<button class="btn btn-sm btn-delete" data-index="${index}" title="${t('delete')}">${t('delete')}</button>`;
      html += '</td></tr>';
    });

    html += '</tbody></table></div>';
    content.innerHTML = html;

    content.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal('customers', currentData[parseInt(this.dataset.index)]);
      });
    });
    content.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        handleDelete('customers', currentData[parseInt(this.dataset.index)]);
      });
    });
  }

  // ─── Suppliers Module (Enhanced Table) ────────────────────────────────────

  async function renderSuppliersModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('suppliers', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('SUPPLIERS');
      renderSuppliersTable();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderSuppliersTable() {
    const content = contentArea();
    if (!currentData || currentData.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    const config = modules.suppliers;
    let html = '<div class="table-container"><table class="data-table"><thead><tr>';
    config.columns.forEach(col => {
      html += `<th>${t(col)}</th>`;
    });
    html += `<th class="actions-col">${t('actions')}</th></tr></thead><tbody>`;

    currentData.forEach((row, index) => {
      html += `<tr class="data-row" data-index="${index}">`;
      config.columns.forEach(col => {
        let cellContent = formatCellValue(col, row[col]);
        if (col === 'COUNTRY' && row[col]) {
          cellContent = getCountryFlag(row[col]) + ' ' + cellContent;
        }
        html += `<td class="${getCellClass(col)}">${cellContent}</td>`;
      });
      html += '<td class="actions-col">';
      html += `<button class="btn btn-sm btn-edit" data-index="${index}" title="${t('edit')}">${t('edit')}</button>`;
      html += `<button class="btn btn-sm btn-delete" data-index="${index}" title="${t('delete')}">${t('delete')}</button>`;
      html += '</td></tr>';
    });

    html += '</tbody></table></div>';
    content.innerHTML = html;

    content.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal('suppliers', currentData[parseInt(this.dataset.index)]);
      });
    });
    content.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        handleDelete('suppliers', currentData[parseInt(this.dataset.index)]);
      });
    });
  }

  function getCountryFlag(country) {
    const flags = {
      'Israel': '\uD83C\uDDEE\uD83C\uDDF1', 'USA': '\uD83C\uDDFA\uD83C\uDDF8', 'UK': '\uD83C\uDDEC\uD83C\uDDE7',
      'Germany': '\uD83C\uDDE9\uD83C\uDDEA', 'France': '\uD83C\uDDEB\uD83C\uDDF7', 'Japan': '\uD83C\uDDEF\uD83C\uDDF5',
      'China': '\uD83C\uDDE8\uD83C\uDDF3', 'India': '\uD83C\uDDEE\uD83C\uDDF3', 'Canada': '\uD83C\uDDE8\uD83C\uDDE6',
      'Australia': '\uD83C\uDDE6\uD83C\uDDFA', 'Brazil': '\uD83C\uDDE7\uD83C\uDDF7', 'Italy': '\uD83C\uDDEE\uD83C\uDDF9',
      'Spain': '\uD83C\uDDEA\uD83C\uDDF8', 'Netherlands': '\uD83C\uDDF3\uD83C\uDDF1', 'Sweden': '\uD83C\uDDF8\uD83C\uDDEA'
    };
    return flags[country] || '\uD83C\uDFF3\uFE0F';
  }

  // ─── Departments Module (Org Cards) ───────────────────────────────────────

  async function renderDepartmentsModule() {
    const content = contentArea();
    const actions = contentActions();
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => openModal('departments', null));
    }

    showLoading();
    try {
      currentData = await window.api.getEntities('DEPARTMENTS');
      renderDepartmentsCards();
    } catch (err) {
      showToast(t('error_loading'), 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading')}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  function renderDepartmentsCards() {
    const content = contentArea();
    if (!currentData || currentData.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    const maxHeadcount = Math.max(...currentData.map(d => parseInt(d.HEADCOUNT) || 0), 1);

    let html = '<div class="card-grid">';
    currentData.forEach((dept, index) => {
      const headcount = parseInt(dept.HEADCOUNT) || 0;
      const pct = Math.round((headcount / maxHeadcount) * 100);

      html += '<div class="entity-card">';
      html += '<div class="entity-card-header">';
      html += `<div><div class="entity-card-title">${escapeHtml(dept.DEPTDES || dept.DEPTCODE || '')}</div>`;
      html += `<div class="entity-card-subtitle">${t('DEPTCODE')}: ${escapeHtml(dept.DEPTCODE || '')}</div></div>`;
      html += '</div>';
      html += '<div class="entity-card-body">';
      if (dept.MANAGER) html += `<div style="margin-bottom:8px"><strong>${t('MANAGER')}:</strong> ${escapeHtml(dept.MANAGER)}</div>`;
      html += '<div class="headcount-bar">';
      html += `<span class="headcount-bar-label">${headcount}</span>`;
      html += `<div class="headcount-bar-track"><div class="headcount-bar-fill" style="width:${pct}%"></div></div>`;
      html += '</div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';

    content.innerHTML = html;
  }

  // ─── Generic Table Rendering (Fallback) ───────────────────────────────────

  function renderGenericTable(moduleName, columns, data) {
    const config = modules[moduleName];
    if (!data || data.length === 0) {
      return `<div class="empty-state"><p>${t('no_data')}</p></div>`;
    }

    let html = '<div class="table-container"><table class="data-table"><thead><tr>';
    columns.forEach(col => {
      const alignClass = numberFields.includes(col) ? ' class="text-right"' : '';
      html += `<th${alignClass}>${t(col)}</th>`;
    });
    html += `<th class="actions-col">${t('actions')}</th></tr></thead><tbody>`;

    data.forEach((row, index) => {
      html += `<tr class="data-row" data-index="${index}">`;
      columns.forEach(col => {
        html += `<td class="${getCellClass(col)}">${formatCellValue(col, row[col])}</td>`;
      });
      html += '<td class="actions-col">';
      html += `<button class="btn btn-sm btn-edit" data-index="${index}" title="${t('edit')}">${t('edit')}</button>`;
      html += `<button class="btn btn-sm btn-delete" data-index="${index}" title="${t('delete')}">${t('delete')}</button>`;
      html += '</td></tr>';
    });

    html += '</tbody></table></div>';
    return html;
  }

  function attachGenericTableListeners(moduleName) {
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal(moduleName, currentData[parseInt(this.dataset.index)]);
      });
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        handleDelete(moduleName, currentData[parseInt(this.dataset.index)]);
      });
    });
  }

  // ─── Legacy Table Rendering (used by view toggles) ────────────────────────

  function renderTable(moduleName, columns, data) {
    const content = contentArea();
    const config = modules[moduleName];

    if (!data || data.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
      return;
    }

    let html = '<div class="table-container"><table class="data-table"><thead><tr>';
    columns.forEach(col => {
      const alignClass = numberFields.includes(col) ? ' class="text-right"' : '';
      html += `<th${alignClass}>${t(col)}</th>`;
    });
    html += `<th class="actions-col">${t('actions')}</th></tr></thead><tbody>`;

    data.forEach((row, index) => {
      const hasSubform = config && !!config.subform;
      const expandableClass = hasSubform ? ' expandable' : '';
      const isExpanded = expandedRow === index;

      html += `<tr class="data-row${expandableClass}${isExpanded ? ' expanded' : ''}" data-index="${index}">`;
      columns.forEach(col => {
        html += `<td class="${getCellClass(col)}">${formatCellValue(col, row[col])}</td>`;
      });

      html += '<td class="actions-col">';
      html += `<button class="btn btn-sm btn-edit" data-index="${index}" title="${t('edit')}">${t('edit')}</button>`;
      html += `<button class="btn btn-sm btn-delete" data-index="${index}" title="${t('delete')}">${t('delete')}</button>`;
      html += '</td></tr>';

      if (hasSubform && isExpanded) {
        html += renderSubformRow(moduleName, row, columns.length + 1);
      }
    });

    html += '</tbody></table></div>';
    content.innerHTML = html;

    attachTableListeners(moduleName);
  }

  function attachTableListeners(moduleName) {
    const config = modules[moduleName];

    if (config && config.subform) {
      document.querySelectorAll('.data-row.expandable').forEach(row => {
        row.addEventListener('click', function (e) {
          if (e.target.closest('.btn')) return;
          const index = parseInt(this.dataset.index);
          expandedRow = expandedRow === index ? null : index;
          renderTable(moduleName, config.columns, currentData);
        });
      });
    }

    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const index = parseInt(this.dataset.index);
        openModal(moduleName, currentData[index]);
      });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const index = parseInt(this.dataset.index);
        handleDelete(moduleName, currentData[index]);
      });
    });
  }

  // ─── Entity Module Fallback ───────────────────────────────────────────────

  async function loadEntityModule(moduleName) {
    const config = modules[moduleName];
    if (!config) return;

    const content = contentArea();
    const actions = contentActions();

    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-add-new">${t('add_new')}</button>`;
      document.getElementById('btn-add-new').addEventListener('click', () => {
        openModal(moduleName, null);
      });
    }

    showLoading();

    try {
      currentData = await window.api.getEntities(config.entity);
      renderTable(moduleName, config.columns, currentData);
    } catch (err) {
      showToast(t('error_loading') || 'Error loading data', 'error');
      content.innerHTML = `<div class="error-state"><p>${t('error_loading') || 'Failed to load data'}</p></div>`;
    } finally {
      hideLoading();
    }
  }

  // ─── Cell Formatting ──────────────────────────────────────────────────────

  function getCellClass(field) {
    if (numberFields.includes(field)) return 'text-right';
    if (statusFields.includes(field)) return 'text-center';
    return '';
  }

  function formatCellValue(field, value) {
    if (value === null || value === undefined) return '';

    if (statusFields.includes(field)) {
      return renderStatusBadge(value);
    }

    if (numberFields.includes(field)) {
      const num = parseFloat(value);
      return isNaN(num) ? value : num.toLocaleString();
    }

    return escapeHtml(String(value));
  }

  function renderStatusBadge(status) {
    if (!status) return '';
    const statusLower = String(status).toLowerCase().replace(/\s+/g, '-');
    return `<span class="badge badge-${statusLower}">${escapeHtml(String(status))}</span>`;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ─── Subform Rendering ────────────────────────────────────────────────────

  function renderSubformRow(moduleName, parentRow, colSpan) {
    const config = modules[moduleName];
    const subItems = parentRow[config.subform] || [];

    let html = `<tr class="subform-row"><td colspan="${colSpan}"><div class="subform-container">`;
    html += `<div class="subform-header">`;
    html += `<h4>${t(config.subform)}</h4>`;
    html += `<button class="btn btn-sm btn-primary btn-add-subitem">${t('add_item')}</button>`;
    html += `</div>`;

    if (subItems.length > 0) {
      html += '<table class="data-table sub-table"><thead><tr>';
      config.subformColumns.forEach(col => {
        const alignClass = numberFields.includes(col) ? ' class="text-right"' : '';
        html += `<th${alignClass}>${t(col)}</th>`;
      });
      html += '</tr></thead><tbody>';

      subItems.forEach(item => {
        html += '<tr>';
        config.subformColumns.forEach(col => {
          html += `<td class="${getCellClass(col)}">${formatCellValue(col, item[col])}</td>`;
        });
        html += '</tr>';
      });

      html += '</tbody></table>';
    } else {
      html += `<p class="empty-state">${t('no_items')}</p>`;
    }

    html += '</div></td></tr>';
    return html;
  }

  // ─── Modal (Create/Edit Form) ──────────────────────────────────────────────

  function openModal(moduleName, item) {
    const config = modules[moduleName];

    editingItem = item;
    const isEditMode = item !== null;

    const mTitle = modalTitle();
    const mBody = modalBody();
    const m = modal();

    if (mTitle) {
      mTitle.textContent = isEditMode ? `${t('edit')} ${t(moduleName)}` : `${t('add_new')} ${t(moduleName)}`;
    }

    let formHtml = '<form id="entity-form" class="entity-form">';

    config.formFields.forEach(field => {
      const fieldValue = isEditMode && item[field] !== undefined ? item[field] : '';
      const isKeyField = field === config.key;
      const disabled = isEditMode && isKeyField ? ' disabled' : '';
      const fieldType = getFieldType(field);

      formHtml += '<div class="form-group">';
      formHtml += `<label for="field-${field}">${t(field)}</label>`;

      if (fieldType === 'select') {
        formHtml += `<select id="field-${field}" name="${field}" class="form-control"${disabled}>`;
        const options = statusOptions[field] || statusOptions.STATUS;
        options.forEach(opt => {
          const selected = String(fieldValue) === opt ? ' selected' : '';
          formHtml += `<option value="${opt}"${selected}>${opt}</option>`;
        });
        formHtml += '</select>';
      } else {
        const inputValue = fieldType === 'date' ? formatDateForInput(fieldValue) : escapeHtml(String(fieldValue));
        formHtml += `<input type="${fieldType}" id="field-${field}" name="${field}" class="form-control" value="${inputValue}"${disabled}>`;
      }

      formHtml += '</div>';
    });

    formHtml += '<div class="form-actions">';
    formHtml += `<button type="submit" class="btn btn-primary">${t('save')}</button>`;
    formHtml += `<button type="button" class="btn btn-secondary" id="btn-cancel">${t('cancel')}</button>`;
    formHtml += '</div>';
    formHtml += '</form>';

    if (mBody) mBody.innerHTML = formHtml;

    const form = document.getElementById('entity-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSave(moduleName);
      });
    }

    const cancelBtn = document.getElementById('btn-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeModal);
    }

    if (m) m.classList.add('open');
  }

  function closeModal() {
    const m = modal();
    if (m) m.classList.remove('open');
    editingItem = null;
  }

  function getFieldType(field) {
    if (statusFields.includes(field)) return 'select';
    if (dateFields.includes(field)) return 'date';
    if (numberFields.includes(field)) return 'number';
    return 'text';
  }

  function formatDateForInput(value) {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return value.substring(0, 10);
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    return date.toISOString().substring(0, 10);
  }

  // ─── Save Handler ──────────────────────────────────────────────────────────

  async function handleSave(moduleName) {
    const config = modules[moduleName];
    const form = document.getElementById('entity-form');
    if (!form) return;

    const formData = {};
    config.formFields.forEach(field => {
      const input = document.getElementById(`field-${field}`);
      if (input && !input.disabled) {
        let value = input.value;
        if (numberFields.includes(field)) {
          value = value ? parseFloat(value) : 0;
        }
        formData[field] = value;
      }
    });

    showLoading();

    try {
      if (editingItem) {
        const keyValue = editingItem[config.key];
        await window.api.updateEntity(config.entity, keyValue, formData);
        showToast(t('update_success') || 'Updated successfully', 'success');
      } else {
        await window.api.createEntity(config.entity, formData);
        showToast(t('create_success') || 'Created successfully', 'success');
      }

      closeModal();
      loadModule(currentModule);

    } catch (err) {
      showToast(err.message || (t('save_error') || 'Error saving data'), 'error');
    } finally {
      hideLoading();
    }
  }

  // ─── Delete Handler ─────────────────────────────────────────────────────────

  async function handleDelete(moduleName, item) {
    const config = modules[moduleName];

    const confirmMsg = `${t('confirm_delete') || 'Are you sure you want to delete'} ${item[config.key]}?`;
    if (!confirm(confirmMsg)) return;

    showLoading();

    try {
      const keyValue = item[config.key];
      await window.api.deleteEntity(config.entity, keyValue);
      showToast(t('delete_success') || 'Deleted successfully', 'success');

      expandedRow = null;
      loadModule(currentModule);

    } catch (err) {
      showToast(err.message || (t('delete_error') || 'Error deleting item'), 'error');
    } finally {
      hideLoading();
    }
  }

  // ─── Language Toggle ────────────────────────────────────────────────────────

  function setupLanguageToggle() {
    const langEn = document.getElementById('lang-en');
    const langHe = document.getElementById('lang-he');

    if (langEn) {
      langEn.addEventListener('click', () => {
        if (window.i18n) {
          window.i18n.setLanguage('en');
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = 'en';
          updateActiveLanguageButton('en');
          loadModule(currentModule);
          updateNavLabels();
        }
      });
    }

    if (langHe) {
      langHe.addEventListener('click', () => {
        if (window.i18n) {
          window.i18n.setLanguage('he');
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'he';
          updateActiveLanguageButton('he');
          loadModule(currentModule);
          updateNavLabels();
        }
      });
    }
  }

  function updateActiveLanguageButton(lang) {
    const langEn = document.getElementById('lang-en');
    const langHe = document.getElementById('lang-he');
    if (langEn) langEn.classList.toggle('active', lang === 'en');
    if (langHe) langHe.classList.toggle('active', lang === 'he');
  }

  function updateNavLabels() {
    document.querySelectorAll('.nav-item').forEach(item => {
      const moduleName = item.dataset.module;
      if (moduleName) {
        const label = item.querySelector('.nav-label');
        if (label) {
          label.textContent = t(moduleName);
        }
      }
    });
  }

  // ─── Sidebar Toggle ─────────────────────────────────────────────────────────

  function setupSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        try {
          localStorage.setItem('sidebar-collapsed', isCollapsed);
        } catch (e) {
          // localStorage might not be available
        }
      });

      try {
        const savedState = localStorage.getItem('sidebar-collapsed');
        if (savedState === 'true') {
          sidebar.classList.add('collapsed');
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }

  // ─── Refresh Button ─────────────────────────────────────────────────────────

  function setupRefreshButton() {
    const refreshBtn = document.getElementById('btn-refresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        loadModule(currentModule);
      });
    }
  }

  // ─── Modal Overlay Click ────────────────────────────────────────────────────

  function setupModalClose() {
    const m = modal();
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) {
          closeModal();
        }
      });
    }

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const m = modal();
        if (m && m.classList.contains('open')) {
          closeModal();
        }
      }
    });
  }

  // ─── Initialization ─────────────────────────────────────────────────────────

  function init() {
    if (window.i18n) {
      window.i18n.init();
      const lang = window.i18n.getLanguage();
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      updateActiveLanguageButton(lang);
      updateNavLabels();
    }

    setupNavigation();
    setupLanguageToggle();
    setupSidebarToggle();
    setupRefreshButton();
    setupModalClose();

    loadDashboard();
  }

  // ─── Start App ──────────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

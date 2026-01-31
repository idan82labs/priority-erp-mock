/**
 * Priorit-AI ERP - Internationalization Module
 * Handles Hebrew/English translations and RTL switching
 */

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.core': 'Core',
    'nav.customers': 'Customers',
    'nav.orders': 'Orders',
    'nav.products': 'Products',
    'nav.invoices': 'Invoices',
    'nav.suppliers': 'Suppliers',
    'nav.manufacturing': 'Manufacturing',
    'nav.workorders': 'Work Orders',
    'nav.bom': 'Bill of Materials',
    'nav.production': 'Production Plans',
    'nav.hr': 'HR',
    'nav.employees': 'Employees',
    'nav.timesheets': 'Timesheets',
    'nav.departments': 'Departments',

    // Actions
    'actions.add': 'Add New',
    'actions.edit': 'Edit',
    'actions.delete': 'Delete',
    'actions.save': 'Save',
    'actions.cancel': 'Cancel',
    'actions.refresh': 'Refresh',
    'actions.search': 'Search',
    'actions.filter': 'Filter',
    'actions.export': 'Export',
    'actions.close': 'Close',
    'actions.confirm': 'Are you sure?',

    // Dashboard
    'dashboard.totalCustomers': 'Total Customers',
    'dashboard.openOrders': 'Open Orders',
    'dashboard.totalProducts': 'Total Products',
    'dashboard.activeWorkOrders': 'Active Work Orders',
    'dashboard.recentOrders': 'Recent Orders',
    'dashboard.topProducts': 'Top Products',
    'dashboard.revenue': 'Revenue',
    'dashboard.pendingInvoices': 'Pending Invoices',

    // Fields
    'fields.CUSTNAME': 'Customer ID',
    'fields.CUSTDES': 'Name',
    'fields.PHONE': 'Phone',
    'fields.EMAIL': 'Email',
    'fields.ADDRESS': 'Address',
    'fields.CITY': 'City',
    'fields.COUNTRY': 'Country',
    'fields.BALANCE': 'Balance',
    'fields.CREDIT_LIMIT': 'Credit Limit',
    'fields.STATUS': 'Status',
    'fields.ORDNAME': 'Order No.',
    'fields.CURDATE': 'Date',
    'fields.ORDSTATUS': 'Status',
    'fields.QPRICE': 'Total',
    'fields.DETAILS': 'Details',
    'fields.PARTNAME': 'Part No.',
    'fields.PARTDES': 'Description',
    'fields.BARCODE': 'Barcode',
    'fields.UNIT': 'Unit',
    'fields.SELLPRICE': 'Sell Price',
    'fields.COSTPRICE': 'Cost Price',
    'fields.INVENTORY': 'Inventory',
    'fields.FAMILY': 'Family',
    'fields.IVNUM': 'Invoice No.',
    'fields.IVDATE': 'Date',
    'fields.TOTAL': 'Total',
    'fields.IVSTATUS': 'Status',
    'fields.PAYDATE': 'Pay Date',
    'fields.SUPNAME': 'Supplier ID',
    'fields.SUPDES': 'Name',
    'fields.WONUM': 'WO No.',
    'fields.TQUANT': 'Quantity',
    'fields.STARTDATE': 'Start Date',
    'fields.ENDDATE': 'End Date',
    'fields.WOSTATUS': 'Status',
    'fields.PRIORITY': 'Priority',
    'fields.BOMNAME': 'BOM ID',
    'fields.BOMDES': 'Description',
    'fields.REVISION': 'Revision',
    'fields.CHILDPART': 'Component',
    'fields.PLANNAME': 'Plan ID',
    'fields.PLANDES': 'Description',
    'fields.EMPNUM': 'Emp. No.',
    'fields.EMPNAME': 'Name',
    'fields.DEPT': 'Department',
    'fields.POSITION': 'Position',
    'fields.HIREDATE': 'Hire Date',
    'fields.TSNUM': 'TS No.',
    'fields.TSDATE': 'Date',
    'fields.HOURS': 'Hours',
    'fields.PROJECT': 'Project',
    'fields.DESCRIPTION': 'Description',
    'fields.DEPTCODE': 'Dept. Code',
    'fields.DEPTDES': 'Name',
    'fields.MANAGER': 'Manager',
    'fields.HEADCOUNT': 'Headcount',
    'fields.LINE': 'Line',
    'fields.PRICE': 'Price',
    'fields.DUEDATE': 'Due Date',
    'fields.KLINE': 'Line Status',

    // Status values
    'status.A': 'Active',
    'status.I': 'Inactive',
    'status.O': 'Open',
    'status.C': 'Closed',
    'status.P': 'In Progress',

    // Messages
    'msg.created': 'Created successfully',
    'msg.updated': 'Updated successfully',
    'msg.deleted': 'Deleted successfully',
    'msg.error': 'An error occurred',
    'msg.confirmDelete': 'Are you sure you want to delete this item?',
    'msg.noData': 'No data available',
    'msg.loading': 'Loading...',

    // Flat keys used by app.js
    'dashboard': 'Dashboard',
    'customers': 'Customers',
    'orders': 'Orders',
    'products': 'Products',
    'invoices': 'Invoices',
    'suppliers': 'Suppliers',
    'workorders': 'Work Orders',
    'bom': 'Bill of Materials',
    'production': 'Production Plans',
    'employees': 'Employees',
    'timesheets': 'Timesheets',
    'departments': 'Departments',
    'total_customers': 'Total Customers',
    'open_orders': 'Open Orders',
    'total_products': 'Total Products',
    'active_workorders': 'Active Work Orders',
    'recent_orders': 'Recent Orders',
    'low_stock': 'Low Stock',
    'add_new': 'Add New',
    'edit': 'Edit',
    'delete': 'Delete',
    'save': 'Save',
    'cancel': 'Cancel',
    'actions': 'Actions',
    'no_data': 'No data available',
    'error_loading': 'Error loading data',
    'update_success': 'Updated successfully',
    'create_success': 'Created successfully',
    'save_error': 'Error saving data',
    'delete_success': 'Deleted successfully',
    'delete_error': 'Error deleting',
    'confirm_delete': 'Are you sure you want to delete',
    'feature_coming_soon': 'Feature coming soon',
    'add_item': 'Add Item',
    'no_items': 'No items',
    'ORDERITEMS_SUBFORM': 'Order Items',
    'AINVOICEITEMS_SUBFORM': 'Invoice Items',
    'BOMITEMS_SUBFORM': 'BOM Items',
    'CUSTNAME': 'Customer ID',
    'CUSTDES': 'Name',
    'PHONE': 'Phone',
    'EMAIL': 'Email',
    'ADDRESS': 'Address',
    'CITY': 'City',
    'STATE': 'State',
    'COUNTRY': 'Country',
    'BALANCE': 'Balance',
    'CREDIT_LIMIT': 'Credit Limit',
    'STATUS': 'Status',
    'ORDNAME': 'Order No.',
    'CURDATE': 'Date',
    'ORDSTATUS': 'Status',
    'QPRICE': 'Total',
    'DETAILS': 'Details',
    'PARTNAME': 'Part No.',
    'PARTDES': 'Description',
    'BARCODE': 'Barcode',
    'UNIT': 'Unit',
    'SELLPRICE': 'Sell Price',
    'COSTPRICE': 'Cost Price',
    'INVENTORY': 'Inventory',
    'FAMILY': 'Family',
    'IVNUM': 'Invoice No.',
    'IVDATE': 'Date',
    'TOTAL': 'Total',
    'IVSTATUS': 'Status',
    'PAYDATE': 'Pay Date',
    'SUPNAME': 'Supplier ID',
    'SUPDES': 'Name',
    'WONUM': 'WO No.',
    'TQUANT': 'Quantity',
    'STARTDATE': 'Start Date',
    'ENDDATE': 'End Date',
    'WOSTATUS': 'Status',
    'PRIORITY': 'Priority',
    'BOMNAME': 'BOM ID',
    'BOMDES': 'Description',
    'REVISION': 'Revision',
    'CHILDPART': 'Component',
    'PLANNAME': 'Plan ID',
    'PLANDES': 'Description',
    'EMPNUM': 'Emp. No.',
    'EMPNAME': 'Name',
    'DEPT': 'Department',
    'POSITION': 'Position',
    'HIREDATE': 'Hire Date',
    'TSNUM': 'TS No.',
    'TSDATE': 'Date',
    'HOURS': 'Hours',
    'PROJECT': 'Project',
    'DESCRIPTION': 'Description',
    'DEPTCODE': 'Dept. Code',
    'DEPTDES': 'Name',
    'MANAGER': 'Manager',
    'HEADCOUNT': 'Headcount',
    'LINE': 'Line',
    'PRICE': 'Price',
    'DUEDATE': 'Due Date',
    'KLINE': 'Line Status',

    // View toggles
    'view_kanban': 'Kanban',
    'view_table': 'Table',
    'view_cards': 'Cards',
    'view_grid': 'Grid',
    'toggle_view': 'Toggle View',

    // Filter/tab labels
    'all': 'All',
    'open': 'Open',
    'in_progress': 'In Progress',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
    'draft': 'Draft',
    'sent': 'Sent',
    'paid': 'Paid',
    'overdue': 'Overdue',
    'active': 'Active',
    'inactive': 'Inactive',

    // Summary labels
    'total_orders': 'Total Orders',
    'total_value': 'Total Value',
    'avg_value': 'Avg Value',
    'total_outstanding': 'Outstanding',
    'total_paid': 'Total Paid',
    'total_invoiced': 'Total Invoiced',
    'total_balance': 'Total Balance',
    'avg_credit': 'Avg Credit Usage',

    // Aging analysis
    'aging_current': 'Current',
    'aging_30_60': '30-60 Days',
    'aging_60_90': '60-90 Days',
    'aging_90_plus': '90+ Days',

    // Gantt/timeline
    'this_week': 'This Week',
    'prev_week': 'Prev Week',
    'next_week': 'Next Week',
    'today': 'Today',
    'timeline': 'Timeline',

    // Work orders
    'planned': 'Planned',
    'completed': 'Completed',
    'on_hold': 'On Hold',
    'priority_high': 'High',
    'priority_medium': 'Medium',
    'priority_low': 'Low',
    'production_anomaly': 'Production Anomaly',
    'wo_duration': 'Duration',

    // Departments
    'headcount': 'Headcount',
    'manager': 'Manager',
    'org_chart': 'Org Chart',

    // Products
    'low_stock_warning': 'Low Stock',
    'family_filter': 'Filter by Family',
    'in_stock': 'In Stock',
    'stock_level': 'Stock Level',
    'all_families': 'All Families',

    // General
    'expand_all': 'Expand All',
    'collapse_all': 'Collapse All',
    'summary': 'Summary',
    'alerts': 'Alerts',
    'overdue_invoices': 'Overdue Invoices',
    'late_work_orders': 'Late Work Orders',
    'order_pipeline': 'Order Pipeline',
    'wo_status_gauge': 'WO Status',
    'view_orders': 'View Orders',
    'view_invoices': 'View Invoices',
    'total_customers_count': 'Total Customers',
    'components': 'Components',
    'weekly_hours': 'Weekly Hours',
    'prev': 'Prev',
    'next': 'Next'
  },

  he: {
    // Navigation
    'nav.dashboard': '\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4',
    'nav.core': '\u05DC\u05D9\u05D1\u05D4',
    'nav.customers': '\u05DC\u05E7\u05D5\u05D7\u05D5\u05EA',
    'nav.orders': '\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA',
    'nav.products': '\u05DE\u05D5\u05E6\u05E8\u05D9\u05DD',
    'nav.invoices': '\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05D5\u05EA',
    'nav.suppliers': '\u05E1\u05E4\u05E7\u05D9\u05DD',
    'nav.manufacturing': '\u05D9\u05D9\u05E6\u05D5\u05E8',
    'nav.workorders': '\u05D4\u05D5\u05E8\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4',
    'nav.bom': '\u05E2\u05E5 \u05DE\u05D5\u05E6\u05E8',
    'nav.production': '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05D9\u05D9\u05E6\u05D5\u05E8',
    'nav.hr': '\u05DE\u05E9\u05D0\u05D1\u05D9 \u05D0\u05E0\u05D5\u05E9',
    'nav.employees': '\u05E2\u05D5\u05D1\u05D3\u05D9\u05DD',
    'nav.timesheets': '\u05D3\u05D5\u05D7\u05D5\u05EA \u05E9\u05E2\u05D5\u05EA',
    'nav.departments': '\u05DE\u05D7\u05DC\u05E7\u05D5\u05EA',

    // Actions
    'actions.add': '\u05D4\u05D5\u05E1\u05E3 \u05D7\u05D3\u05E9',
    'actions.edit': '\u05E2\u05E8\u05D9\u05DB\u05D4',
    'actions.delete': '\u05DE\u05D7\u05D9\u05E7\u05D4',
    'actions.save': '\u05E9\u05DE\u05D9\u05E8\u05D4',
    'actions.cancel': '\u05D1\u05D9\u05D8\u05D5\u05DC',
    'actions.refresh': '\u05E8\u05E2\u05E0\u05D5\u05DF',
    'actions.search': '\u05D7\u05D9\u05E4\u05D5\u05E9',
    'actions.filter': '\u05E1\u05D9\u05E0\u05D5\u05DF',
    'actions.export': '\u05D9\u05D9\u05E6\u05D5\u05D0',
    'actions.close': '\u05E1\u05D2\u05D9\u05E8\u05D4',
    'actions.confirm': '\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7?',

    // Dashboard
    'dashboard.totalCustomers': '\u05E1\u05D4"\u05DB \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA',
    'dashboard.openOrders': '\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D5\u05EA',
    'dashboard.totalProducts': '\u05E1\u05D4"\u05DB \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD',
    'dashboard.activeWorkOrders': '\u05D4\u05D5\u05E8\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA',
    'dashboard.recentOrders': '\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA',
    'dashboard.topProducts': '\u05DE\u05D5\u05E6\u05E8\u05D9\u05DD \u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD',
    'dashboard.revenue': '\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA',
    'dashboard.pendingInvoices': '\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05D5\u05EA \u05DE\u05DE\u05EA\u05D9\u05E0\u05D5\u05EA',

    // Fields
    'fields.CUSTNAME': '\u05DE\u05D6\u05D4\u05D4 \u05DC\u05E7\u05D5\u05D7',
    'fields.CUSTDES': '\u05E9\u05DD',
    'fields.PHONE': '\u05D8\u05DC\u05E4\u05D5\u05DF',
    'fields.EMAIL': '\u05D3\u05D5\u05D0"\u05DC',
    'fields.ADDRESS': '\u05DB\u05EA\u05D5\u05D1\u05EA',
    'fields.CITY': '\u05E2\u05D9\u05E8',
    'fields.COUNTRY': '\u05DE\u05D3\u05D9\u05E0\u05D4',
    'fields.BALANCE': '\u05D9\u05EA\u05E8\u05D4',
    'fields.CREDIT_LIMIT': '\u05DE\u05E1\u05D2\u05E8\u05EA \u05D0\u05E9\u05E8\u05D0\u05D9',
    'fields.STATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'fields.ORDNAME': '\u05DE\u05E1\' \u05D4\u05D6\u05DE\u05E0\u05D4',
    'fields.CURDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA',
    'fields.ORDSTATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'fields.QPRICE': '\u05E1\u05D4"\u05DB',
    'fields.DETAILS': '\u05E4\u05E8\u05D8\u05D9\u05DD',
    'fields.PARTNAME': '\u05DE\u05E7"\u05D8',
    'fields.PARTDES': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'fields.BARCODE': '\u05D1\u05E8\u05E7\u05D5\u05D3',
    'fields.UNIT': '\u05D9\u05D7\u05D9\u05D3\u05D4',
    'fields.SELLPRICE': '\u05DE\u05D7\u05D9\u05E8 \u05DE\u05DB\u05D9\u05E8\u05D4',
    'fields.COSTPRICE': '\u05DE\u05D7\u05D9\u05E8 \u05E2\u05DC\u05D5\u05EA',
    'fields.INVENTORY': '\u05DE\u05DC\u05D0\u05D9',
    'fields.FAMILY': '\u05DE\u05E9\u05E4\u05D7\u05D4',
    'fields.IVNUM': '\u05DE\u05E1\' \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA',
    'fields.IVDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA',
    'fields.TOTAL': '\u05E1\u05D4"\u05DB',
    'fields.IVSTATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'fields.PAYDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E9\u05DC\u05D5\u05DD',
    'fields.SUPNAME': '\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E4\u05E7',
    'fields.SUPDES': '\u05E9\u05DD',
    'fields.WONUM': '\u05DE\u05E1\' \u05D4\u05D5"\u05E2',
    'fields.TQUANT': '\u05DB\u05DE\u05D5\u05EA',
    'fields.STARTDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4',
    'fields.ENDDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD',
    'fields.WOSTATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'fields.PRIORITY': '\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA',
    'fields.BOMNAME': '\u05DE\u05D6\u05D4\u05D4 \u05E2\u05E5 \u05DE\u05D5\u05E6\u05E8',
    'fields.BOMDES': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'fields.REVISION': '\u05DE\u05D4\u05D3\u05D5\u05E8\u05D4',
    'fields.CHILDPART': '\u05E8\u05DB\u05D9\u05D1',
    'fields.PLANNAME': '\u05DE\u05D6\u05D4\u05D4 \u05EA\u05D5\u05DB\u05E0\u05D9\u05EA',
    'fields.PLANDES': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'fields.EMPNUM': '\u05DE\u05E1\' \u05E2\u05D5\u05D1\u05D3',
    'fields.EMPNAME': '\u05E9\u05DD',
    'fields.DEPT': '\u05DE\u05D7\u05DC\u05E7\u05D4',
    'fields.POSITION': '\u05EA\u05E4\u05E7\u05D9\u05D3',
    'fields.HIREDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05E7\u05DC\u05D9\u05D8\u05D4',
    'fields.TSNUM': '\u05DE\u05E1\' \u05D3\u05D5"\u05D7',
    'fields.TSDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA',
    'fields.HOURS': '\u05E9\u05E2\u05D5\u05EA',
    'fields.PROJECT': '\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8',
    'fields.DESCRIPTION': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'fields.DEPTCODE': '\u05E7\u05D5\u05D3 \u05DE\u05D7\u05DC\u05E7\u05D4',
    'fields.DEPTDES': '\u05E9\u05DD',
    'fields.MANAGER': '\u05DE\u05E0\u05D4\u05DC',
    'fields.HEADCOUNT': '\u05DE\u05E1\' \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD',
    'fields.LINE': '\u05E9\u05D5\u05E8\u05D4',
    'fields.PRICE': '\u05DE\u05D7\u05D9\u05E8',
    'fields.DUEDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3',
    'fields.KLINE': '\u05E1\u05D8\u05D8\u05D5\u05E1 \u05E9\u05D5\u05E8\u05D4',

    // Status values
    'status.A': '\u05E4\u05E2\u05D9\u05DC',
    'status.I': '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC',
    'status.O': '\u05E4\u05EA\u05D5\u05D7',
    'status.C': '\u05E1\u05D2\u05D5\u05E8',
    'status.P': '\u05D1\u05D1\u05D9\u05E6\u05D5\u05E2',

    // Messages
    'msg.created': '\u05E0\u05D5\u05E6\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4',
    'msg.updated': '\u05E2\u05D5\u05D3\u05DB\u05DF \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4',
    'msg.deleted': '\u05E0\u05DE\u05D7\u05E7 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4',
    'msg.error': '\u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4',
    'msg.confirmDelete': '\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7 \u05E9\u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05DE\u05D7\u05D5\u05E7 \u05E4\u05E8\u05D9\u05D8 \u05D6\u05D4?',
    'msg.noData': '\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D4\u05E6\u05D2\u05D4',
    'msg.loading': '\u05D8\u05D5\u05E2\u05DF...',

    // Flat keys used by app.js
    'dashboard': '\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4',
    'customers': '\u05DC\u05E7\u05D5\u05D7\u05D5\u05EA',
    'orders': '\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA',
    'products': '\u05DE\u05D5\u05E6\u05E8\u05D9\u05DD',
    'invoices': '\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05D5\u05EA',
    'suppliers': '\u05E1\u05E4\u05E7\u05D9\u05DD',
    'workorders': '\u05D4\u05D5\u05E8\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4',
    'bom': '\u05E2\u05E5 \u05DE\u05D5\u05E6\u05E8',
    'production': '\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05D9\u05D9\u05E6\u05D5\u05E8',
    'employees': '\u05E2\u05D5\u05D1\u05D3\u05D9\u05DD',
    'timesheets': '\u05D3\u05D5\u05D7\u05D5\u05EA \u05E9\u05E2\u05D5\u05EA',
    'departments': '\u05DE\u05D7\u05DC\u05E7\u05D5\u05EA',
    'total_customers': '\u05E1\u05D4"\u05DB \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA',
    'open_orders': '\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05E4\u05EA\u05D5\u05D7\u05D5\u05EA',
    'total_products': '\u05E1\u05D4"\u05DB \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD',
    'active_workorders': '\u05D4\u05D5\u05E8\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4 \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA',
    'recent_orders': '\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA',
    'low_stock': '\u05DE\u05DC\u05D0\u05D9 \u05E0\u05DE\u05D5\u05DA',
    'add_new': '\u05D4\u05D5\u05E1\u05E3 \u05D7\u05D3\u05E9',
    'edit': '\u05E2\u05E8\u05D9\u05DB\u05D4',
    'delete': '\u05DE\u05D7\u05D9\u05E7\u05D4',
    'save': '\u05E9\u05DE\u05D9\u05E8\u05D4',
    'cancel': '\u05D1\u05D9\u05D8\u05D5\u05DC',
    'actions': '\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA',
    'no_data': '\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D4\u05E6\u05D2\u05D4',
    'error_loading': '\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D8\u05E2\u05D9\u05E0\u05EA \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD',
    'update_success': '\u05E2\u05D5\u05D3\u05DB\u05DF \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4',
    'create_success': '\u05E0\u05D5\u05E6\u05E8 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4',
    'save_error': '\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05D4',
    'delete_success': '\u05E0\u05DE\u05D7\u05E7 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4',
    'delete_error': '\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05DE\u05D7\u05D9\u05E7\u05D4',
    'confirm_delete': '\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7 \u05E9\u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05DE\u05D7\u05D5\u05E7',
    'feature_coming_soon': '\u05D9\u05D2\u05D9\u05E2 \u05D1\u05E7\u05E8\u05D5\u05D1',
    'add_item': '\u05D4\u05D5\u05E1\u05E3 \u05E4\u05E8\u05D9\u05D8',
    'no_items': '\u05D0\u05D9\u05DF \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD',
    'ORDERITEMS_SUBFORM': '\u05E9\u05D5\u05E8\u05D5\u05EA \u05D4\u05D6\u05DE\u05E0\u05D4',
    'AINVOICEITEMS_SUBFORM': '\u05E9\u05D5\u05E8\u05D5\u05EA \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA',
    'BOMITEMS_SUBFORM': '\u05E8\u05DB\u05D9\u05D1\u05D9 \u05E2\u05E5 \u05DE\u05D5\u05E6\u05E8',
    'CUSTNAME': '\u05DE\u05D6\u05D4\u05D4 \u05DC\u05E7\u05D5\u05D7',
    'CUSTDES': '\u05E9\u05DD',
    'PHONE': '\u05D8\u05DC\u05E4\u05D5\u05DF',
    'EMAIL': '\u05D3\u05D5\u05D0"\u05DC',
    'ADDRESS': '\u05DB\u05EA\u05D5\u05D1\u05EA',
    'CITY': '\u05E2\u05D9\u05E8',
    'STATE': '\u05DE\u05D3\u05D9\u05E0\u05D4',
    'COUNTRY': '\u05DE\u05D3\u05D9\u05E0\u05D4',
    'BALANCE': '\u05D9\u05EA\u05E8\u05D4',
    'CREDIT_LIMIT': '\u05DE\u05E1\u05D2\u05E8\u05EA \u05D0\u05E9\u05E8\u05D0\u05D9',
    'STATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'ORDNAME': '\u05DE\u05E1\' \u05D4\u05D6\u05DE\u05E0\u05D4',
    'CURDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA',
    'ORDSTATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'QPRICE': '\u05E1\u05D4"\u05DB',
    'DETAILS': '\u05E4\u05E8\u05D8\u05D9\u05DD',
    'PARTNAME': '\u05DE\u05E7"\u05D8',
    'PARTDES': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'BARCODE': '\u05D1\u05E8\u05E7\u05D5\u05D3',
    'UNIT': '\u05D9\u05D7\u05D9\u05D3\u05D4',
    'SELLPRICE': '\u05DE\u05D7\u05D9\u05E8 \u05DE\u05DB\u05D9\u05E8\u05D4',
    'COSTPRICE': '\u05DE\u05D7\u05D9\u05E8 \u05E2\u05DC\u05D5\u05EA',
    'INVENTORY': '\u05DE\u05DC\u05D0\u05D9',
    'FAMILY': '\u05DE\u05E9\u05E4\u05D7\u05D4',
    'IVNUM': '\u05DE\u05E1\' \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA',
    'IVDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA',
    'TOTAL': '\u05E1\u05D4"\u05DB',
    'IVSTATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'PAYDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E9\u05DC\u05D5\u05DD',
    'SUPNAME': '\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E4\u05E7',
    'SUPDES': '\u05E9\u05DD',
    'WONUM': '\u05DE\u05E1\' \u05D4\u05D5"\u05E2',
    'TQUANT': '\u05DB\u05DE\u05D5\u05EA',
    'STARTDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4',
    'ENDDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD',
    'WOSTATUS': '\u05E1\u05D8\u05D8\u05D5\u05E1',
    'PRIORITY': '\u05E2\u05D3\u05D9\u05E4\u05D5\u05EA',
    'BOMNAME': '\u05DE\u05D6\u05D4\u05D4 \u05E2\u05E5 \u05DE\u05D5\u05E6\u05E8',
    'BOMDES': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'REVISION': '\u05DE\u05D4\u05D3\u05D5\u05E8\u05D4',
    'CHILDPART': '\u05E8\u05DB\u05D9\u05D1',
    'PLANNAME': '\u05DE\u05D6\u05D4\u05D4 \u05EA\u05D5\u05DB\u05E0\u05D9\u05EA',
    'PLANDES': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'EMPNUM': '\u05DE\u05E1\' \u05E2\u05D5\u05D1\u05D3',
    'EMPNAME': '\u05E9\u05DD',
    'DEPT': '\u05DE\u05D7\u05DC\u05E7\u05D4',
    'POSITION': '\u05EA\u05E4\u05E7\u05D9\u05D3',
    'HIREDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05E7\u05DC\u05D9\u05D8\u05D4',
    'TSNUM': '\u05DE\u05E1\' \u05D3\u05D5"\u05D7',
    'TSDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA',
    'HOURS': '\u05E9\u05E2\u05D5\u05EA',
    'PROJECT': '\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8',
    'DESCRIPTION': '\u05EA\u05D9\u05D0\u05D5\u05E8',
    'DEPTCODE': '\u05E7\u05D5\u05D3 \u05DE\u05D7\u05DC\u05E7\u05D4',
    'DEPTDES': '\u05E9\u05DD',
    'MANAGER': '\u05DE\u05E0\u05D4\u05DC',
    'HEADCOUNT': '\u05DE\u05E1\' \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD',
    'LINE': '\u05E9\u05D5\u05E8\u05D4',
    'PRICE': '\u05DE\u05D7\u05D9\u05E8',
    'DUEDATE': '\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3',
    'KLINE': '\u05E1\u05D8\u05D8\u05D5\u05E1 \u05E9\u05D5\u05E8\u05D4',

    // View toggles
    'view_kanban': '\u05E7\u05E0\u05D1\u05DF',
    'view_table': '\u05D8\u05D1\u05DC\u05D4',
    'view_cards': '\u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD',
    'view_grid': '\u05E8\u05E9\u05EA',
    'toggle_view': '\u05D4\u05D7\u05DC\u05E3 \u05EA\u05E6\u05D5\u05D2\u05D4',

    // Filter/tab labels
    'all': '\u05D4\u05DB\u05DC',
    'open': '\u05E4\u05EA\u05D5\u05D7',
    'in_progress': '\u05D1\u05D1\u05D9\u05E6\u05D5\u05E2',
    'shipped': '\u05E0\u05E9\u05DC\u05D7',
    'delivered': '\u05E1\u05D5\u05E4\u05E7',
    'cancelled': '\u05DE\u05D1\u05D5\u05D8\u05DC',
    'draft': '\u05D8\u05D9\u05D5\u05D8\u05D4',
    'sent': '\u05E0\u05E9\u05DC\u05D7',
    'paid': '\u05E9\u05D5\u05DC\u05DD',
    'overdue': '\u05D1\u05D0\u05D9\u05D7\u05D5\u05E8',
    'active': '\u05E4\u05E2\u05D9\u05DC',
    'inactive': '\u05DC\u05D0 \u05E4\u05E2\u05D9\u05DC',

    // Summary labels
    'total_orders': '\u05E1\u05D4"\u05DB \u05D4\u05D6\u05DE\u05E0\u05D5\u05EA',
    'total_value': '\u05E1\u05D4"\u05DB \u05E2\u05E8\u05DA',
    'avg_value': '\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E2\u05E8\u05DA',
    'total_outstanding': '\u05D9\u05EA\u05E8\u05D4 \u05E4\u05EA\u05D5\u05D7\u05D4',
    'total_paid': '\u05E1\u05D4"\u05DB \u05E9\u05D5\u05DC\u05DD',
    'total_invoiced': '\u05E1\u05D4"\u05DB \u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05D5\u05EA',
    'total_balance': '\u05E1\u05D4"\u05DB \u05D9\u05EA\u05E8\u05D4',
    'avg_credit': '\u05DE\u05DE\u05D5\u05E6\u05E2 \u05E0\u05D9\u05E6\u05D5\u05DC \u05D0\u05E9\u05E8\u05D0\u05D9',

    // Aging analysis
    'aging_current': '\u05E9\u05D5\u05D8\u05E3',
    'aging_30_60': '30-60 \u05D9\u05D5\u05DD',
    'aging_60_90': '60-90 \u05D9\u05D5\u05DD',
    'aging_90_plus': '90+ \u05D9\u05D5\u05DD',

    // Gantt/timeline
    'this_week': '\u05D4\u05E9\u05D1\u05D5\u05E2',
    'prev_week': '\u05E9\u05D1\u05D5\u05E2 \u05E7\u05D5\u05D3\u05DD',
    'next_week': '\u05E9\u05D1\u05D5\u05E2 \u05D4\u05D1\u05D0',
    'today': '\u05D4\u05D9\u05D5\u05DD',
    'timeline': '\u05E6\u05D9\u05E8 \u05D6\u05DE\u05DF',

    // Work orders
    'planned': '\u05DE\u05EA\u05D5\u05DB\u05E0\u05DF',
    'completed': '\u05D4\u05D5\u05E9\u05DC\u05DD',
    'on_hold': '\u05DE\u05D5\u05E7\u05E4\u05D0',
    'priority_high': '\u05D2\u05D1\u05D5\u05D4\u05D4',
    'priority_medium': '\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9\u05EA',
    'priority_low': '\u05E0\u05DE\u05D5\u05DB\u05D4',
    'production_anomaly': '\u05D7\u05E8\u05D9\u05D2\u05D4 \u05D1\u05D9\u05D9\u05E6\u05D5\u05E8',
    'wo_duration': '\u05DE\u05E9\u05DA',

    // Departments
    'headcount': '\u05DE\u05E1\' \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD',
    'manager': '\u05DE\u05E0\u05D4\u05DC',
    'org_chart': '\u05DE\u05D1\u05E0\u05D4 \u05D0\u05E8\u05D2\u05D5\u05E0\u05D9',

    // Products
    'low_stock_warning': '\u05DE\u05DC\u05D0\u05D9 \u05E0\u05DE\u05D5\u05DA',
    'family_filter': '\u05E1\u05E0\u05DF \u05DC\u05E4\u05D9 \u05DE\u05E9\u05E4\u05D7\u05D4',
    'in_stock': '\u05D1\u05DE\u05DC\u05D0\u05D9',
    'stock_level': '\u05E8\u05DE\u05EA \u05DE\u05DC\u05D0\u05D9',
    'all_families': '\u05DB\u05DC \u05D4\u05DE\u05E9\u05E4\u05D7\u05D5\u05EA',

    // General
    'expand_all': '\u05D4\u05E8\u05D7\u05D1 \u05D4\u05DB\u05DC',
    'collapse_all': '\u05DB\u05D5\u05D5\u05E5 \u05D4\u05DB\u05DC',
    'summary': '\u05E1\u05D9\u05DB\u05D5\u05DD',
    'alerts': '\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA',
    'overdue_invoices': '\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05D5\u05EA \u05D1\u05D0\u05D9\u05D7\u05D5\u05E8',
    'late_work_orders': '\u05D4\u05D5\u05E8\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4 \u05DE\u05D0\u05D7\u05E8\u05D5\u05EA',
    'order_pipeline': '\u05E6\u05D9\u05E0\u05D5\u05E8 \u05D4\u05D6\u05DE\u05E0\u05D5\u05EA',
    'wo_status_gauge': '\u05E1\u05D8\u05D8\u05D5\u05E1 \u05D4\u05D5"\u05E2',
    'view_orders': '\u05E6\u05E4\u05D4 \u05D1\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA',
    'view_invoices': '\u05E6\u05E4\u05D4 \u05D1\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05D5\u05EA',
    'total_customers_count': '\u05E1\u05D4"\u05DB \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA',
    'components': '\u05E8\u05DB\u05D9\u05D1\u05D9\u05DD',
    'weekly_hours': '\u05E9\u05E2\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9\u05D5\u05EA',
    'prev': '\u05E7\u05D5\u05D3\u05DD',
    'next': '\u05D4\u05D1\u05D0'
  }
};

let currentLang = localStorage.getItem('priority-lang') || 'en';

/**
 * Sets the active language and updates the UI accordingly.
 * @param {string} lang - Language code ('en' or 'he')
 */
function setLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`Language "${lang}" is not supported. Falling back to "en".`);
    lang = 'en';
  }

  currentLang = lang;
  localStorage.setItem('priority-lang', lang);

  // Update document direction for RTL/LTR
  const htmlEl = document.documentElement;
  htmlEl.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
  htmlEl.setAttribute('lang', lang);

  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (translation !== undefined) {
      el.textContent = translation;
    }
  });
}

/**
 * Returns the translation for a given key in the current language.
 * @param {string} key - The translation key (e.g., 'nav.dashboard')
 * @returns {string} The translated string, or the key itself if not found
 */
function t(key) {
  const langTranslations = translations[currentLang];
  if (langTranslations && langTranslations[key] !== undefined) {
    return langTranslations[key];
  }
  // Fallback to English
  if (translations.en[key] !== undefined) {
    return translations.en[key];
  }
  // Return the key itself if no translation found
  return key;
}

/**
 * Returns the current language code.
 * @returns {string} 'en' or 'he'
 */
function getLanguage() {
  return currentLang;
}

/**
 * Initializes i18n - applies saved language to the DOM.
 */
function init() {
  setLanguage(currentLang);
}

const i18n = {
  translations: translations,
  currentLang: currentLang,
  setLanguage: setLanguage,
  getLanguage: getLanguage,
  init: init,
  t: t
};

window.i18n = i18n;

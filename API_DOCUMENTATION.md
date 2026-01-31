# Mock Priority ERP API Documentation

## Workshop: Building AI Agents with Google's Gemini SDK

---

## Overview

This is a **Mock Priority ERP API** designed for a hands-on workshop on building AI agents using Google's Gemini SDK. It simulates a subset of the Priority ERP system's OData-style REST API, allowing participants to build agents that interact with realistic ERP data -- customers, orders, inventory, invoices, production, and more.

The API is pre-seeded with sample data in Hebrew and English (as Priority ERP is an Israeli system), and supports full CRUD operations with OData-style query parameters.

> **Note:** This is a mock server for educational purposes. Data is stored in-memory and resets on server restart.

---

## Base URL

```
http://localhost:3000
```

If deployed, replace with the appropriate URL (e.g., `https://your-workshop-instance.example.com`).

---

## Authentication

All `/api/ENTITY` endpoints require an API key passed via the `X-API-Key` header.

| Header      | Value        |
|-------------|--------------|
| `X-API-Key` | `test-key`   |

The default key for local development is `test-key`.

**Example:**

```bash
curl -H "X-API-Key: test-key" http://localhost:3000/api/CUSTOMERS
```

Requests without a valid API key will receive a `401 Unauthorized` response.

---

## Entities Reference

### CUSTOMERS

Customer master data.

| Field         | Type    | Description                          |
|---------------|---------|--------------------------------------|
| **CUSTNAME**  | string  | Customer ID (primary key)            |
| CUSTDES       | string  | Customer name / description          |
| PHONE         | string  | Phone number                         |
| EMAIL         | string  | Email address                        |
| ADDRESS       | string  | Street address                       |
| CITY          | string  | City                                 |
| STATE         | string  | State / region                       |
| COUNTRY       | string  | Country                              |
| BALANCE       | number  | Current balance                      |
| CREDIT_LIMIT  | number  | Credit limit                         |
| STATUS        | string  | `A` = Active, `I` = Inactive         |

---

### ORDERS

Sales orders.

| Field        | Type    | Description                                    |
|--------------|---------|------------------------------------------------|
| **ORDNAME**  | string  | Order number (primary key)                     |
| CUSTNAME     | string  | Customer ID (FK to CUSTOMERS)                  |
| CURDATE      | string  | Order date (YYYY-MM-DD)                        |
| ORDSTATUS    | string  | `O` = Open, `C` = Closed, `P` = In Progress   |
| QPRICE       | number  | Total order price                              |
| DETAILS      | string  | Order notes / details                          |

**Subform:** `ORDERITEMS_SUBFORM`

---

### ORDERITEMS_SUBFORM

Line items within an order.

| Field      | Type    | Description                              |
|------------|---------|------------------------------------------|
| LINE       | integer | Line number (auto-generated, key)        |
| PARTNAME   | string  | Part ID (FK to LOGPART)                  |
| TQUANT     | number  | Quantity                                 |
| PRICE      | number  | Unit price                               |
| DUEDATE    | string  | Due date (YYYY-MM-DD)                    |
| KLINE      | string  | Reference line                           |

---

### LOGPART

Parts / Products catalog.

| Field         | Type    | Description                          |
|---------------|---------|--------------------------------------|
| **PARTNAME**  | string  | Part ID (primary key)                |
| PARTDES       | string  | Part description                     |
| BARCODE       | string  | Barcode                              |
| UNIT          | string  | Unit of measure                      |
| SELLPRICE     | number  | Selling price                        |
| COSTPRICE     | number  | Cost price                           |
| INVENTORY     | integer | Current inventory quantity           |
| FAMILY        | string  | Product family / category            |
| STATUS        | string  | Part status                          |

---

### AINVOICES

Accounts receivable invoices.

| Field        | Type    | Description                           |
|--------------|---------|---------------------------------------|
| **IVNUM**    | string  | Invoice number (primary key)          |
| CUSTNAME     | string  | Customer ID (FK to CUSTOMERS)         |
| IVDATE       | string  | Invoice date (YYYY-MM-DD)             |
| TOTAL        | number  | Invoice total                         |
| IVSTATUS     | string  | `O` = Open, `P` = Paid               |
| PAYDATE      | string  | Payment date (YYYY-MM-DD)             |

**Subform:** `AINVOICEITEMS_SUBFORM`

---

### AINVOICEITEMS_SUBFORM

Line items within an invoice.

| Field      | Type    | Description                   |
|------------|---------|-------------------------------|
| LINE       | integer | Line number (key)             |
| PARTNAME   | string  | Part ID (FK to LOGPART)       |
| TQUANT     | number  | Quantity                      |
| PRICE      | number  | Unit price                    |

---

### SUPPLIERS

Supplier / vendor master data.

| Field        | Type    | Description                    |
|--------------|---------|--------------------------------|
| **SUPNAME**  | string  | Supplier ID (primary key)      |
| SUPDES       | string  | Supplier name / description    |
| PHONE        | string  | Phone number                   |
| EMAIL        | string  | Email address                  |
| ADDRESS      | string  | Street address                 |
| COUNTRY      | string  | Country                        |
| STATUS       | string  | Supplier status                |

---

### WORKORDERS

Manufacturing work orders.

| Field        | Type    | Description                                         |
|--------------|---------|-----------------------------------------------------|
| **WONUM**    | string  | Work order number (primary key)                     |
| PARTNAME     | string  | Part being manufactured (FK to LOGPART)             |
| TQUANT       | number  | Quantity to produce                                 |
| STARTDATE    | string  | Start date (YYYY-MM-DD)                             |
| ENDDATE      | string  | End date (YYYY-MM-DD)                               |
| WOSTATUS     | string  | `P` = Planned, `A` = Active, `C` = Completed       |
| PRIORITY     | integer | Priority level                                      |

---

### BOM

Bill of Materials.

| Field        | Type    | Description                      |
|--------------|---------|----------------------------------|
| **BOMNAME**  | string  | BOM ID (primary key)             |
| PARTNAME     | string  | Parent part (FK to LOGPART)      |
| BOMDES       | string  | BOM description                  |
| REVISION     | string  | Revision number                  |
| STATUS       | string  | BOM status                       |

**Subform:** `BOMITEMS_SUBFORM`

---

### BOMITEMS_SUBFORM

Components within a BOM.

| Field      | Type    | Description                        |
|------------|---------|------------------------------------|
| LINE       | integer | Line number (key)                  |
| CHILDPART  | string  | Component part (FK to LOGPART)     |
| TQUANT     | number  | Quantity required                  |
| UNIT       | string  | Unit of measure                    |

---

### PRODUCTIONPLANS

Production planning.

| Field          | Type    | Description                    |
|----------------|---------|--------------------------------|
| **PLANNAME**   | string  | Plan ID (primary key)          |
| PLANDES        | string  | Plan description               |
| STARTDATE      | string  | Start date (YYYY-MM-DD)        |
| ENDDATE        | string  | End date (YYYY-MM-DD)          |
| STATUS         | string  | Plan status                    |

---

### EMPLOYEES

Employee master data.

| Field        | Type    | Description                    |
|--------------|---------|--------------------------------|
| **EMPNUM**   | string  | Employee number (primary key)  |
| EMPNAME      | string  | Employee name                  |
| DEPT         | string  | Department code                |
| POSITION     | string  | Job position                   |
| HIREDATE     | string  | Hire date (YYYY-MM-DD)         |
| PHONE        | string  | Phone number                   |
| EMAIL        | string  | Email address                  |
| STATUS       | string  | Employee status                |

---

### TIMESHEETS

Employee time tracking.

| Field          | Type    | Description                    |
|----------------|---------|--------------------------------|
| **TSNUM**      | string  | Timesheet ID (primary key)     |
| EMPNUM         | string  | Employee number (FK)           |
| TSDATE         | string  | Date (YYYY-MM-DD)              |
| HOURS          | number  | Hours worked                   |
| PROJECT        | string  | Project name                   |
| DESCRIPTION    | string  | Work description               |

---

### DEPARTMENTS

Department master data.

| Field         | Type    | Description                    |
|---------------|---------|--------------------------------|
| **DEPTCODE**  | string  | Department code (primary key)  |
| DEPTDES       | string  | Department description         |
| MANAGER       | string  | Manager name                   |
| HEADCOUNT     | integer | Number of employees            |

---

## URL Patterns

The API follows OData-style URL conventions:

### Entity Operations

| Operation       | Method   | URL Pattern                      |
|-----------------|----------|----------------------------------|
| List all        | `GET`    | `/api/ENTITY`                    |
| Get by key      | `GET`    | `/api/ENTITY('KEY')`             |
| Create          | `POST`   | `/api/ENTITY`                    |
| Update          | `PATCH`  | `/api/ENTITY('KEY')`             |
| Delete          | `DELETE` | `/api/ENTITY('KEY')`             |

### Subform Operations

| Operation       | Method   | URL Pattern                              |
|-----------------|----------|------------------------------------------|
| List items      | `GET`    | `/api/PARENT('KEY')/SUBFORM`             |
| Create item     | `POST`   | `/api/PARENT('KEY')/SUBFORM`             |
| Update item     | `PATCH`  | `/api/PARENT('KEY')/SUBFORM(LINE)`       |
| Delete item     | `DELETE` | `/api/PARENT('KEY')/SUBFORM(LINE)`       |

**Examples:**

```
GET    /api/ORDERS('ORD001')
GET    /api/ORDERS('ORD001')/ORDERITEMS_SUBFORM
POST   /api/ORDERS('ORD001')/ORDERITEMS_SUBFORM
PATCH  /api/ORDERS('ORD001')/ORDERITEMS_SUBFORM(2)
DELETE /api/ORDERS('ORD001')/ORDERITEMS_SUBFORM(2)
```

---

## Query Parameters

All query parameters use the `$` prefix (OData convention):

### $filter

Filter results by field values.

**Supported operators:** `eq`, `ne`, `gt`, `ge`, `lt`, `le`, `and`, `or`

```
GET /api/CUSTOMERS?$filter=STATUS eq 'A'
GET /api/CUSTOMERS?$filter=BALANCE gt 5000
GET /api/CUSTOMERS?$filter=CITY eq 'Tel Aviv' and STATUS eq 'A'
GET /api/LOGPART?$filter=FAMILY eq 'Electronics' or FAMILY eq 'Hardware'
GET /api/ORDERS?$filter=ORDSTATUS ne 'C'
```

### $orderby

Sort results by one or more fields.

```
GET /api/CUSTOMERS?$orderby=CUSTDES asc
GET /api/ORDERS?$orderby=CURDATE desc
GET /api/LOGPART?$orderby=FAMILY asc,SELLPRICE desc
```

### $top

Limit the number of results returned.

```
GET /api/ORDERS?$top=10
GET /api/LOGPART?$top=5&$orderby=SELLPRICE desc
```

### $skip

Skip a number of results (for pagination).

```
GET /api/CUSTOMERS?$skip=10&$top=10
```

### $select

Return only specific fields.

```
GET /api/CUSTOMERS?$select=CUSTNAME,CUSTDES,BALANCE
GET /api/LOGPART?$select=PARTNAME,PARTDES,SELLPRICE,INVENTORY
```

### $expand

Include subform data in the response.

```
GET /api/ORDERS('ORD001')?$expand=ORDERITEMS_SUBFORM
GET /api/ORDERS?$expand=ORDERITEMS_SUBFORM
GET /api/BOM('BOM001')?$expand=BOMITEMS_SUBFORM
GET /api/AINVOICES('INV001')?$expand=AINVOICEITEMS_SUBFORM
```

### Combined Example

```
GET /api/ORDERS?$filter=ORDSTATUS eq 'O'&$orderby=CURDATE desc&$top=5&$expand=ORDERITEMS_SUBFORM&$select=ORDNAME,CUSTNAME,QPRICE
```

---

## CRUD Examples with curl

### List Customers

```bash
curl -H "X-API-Key: test-key" \
  "http://localhost:3000/api/CUSTOMERS"
```

### List Customers (Active only, in Tel Aviv)

```bash
curl -H "X-API-Key: test-key" \
  "http://localhost:3000/api/CUSTOMERS?\$filter=STATUS eq 'A' and CITY eq 'Tel Aviv'"
```

### Get a Specific Order with Items Expanded

```bash
curl -H "X-API-Key: test-key" \
  "http://localhost:3000/api/ORDERS('ORD001')?\$expand=ORDERITEMS_SUBFORM"
```

### Create a New Customer

```bash
curl -X POST \
  -H "X-API-Key: test-key" \
  -H "Content-Type: application/json" \
  -d '{
    "CUSTNAME": "CUST999",
    "CUSTDES": "Acme Corp",
    "PHONE": "03-1234567",
    "EMAIL": "info@acme.co.il",
    "CITY": "Haifa",
    "COUNTRY": "Israel",
    "STATUS": "A",
    "BALANCE": 0,
    "CREDIT_LIMIT": 50000
  }' \
  "http://localhost:3000/api/CUSTOMERS"
```

### Create a New Order

```bash
curl -X POST \
  -H "X-API-Key: test-key" \
  -H "Content-Type: application/json" \
  -d '{
    "ORDNAME": "ORD500",
    "CUSTNAME": "CUST001",
    "CURDATE": "2025-01-15",
    "ORDSTATUS": "O",
    "QPRICE": 1500.00,
    "DETAILS": "Urgent delivery needed"
  }' \
  "http://localhost:3000/api/ORDERS"
```

### Add an Item to an Order (Subform Create)

```bash
curl -X POST \
  -H "X-API-Key: test-key" \
  -H "Content-Type: application/json" \
  -d '{
    "PARTNAME": "PART001",
    "TQUANT": 10,
    "PRICE": 150.00,
    "DUEDATE": "2025-02-01"
  }' \
  "http://localhost:3000/api/ORDERS('ORD500')/ORDERITEMS_SUBFORM"
```

### Update Order Status

```bash
curl -X PATCH \
  -H "X-API-Key: test-key" \
  -H "Content-Type: application/json" \
  -d '{"ORDSTATUS": "P"}' \
  "http://localhost:3000/api/ORDERS('ORD500')"
```

### Delete an Order

```bash
curl -X DELETE \
  -H "X-API-Key: test-key" \
  "http://localhost:3000/api/ORDERS('ORD500')"
```

### Filter Products by Family

```bash
curl -H "X-API-Key: test-key" \
  "http://localhost:3000/api/LOGPART?\$filter=FAMILY eq 'Electronics'"
```

### Get Employees Sorted by Name

```bash
curl -H "X-API-Key: test-key" \
  "http://localhost:3000/api/EMPLOYEES?\$orderby=EMPNAME asc"
```

### Update a Subform Item (Change Quantity on Order Line)

```bash
curl -X PATCH \
  -H "X-API-Key: test-key" \
  -H "Content-Type: application/json" \
  -d '{"TQUANT": 25}' \
  "http://localhost:3000/api/ORDERS('ORD001')/ORDERITEMS_SUBFORM(1)"
```

### Delete a Subform Item

```bash
curl -X DELETE \
  -H "X-API-Key: test-key" \
  "http://localhost:3000/api/ORDERS('ORD001')/ORDERITEMS_SUBFORM(3)"
```

---

## Response Format

### List Response (GET collection)

```json
{
  "value": [
    {
      "CUSTNAME": "CUST001",
      "CUSTDES": "Alpha Technologies",
      "PHONE": "03-5551234",
      "EMAIL": "contact@alpha.co.il",
      "CITY": "Tel Aviv",
      "STATUS": "A",
      "BALANCE": 12500.00,
      "CREDIT_LIMIT": 100000
    },
    {
      "CUSTNAME": "CUST002",
      "CUSTDES": "Beta Industries",
      ...
    }
  ]
}
```

### Single Entity Response (GET by key)

```json
{
  "ORDNAME": "ORD001",
  "CUSTNAME": "CUST001",
  "CURDATE": "2025-01-10",
  "ORDSTATUS": "O",
  "QPRICE": 4500.00,
  "DETAILS": "Standard delivery",
  "ORDERITEMS_SUBFORM": [
    {
      "LINE": 1,
      "PARTNAME": "PART001",
      "TQUANT": 5,
      "PRICE": 500.00,
      "DUEDATE": "2025-02-01"
    },
    {
      "LINE": 2,
      "PARTNAME": "PART003",
      "TQUANT": 10,
      "PRICE": 200.00,
      "DUEDATE": "2025-02-01"
    }
  ]
}
```

> **Note:** Subform data is only included when using `$expand`.

### Error Response

```json
{
  "error": "NOT_FOUND",
  "message": "Entity ORDERS('ORD999') not found"
}
```

### HTTP Status Codes

| Code | Meaning                                         |
|------|-------------------------------------------------|
| 200  | Success (GET, PATCH)                            |
| 201  | Created (POST)                                  |
| 204  | No Content (DELETE)                             |
| 400  | Bad Request (invalid data or missing fields)    |
| 401  | Unauthorized (missing or invalid API key)       |
| 404  | Not Found (entity or key does not exist)        |
| 409  | Conflict (duplicate key on create)              |

---

## Special Endpoints

These endpoints do **not** require authentication:

| Endpoint          | Description                                      |
|-------------------|--------------------------------------------------|
| `GET /api/health` | Health check -- returns server status            |
| `GET /api/$metadata` | OData metadata -- lists all entities and fields |
| `GET /openapi.yaml`  | OpenAPI 3.0 spec (machine-readable)           |
| `GET /docs`          | Swagger UI (interactive documentation)         |

### Health Check Example

```bash
curl http://localhost:3000/api/health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### Metadata Example

```bash
curl http://localhost:3000/api/\$metadata
```

---

## Tips for AI Agents

### Getting Started

1. **Point your agent to the OpenAPI spec** for the complete machine-readable API definition:
   ```
   GET /openapi.yaml
   ```

2. **Use `$metadata` for entity discovery** -- your agent can learn what entities and fields are available at runtime:
   ```
   GET /api/$metadata
   ```

3. **Start simple** -- begin with `CUSTOMERS` and `ORDERS` for basic agent tasks, then expand to more complex multi-entity operations.

### Entity Relationships

Understanding how entities relate to each other is essential for building effective agents:

```
CUSTOMERS.CUSTNAME  <--  ORDERS.CUSTNAME
CUSTOMERS.CUSTNAME  <--  AINVOICES.CUSTNAME
LOGPART.PARTNAME    <--  ORDERITEMS_SUBFORM.PARTNAME
LOGPART.PARTNAME    <--  AINVOICEITEMS_SUBFORM.PARTNAME
LOGPART.PARTNAME    <--  WORKORDERS.PARTNAME
LOGPART.PARTNAME    <--  BOM.PARTNAME
LOGPART.PARTNAME    <--  BOMITEMS_SUBFORM.CHILDPART
EMPLOYEES.EMPNUM    <--  TIMESHEETS.EMPNUM
DEPARTMENTS.DEPTCODE <-- EMPLOYEES.DEPT
ORDERS.ORDNAME      -->  ORDERITEMS_SUBFORM (subform)
AINVOICES.IVNUM     -->  AINVOICEITEMS_SUBFORM (subform)
BOM.BOMNAME         -->  BOMITEMS_SUBFORM (subform)
```

### Agent Design Patterns

- **Lookup pattern:** When creating an order, first query `CUSTOMERS` to validate the `CUSTNAME` exists, then query `LOGPART` to validate part numbers before adding items.

- **Report pattern:** Combine `$filter`, `$expand`, and `$select` to build reports. For example, get all open orders for a customer with their line items.

- **Multi-step workflow:** Create an order, add line items one by one, then update the order status -- simulating a real ERP workflow.

### Important Notes

- **Data resets on server restart.** All changes are in-memory only. This is by design for the workshop -- participants can freely experiment without breaking anything permanently.

- **Field names are uppercase.** Following Priority ERP conventions, all field names use UPPER_CASE (e.g., `CUSTNAME`, `ORDSTATUS`).

- **Dates use ISO format.** All date fields expect and return `YYYY-MM-DD` format.

- **Keys are strings.** Even numeric-looking keys (like order numbers) are passed as strings in the URL with single quotes: `ORDERS('ORD001')`.

- **Subform LINE is auto-generated.** When creating subform items via POST, the `LINE` field is automatically assigned. You do not need to provide it.

### Example Agent Tasks for the Workshop

1. **Customer inquiry agent:** "How much does customer CUST001 owe? Show their open orders and unpaid invoices."

2. **Order management agent:** "Create a new order for customer CUST002 with 5 units of PART001 and 3 units of PART003."

3. **Inventory check agent:** "Which parts have inventory below 10 units? Are there any open work orders to replenish them?"

4. **Reporting agent:** "Generate a summary of all orders placed this month, grouped by customer."

5. **Full workflow agent:** "Find the customer with the highest balance, check their credit limit, and if they have room, create a new order for them."

---

## Quick Reference Card

```
# Authentication
Header: X-API-Key: test-key

# Basic CRUD
GET    /api/ENTITY                    # List all
GET    /api/ENTITY('KEY')             # Get one
POST   /api/ENTITY                    # Create
PATCH  /api/ENTITY('KEY')             # Update
DELETE /api/ENTITY('KEY')             # Delete

# Subforms
GET    /api/PARENT('KEY')/SUBFORM           # List items
POST   /api/PARENT('KEY')/SUBFORM           # Add item
PATCH  /api/PARENT('KEY')/SUBFORM(LINE)     # Update item
DELETE /api/PARENT('KEY')/SUBFORM(LINE)     # Remove item

# Query params
$filter=FIELD eq 'value'
$orderby=FIELD asc
$top=10
$skip=20
$select=FIELD1,FIELD2
$expand=SUBFORM_NAME

# No auth needed
GET /api/health
GET /api/$metadata
GET /openapi.yaml
GET /docs
```

---

*This documentation is part of the "Building AI Agents with Gemini SDK" workshop. For questions or issues, ask your workshop instructor.*

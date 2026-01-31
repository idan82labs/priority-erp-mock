# 🕵️ Workshop Exercises: AI Agent CTF Challenge

## Building Intelligent Agents with Google ADK & Priority ERP

> **Duration:** 4 hours | **Participants:** ~20 | **Level:** Intermediate
>
> <!-- מסמך תרגילים לסדנת סוכני AI עם Priority ERP -->

---

## Overview

Welcome to the AI Agent CTF (Capture The Flag) Challenge! In this workshop, you'll build intelligent agents using **Google's Agent Development Kit (ADK)** that interact with a shared Priority ERP mock system via REST API.

You'll build **two types of agents** that battle each other:

1. **"Chaos Agent" (סוכן הכאוס)** — Creates realistic ERP data anomalies and bugs that would be visible in the system. Think of it as a sophisticated red-team exercise for ERP data integrity.

2. **"Detective Agent" (סוכן הבלש)** — Scans the ERP data to find anomalies, classify them, and report them. This is your blue-team defense system.

The twist? Your Chaos Agent's anomalies need to fool other teams' Detective Agents, and your Detective Agent needs to catch anomalies injected by other teams. Points are awarded for both successful attacks and successful detections.

**All ~20 participants share a single ERP instance** — the data is a shared battlefield!

---

## Prerequisites

| Item | Details |
|------|---------|
| API Endpoint | `http://__INSTRUCTOR_FILL__:3000` |
| API Key | Provided by instructor at start of workshop |
| API Docs | `{endpoint}/openapi.yaml` and `{endpoint}/docs` |
| Python | 3.10+ |
| Google ADK | `pip install google-adk` |
| HTTP Client | `pip install requests` (or `httpx`) |

### Quick Setup

```bash
pip install google-adk requests
```

```python
# .env or environment variables
# ERP_API_ENDPOINT=http://<server>:3000
# ERP_API_KEY=test-key
# GEMINI_API_KEY=<your-gemini-key>
```

<!-- וודאו שיש לכם גישה לשרת לפני שמתחילים -->

---

## 📋 Exercise 1: ERP Data Explorer Agent (Warmup)

> **Duration:** ~30 minutes | **Points:** 10 for a working agent

### Goal

Build an agent that connects to the ERP API, explores the data, and answers natural language questions about it.

### Requirements

Your agent should be able to:

- [x] Connect to the ERP API with proper authentication
- [x] List all available entities (CUSTOMERS, ORDERS, LOGPART, etc.)
- [x] Display summary statistics (record counts per entity)
- [x] Answer freeform questions about the data

### Example Prompts to Test Your Agent

```
"How many open orders are there?"
"Which customer has the highest balance?"
"כמה מוצרים יש במערכת?"  (How many products are in the system?)
"List all customers with credit limit above 50,000"
"What's the total value of pending orders?"
"Show me the last 5 invoices created"
```

### Starter Code

```python
import os
import requests
import google.generativeai as genai

# Configuration
API_ENDPOINT = os.environ.get("ERP_API_ENDPOINT", "http://localhost:3000")
API_KEY = os.environ.get("ERP_API_KEY", "test-key")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

# Define the ERP API tool
def query_erp(entity: str, params: dict = None) -> dict:
    """Query the ERP API for a given entity."""
    headers = {"X-API-Key": API_KEY}
    url = f"{API_ENDPOINT}/api/{entity}"
    response = requests.get(url, headers=headers, params=params or {})
    response.raise_for_status()
    return response.json()

# Define tools for Gemini
tools = [
    {
        "function_declarations": [
            {
                "name": "query_erp",
                "description": "Query the Priority ERP system. Supports OData-style parameters.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "entity": {
                            "type": "string",
                            "description": "Entity name: CUSTOMERS, ORDERS, LOGPART, AINVOICES, etc."
                        },
                        "filter": {
                            "type": "string",
                            "description": "OData $filter expression, e.g. ORDSTATUS eq 'O'"
                        },
                        "top": {
                            "type": "integer",
                            "description": "Number of records to return ($top)"
                        },
                        "orderby": {
                            "type": "string",
                            "description": "Sort expression ($orderby), e.g. CREATEDDATE desc"
                        },
                        "select": {
                            "type": "string",
                            "description": "Fields to return ($select), comma-separated"
                        }
                    },
                    "required": ["entity"]
                }
            }
        ]
    }
]

# Build the agent
model = genai.GenerativeModel(
    "gemini-2.0-flash",
    tools=tools,
    system_instruction="""You are an ERP data analyst agent. You help users explore
    and understand data in a Priority ERP system. Use the query_erp tool to fetch data
    and answer questions. Available entities: CUSTOMERS, ORDERS, ORDERITEMS_SUBFORM,
    LOGPART, AINVOICES, INVOICEITEMS_SUBFORM, SUPPLIERS, WORKORDERS, BOM,
    PRODUCTIONPLANS, EMPLOYEES, TIMESHEETS, DEPARTMENTS."""
)

chat = model.start_chat()

# Agent loop
while True:
    user_input = input("\n🔍 Ask about ERP data (or 'quit'): ")
    if user_input.lower() == 'quit':
        break

    response = chat.send_message(user_input)

    # Handle function calls
    while response.candidates[0].content.parts[0].function_call:
        fc = response.candidates[0].content.parts[0].function_call
        args = dict(fc.args)

        # Build query params
        params = {}
        if "filter" in args:
            params["$filter"] = args.pop("filter")
        if "top" in args:
            params["$top"] = args.pop("top")
        if "orderby" in args:
            params["$orderby"] = args.pop("orderby")
        if "select" in args:
            params["$select"] = args.pop("select")

        entity = args["entity"]
        result = query_erp(entity, params)

        response = chat.send_message(
            genai.protos.Content(
                parts=[genai.protos.Part(
                    function_response=genai.protos.FunctionResponse(
                        name="query_erp",
                        response={"result": result}
                    )
                )]
            )
        )

    print(f"\n{response.text}")
```

### Success Criteria

Demonstrate your agent answering at least 3 different questions about the ERP data. Show the instructor to earn your 10 points!

---

## 💣 Exercise 2: The Chaos Agent

> **Duration:** ~45 minutes | **Points:** 5-15 per anomaly injected (by difficulty)

### Goal

Build an agent that creates **realistic but anomalous** ERP data. The best anomalies are ones that look plausible at first glance but violate business rules or data integrity constraints.

<!-- המטרה: ליצור נתונים שנראים אמיתיים אבל מכילים חריגות שסוכן אחר צריך לגלות -->

### Chaos Scenarios

---

#### Scenario 1: Price Manipulation (מניפולציית מחירים)

**Difficulty:** ⭐ (5 points)

Create orders where item prices are wildly wrong — negative prices, absurdly high prices, or prices that don't match the product catalog.

**Example:** Bearing BRG-001 (מיסב כדורי 6205) with catalog SELLPRICE of 85 NIS listed at 50,000 NIS.

```bash
# Create an order with manipulated prices
curl -X POST "${API_ENDPOINT}/api/ORDERS" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "ORDNAME": "ORD-CHAOS-001",
    "CUSTNAME": "C001",
    "ORDSTATUS": "O",
    "CURDATE": "2024-01-15",
    "QPRICE": 5000000
  }'

# Add an item with absurd pricing
curl -X POST "${API_ENDPOINT}/api/ORDERS('\''ORD-CHAOS-001'\'')/ORDERITEMS_SUBFORM" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "PARTNAME": "BRG-001",
    "TQUANT": 100,
    "PRICE": 50000.00,
    "DUEDATE": "2024-02-01"
  }'
```

**What it looks like in the ERP:** An order for 100 bearings totaling 5,000,000 NIS (catalog price is 85 NIS each = 8,500 NIS). A procurement manager would have a heart attack.

---

#### Scenario 2: Phantom Customer (לקוח פנטום)

**Difficulty:** ⭐ (5 points)

Create orders referencing customer IDs that don't exist in the CUSTOMERS entity.

```bash
# Create an order for a non-existent customer
curl -X POST "${API_ENDPOINT}/api/ORDERS" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "ORDNAME": "ORD-PHANTOM-001",
    "CUSTNAME": "C099",
    "ORDSTATUS": "O",
    "CURDATE": "2024-01-20",
    "QPRICE": 15000,
    "DETAILS": "Urgent delivery"
  }'
```

**What it looks like in the ERP:** An open order referencing customer C099 which does not exist in CUSTOMERS — who placed this order?!

---

#### Scenario 3: Date Paradox (פרדוקס תאריכים)

**Difficulty:** ⭐ (5 points)

Create records with impossible temporal relationships — invoices in the future, due dates before order dates, delivery before manufacturing.

```bash
# Invoice dated in the future
curl -X POST "${API_ENDPOINT}/api/AINVOICES" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "IVNUM": "INV-FUTURE-001",
    "CUSTNAME": "C001",
    "IVDATE": "2027-06-15",
    "TOTAL": 15000.00,
    "IVSTATUS": "O"
  }'

# Order with due date before creation date
curl -X POST "${API_ENDPOINT}/api/ORDERS" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "ORDNAME": "ORD-DATE-001",
    "CUSTNAME": "C002",
    "CURDATE": "2024-03-15",
    "ORDSTATUS": "O",
    "QPRICE": 5000
  }'
# Then add items with DUEDATE of 2024-01-01 (before the order was created)
```

---

#### Scenario 4: Inventory Ghost (מלאי רפאים)

**Difficulty:** ⭐⭐ (10 points)

Set product inventory to negative values or impossibly large quantities.

```bash
# Set inventory to negative
curl -X PATCH "${API_ENDPOINT}/api/LOGPART('SEN-001')" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "INVENTORY": -500
  }'
```

**What it looks like in the ERP:** Product SEN-001 (חיישן טמפרטורה PT100) showing -500 units in stock. Did someone ship items from an alternate dimension?

---

#### Scenario 5: Duplicate Mayhem (כפילויות)

**Difficulty:** ⭐⭐ (10 points)

Create duplicate invoices — same customer, same date, same amount. This is a classic ERP fraud pattern.

```bash
# Create two identical invoices (suspicious duplicate pattern)
curl -X POST "${API_ENDPOINT}/api/AINVOICES" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "IVNUM": "INV-DUP-001",
    "CUSTNAME": "C003",
    "IVDATE": "2024-02-10",
    "TOTAL": 45000.00,
    "IVSTATUS": "O"
  }'

curl -X POST "${API_ENDPOINT}/api/AINVOICES" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "IVNUM": "INV-DUP-002",
    "CUSTNAME": "C003",
    "IVDATE": "2024-02-10",
    "TOTAL": 45000.00,
    "IVSTATUS": "O"
  }'
```

---

#### Scenario 6: Status Confusion (בלבול סטטוסים)

**Difficulty:** ⭐⭐ (10 points)

Create logically impossible status combinations — shipped orders with zero items, cancelled orders with recent modifications.

```bash
# Order marked as Closed but with no items
curl -X POST "${API_ENDPOINT}/api/ORDERS" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "ORDNAME": "ORD-EMPTY-001",
    "CUSTNAME": "C001",
    "ORDSTATUS": "C",
    "CURDATE": "2024-01-10",
    "QPRICE": 25000,
    "DETAILS": "Completed order"
  }'
# Don't add any ORDERITEMS_SUBFORM records!
# A "Closed" order with QPRICE of 25000 but zero line items is suspicious
```

---

#### Scenario 7: Credit Breach (חריגת אשראי)

**Difficulty:** ⭐⭐ (10 points)

Update a customer's balance to significantly exceed their credit limit.

```bash
# First check the customer's credit limit, then breach it
# C002 (Global Tech Solutions) has CREDIT_LIMIT of 250,000
curl -X PATCH "${API_ENDPOINT}/api/CUSTOMERS('C002')" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "BALANCE": 900000.00
  }'
# CREDIT_LIMIT is 250,000 — that's a 3.6x breach!
```

---

#### Scenario 8: Orphan Items (פריטים יתומים)

**Difficulty:** ⭐⭐ (10 points)

Create order items that reference products (PARTNAME) that don't exist in the LOGPART entity.

```bash
curl -X POST "${API_ENDPOINT}/api/ORDERS('ORD002')/ORDERITEMS_SUBFORM" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "PARTNAME": "FAKE-PART-999",
    "TQUANT": 50,
    "PRICE": 100.00,
    "DUEDATE": "2024-03-01"
  }'
```

---

#### Scenario 9: Employee Ghost (עובד רפאים)

**Difficulty:** ⭐⭐⭐ (15 points)

Create timesheets for employees that don't exist in the EMPLOYEES entity. This simulates a payroll fraud pattern.

```bash
curl -X POST "${API_ENDPOINT}/api/TIMESHEETS" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "TSNUM": "TS-GHOST-001",
    "EMPNUM": "EMP099",
    "TSDATE": "2024-03-01",
    "HOURS": 10,
    "PROJECT": "WO002",
    "DESCRIPTION": "Regular maintenance work"
  }'
```

---

#### Scenario 10: BOM Recursion (רקורסיית עץ מוצר)

**Difficulty:** ⭐⭐⭐ (15 points)

Create a Bill of Materials where a component references itself — an infinite loop in the product tree.

```bash
# Create a BOM where the parent product is also a child component
curl -X POST "${API_ENDPOINT}/api/BOM" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "BOMNAME": "BOM-LOOP001",
    "PARTNAME": "MOT-001",
    "BOMDES": "Motor Assembly - Updated",
    "REVISION": "X",
    "STATUS": "A"
  }'

# Add MOT-001 as its own child component
curl -X POST "${API_ENDPOINT}/api/BOM('\''BOM-LOOP001'\'')/BOMITEMS_SUBFORM" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "CHILDPART": "MOT-001",
    "TQUANT": 2,
    "UNIT": "EA"
  }'
```

**What it looks like in the ERP:** To build 1 unit of MOT-001, you need 2 units of MOT-001. To build those 2, you need 4 more. Infinite loop!

---

### Building Your Chaos Agent

Your Chaos Agent should:
1. Accept a natural language instruction (e.g., "Create a price manipulation anomaly")
2. Plan which API calls to make
3. Execute them against the shared ERP instance
4. Confirm success and log what was injected

```python
# Chaos Agent tool definitions
chaos_tools = [
    {
        "function_declarations": [
            {
                "name": "create_erp_record",
                "description": "Create a new record in the ERP system",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "entity": {"type": "string"},
                        "data": {"type": "object", "description": "Record fields"}
                    },
                    "required": ["entity", "data"]
                }
            },
            {
                "name": "update_erp_record",
                "description": "Update an existing ERP record",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "entity": {"type": "string"},
                        "record_id": {"type": "string"},
                        "data": {"type": "object"}
                    },
                    "required": ["entity", "record_id", "data"]
                }
            },
            {
                "name": "create_subform_record",
                "description": "Create a record in a sub-form (e.g., order items)",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "parent_entity": {"type": "string"},
                        "parent_id": {"type": "string"},
                        "subform": {"type": "string"},
                        "data": {"type": "object"}
                    },
                    "required": ["parent_entity", "parent_id", "subform", "data"]
                }
            }
        ]
    }
]
```

### Tips for Effective Chaos

- **Be subtle**: The best anomalies are ones that look almost normal. A price of 50,000 for a screw is obvious; a price of 15.00 when the catalog says 1.50 is sneakier.
- **Use realistic names**: Don't name your phantom customer "FAKE-123". Use something like "C089" that blends in.
- **Create plausible context**: If you create a future-dated invoice, make the amount and customer realistic.
- **Document what you inject**: You'll need to prove your anomalies later!

---

## 🔍 Exercise 3: The Detective Agent

> **Duration:** ~60 minutes | **Points:** 10 per anomaly detected, 5 per correct classification

### Goal

Build an agent that systematically scans ALL ERP data and detects anomalies using cross-referencing, business rule validation, and pattern analysis.

### Detection Strategies

Your Detective Agent should implement these checks:

#### 1. Cross-Reference Validation (אימות הצלבה)
```
Do all ORDERS.CUSTNAME values exist in CUSTOMERS?
Do all ORDERITEMS_SUBFORM.PARTNAME values exist in LOGPART?
Do all TIMESHEETS.EMPNUM values exist in EMPLOYEES?
Do all BOMITEMS_SUBFORM.CHILDPART values exist in LOGPART?
```

#### 2. Business Rule Validation (חוקים עסקיים)
```
Are prices within a reasonable range? (e.g., 0 < price < 100,000)
Are quantities positive?
Do order totals match the sum of their items?
```

#### 3. Temporal Logic Checks (בדיקות זמן)
```
Order date < Item due date < Delivery date?
Invoice date <= today?
Timesheet date is not in the future?
```

#### 4. Balance/Limit Checks (גבולות אשראי)
```
Customer BALANCE <= CREDIT_LIMIT?
No negative balances or impossibly high values?
```

#### 5. Inventory Sanity (שפיות מלאי)
```
INVENTORY >= 0 for all products?
SELLPRICE > COSTPRICE (valid margin)?
No products with impossibly high inventory values?
```

#### 6. Status Consistency (עקביות סטטוס)
```
"C" (Closed) orders have items?
Orders with QPRICE > 0 have matching ORDERITEMS_SUBFORM records?
Work order statuses match their date ranges (Active but past ENDDATE)?
```

#### 7. Duplicate Detection (זיהוי כפילויות)
```
Same customer + same date + same amount = suspicious invoice?
Identical order items on the same order?
```

#### 8. Orphan Record Detection (רשומות יתומות)
```
Order items with no parent order?
Invoices for non-existent orders?
Sub-form records with broken parent references?
```

#### 9. BOM Integrity (תקינות עץ מוצר)
```
Self-referencing BOM entries?
Circular references in component trees?
Components with zero or negative quantities?
```

#### 10. Employee/Timesheet Validation (עובדים ודיווחי שעות)
```
TIMESHEETS.EMPNUM exists in EMPLOYEES?
Excessive hours (HOURS > 24 in a single entry)?
TSDATE is not in the future?
```

### Detective Agent Output Format

Your agent should produce a structured report. Here's the schema:

```python
from dataclasses import dataclass
from typing import Literal

@dataclass
class AnomalyReport:
    anomaly_type: str                    # e.g., "Price Manipulation", "Orphan Record"
    severity: Literal["Critical", "Warning", "Info"]
    entity: str                          # e.g., "ORDERS", "LOGPART"
    record_id: str                       # e.g., "ORD-042"
    description: str                     # Human-readable description
    evidence: dict                       # Raw data that proves the anomaly
    suggested_fix: str                   # How to remediate
```

Example output:

```json
{
  "anomalies": [
    {
      "anomaly_type": "Price Manipulation",
      "severity": "Critical",
      "entity": "ORDERITEMS_SUBFORM",
      "record_id": "ORD-042/ITEM-003",
      "description": "Item BRG-001 (מיסב כדורי 6205) priced at 50,000 NIS. Catalog SELLPRICE: 85 NIS.",
      "evidence": {
        "current_price": 50000.00,
        "product": "BRG-001",
        "catalog_price": 85.00
      },
      "suggested_fix": "Update PRICE to catalog SELLPRICE value of 85 NIS"
    },
    {
      "anomaly_type": "Phantom Customer",
      "severity": "Critical",
      "entity": "ORDERS",
      "record_id": "ORD-077",
      "description": "Order references customer C099 which does not exist in CUSTOMERS.",
      "evidence": {
        "custname": "C099",
        "order_status": "O"
      },
      "suggested_fix": "Delete order or create matching customer record"
    }
  ],
  "summary": {
    "total_anomalies": 2,
    "critical": 2,
    "warning": 0,
    "info": 0
  }
}
```

### Detective Agent Architecture

```python
import json
import google.generativeai as genai

# System prompt for the detective
DETECTIVE_SYSTEM_PROMPT = """You are an ERP data integrity detective agent. Your job is to
systematically scan all data in the Priority ERP system and detect anomalies.

Strategy:
1. First, fetch all entities and get record counts
2. For each entity, fetch all records
3. Cross-reference between entities to find orphan records
4. Check business rules (prices, dates, quantities)
5. Look for duplicates and logical inconsistencies
6. Produce a structured anomaly report

Available entities: CUSTOMERS, ORDERS (with ORDERITEMS_SUBFORM), LOGPART,
AINVOICES (with INVOICEITEMS_SUBFORM), SUPPLIERS, WORKORDERS, BOM,
PRODUCTIONPLANS, EMPLOYEES, TIMESHEETS, DEPARTMENTS

Be thorough. Check EVERY record. The chaos agents are trying to hide anomalies in plain sight."""

# Use structured output for the report
detective_model = genai.GenerativeModel(
    "gemini-2.0-flash",
    tools=tools,  # Same query tools as before, plus:
    system_instruction=DETECTIVE_SYSTEM_PROMPT
)

# Run the full scan
response = detective_model.generate_content(
    "Scan all ERP data and produce a complete anomaly report. Be thorough.",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json"
    )
)
```

### Pro Tips for Detective Agents

- **Cache the data**: Fetch all entities once, then do cross-referencing in memory
- **Statistical approach**: Calculate mean/std for prices, flag outliers (> 3 sigma)
- **Chain of thought**: Let Gemini reason through each check step by step
- **Parallel checks**: Run independent validation checks concurrently
- **Context window management**: If data is large, process entity by entity

---

## ⚔️ Exercise 4: Agent vs Agent Battle

> **Duration:** ~45 minutes | **Points:** See scoring table below

### Rules of Engagement

1. Teams pair up (Team A vs Team B)
2. **Round 1**: Team A runs their Chaos Agent to inject exactly **5 anomalies**
   - Must document which anomalies were injected (sealed envelope / private note)
   - Anomalies must span at least 3 different types
3. **Round 2**: Team B's Detective Agent scans and produces a report
4. **Scoring**: Compare detective report against actual injected anomalies
5. **Swap**: Teams switch roles and repeat

### Battle Scoring

| Outcome | Points |
|---------|--------|
| Anomaly correctly detected | +10 |
| Anomaly type correctly classified | +5 bonus |
| False positive (reporting a normal record as anomalous) | -5 |
| Anomaly NOT detected (attacker bonus) | +15 to the attacking team |

### Battle Protocol

```
1. Chaos team announces: "5 anomalies injected" (but not what/where)
2. Detective team starts their agent
3. Timer: 5 minutes for detection
4. Detective team submits their report
5. Chaos team reveals their injection log
6. Instructor scores the round
```

### Strategies

**For Chaos Agents:**
- Mix easy and hard anomalies — guaranteed points for undetected ones
- Use realistic-looking data to avoid statistical detection
- Inject anomalies in less-commonly-checked entities (BOM, TIMESHEETS)
- Create multiple subtle anomalies rather than one obvious one

**For Detective Agents:**
- Don't just check the obvious (prices, dates) — check relationships!
- Build a baseline of "normal" before the chaos round starts
- Use timestamps to identify recently-created suspicious records
- Reduce false positives by requiring multiple signals before flagging

---

## 🔧 Exercise 5: Advanced — Self-Healing Agent (Bonus)

> **Duration:** ~30 minutes | **Points:** 10 per fix applied

### Goal

Extend your Detective Agent to not only find anomalies but **automatically fix them**. This simulates an autonomous ERP data quality system.

### Healing Actions

| Anomaly Type | Healing Action |
|-------------|---------------|
| Price Manipulation | Reset PRICE to SELLPRICE from LOGPART |
| Phantom Customer | Delete the orphan order (or mark ORDSTATUS as 'C') |
| Date Paradox | Adjust dates to logical sequence |
| Inventory Ghost | Reset INVENTORY to 0 if negative |
| Duplicate Invoices | Delete the duplicate (keep earliest IVNUM) |
| Status Confusion | Reset ORDSTATUS based on actual items/activity |
| Credit Breach | Cap BALANCE at CREDIT_LIMIT |
| Orphan Items | Remove items referencing non-existent PARTNAME |
| Employee Ghost | Delete timesheets for non-existent EMPNUM |
| BOM Recursion | Remove self-referencing BOMITEMS_SUBFORM entries |

### Self-Healing Agent Code Pattern

```python
def heal_anomaly(anomaly: dict) -> dict:
    """Apply a fix for a detected anomaly. Returns the action taken."""
    entity = anomaly["entity"]
    record_id = anomaly["record_id"]
    anomaly_type = anomaly["anomaly_type"]

    if anomaly_type == "Price Manipulation":
        # Look up catalog price
        product = query_erp("LOGPART", {"$filter": f"PARTNAME eq '{anomaly['evidence']['product']}'"})
        catalog_price = product["value"][0].get("SELLPRICE", 0)
        update_erp_record(entity, record_id, {"PRICE": catalog_price})
        return {"action": "price_reset", "old": anomaly["evidence"]["current_price"], "new": catalog_price}

    elif anomaly_type == "Inventory Ghost":
        update_erp_record("LOGPART", record_id, {"INVENTORY": 0})
        return {"action": "inventory_reset", "old": anomaly["evidence"]["inventory"], "new": 0}

    elif anomaly_type == "Credit Breach":
        customer = query_erp("CUSTOMERS", {"$filter": f"CUSTNAME eq '{record_id}'"})
        limit = customer["value"][0]["CREDIT_LIMIT"]
        update_erp_record("CUSTOMERS", record_id, {"BALANCE": limit})
        return {"action": "balance_capped", "old": anomaly["evidence"]["balance"], "new": limit}

    # ... more healing actions

    return {"action": "no_fix_available"}
```

### Safety Considerations

- **Always log before fixing**: Record the original value before overwriting
- **Confirm before delete**: Deleting records is irreversible in many ERP systems
- **Dry-run mode**: Consider implementing a `--dry-run` flag that reports what WOULD be fixed
- **Rate limiting**: Don't overwhelm the shared API with rapid PATCH requests

---

## 🏆 CTF Scoring System

### Points Breakdown

| Activity | Points |
|----------|--------|
| Explorer agent working (Exercise 1) | 10 |
| Each chaos scenario injected (Exercise 2) | 5-15 (by difficulty) |
| Each anomaly detected (Exercise 3/4) | 10 |
| Each anomaly correctly classified (Exercise 3/4) | 5 |
| False positive (incorrect detection) | -5 |
| Undetected anomaly (attacker bonus, Exercise 4) | 15 |
| Self-healing fix applied (Exercise 5) | 10 |
| Creative new anomaly type (not in the list above) | 20 |
| First team to complete an exercise | 5 bonus |

### Leaderboard Categories

- **Best Chaos Agent** — Most undetected anomalies
- **Best Detective Agent** — Highest detection rate with lowest false positives
- **Most Creative** — Most inventive new anomaly type
- **Overall Winner** — Highest total score

---

## 📚 API Quick Reference

### Authentication

All requests require the `X-API-Key` header:

```bash
curl -H "X-API-Key: YOUR_KEY" ${API_ENDPOINT}/api/CUSTOMERS
```

### Endpoints

| Entity | GET (List) | GET (Single) | POST | PATCH | DELETE |
|--------|-----------|-------------|------|-------|--------|
| Customers | `/api/CUSTOMERS` | `/api/CUSTOMERS('C001')` | `/api/CUSTOMERS` | `/api/CUSTOMERS('C001')` | `/api/CUSTOMERS('C001')` |
| Orders | `/api/ORDERS` | `/api/ORDERS('ORD001')` | `/api/ORDERS` | `/api/ORDERS('ORD001')` | `/api/ORDERS('ORD001')` |
| Products | `/api/LOGPART` | `/api/LOGPART('P001')` | `/api/LOGPART` | `/api/LOGPART('P001')` | `/api/LOGPART('P001')` |
| Invoices | `/api/AINVOICES` | `/api/AINVOICES('INV001')` | `/api/AINVOICES` | `/api/AINVOICES('INV001')` | `/api/AINVOICES('INV001')` |
| Suppliers | `/api/SUPPLIERS` | `/api/SUPPLIERS('S001')` | `/api/SUPPLIERS` | `/api/SUPPLIERS('S001')` | `/api/SUPPLIERS('S001')` |
| Work Orders | `/api/WORKORDERS` | `/api/WORKORDERS('WO001')` | `/api/WORKORDERS` | `/api/WORKORDERS('WO001')` | `/api/WORKORDERS('WO001')` |
| BOM | `/api/BOM` | `/api/BOM('BOM001')` | `/api/BOM` | `/api/BOM('BOM001')` | `/api/BOM('BOM001')` |
| Production | `/api/PRODUCTIONPLANS` | `/api/PRODUCTIONPLANS('PP001')` | `/api/PRODUCTIONPLANS` | `/api/PRODUCTIONPLANS('PP001')` | `/api/PRODUCTIONPLANS('PP001')` |
| Employees | `/api/EMPLOYEES` | `/api/EMPLOYEES('EMP001')` | `/api/EMPLOYEES` | `/api/EMPLOYEES('EMP001')` | `/api/EMPLOYEES('EMP001')` |
| Timesheets | `/api/TIMESHEETS` | `/api/TIMESHEETS('TS001')` | `/api/TIMESHEETS` | `/api/TIMESHEETS('TS001')` | `/api/TIMESHEETS('TS001')` |
| Departments | `/api/DEPARTMENTS` | `/api/DEPARTMENTS('D001')` | `/api/DEPARTMENTS` | `/api/DEPARTMENTS('D001')` | `/api/DEPARTMENTS('D001')` |

### Sub-form Access

Access child records through the parent:

```bash
# Get all items for a specific order
GET /api/ORDERS('ORD001')/ORDERITEMS_SUBFORM

# Get invoice items
GET /api/AINVOICES('INV001')/INVOICEITEMS_SUBFORM

# Add an item to an order
POST /api/ORDERS('ORD001')/ORDERITEMS_SUBFORM
```

### Query Parameters (OData-style)

| Parameter | Example | Description |
|-----------|---------|-------------|
| `$filter` | `$filter=ORDSTATUS eq 'O'` | Filter records |
| `$orderby` | `$orderby=CURDATE desc` | Sort results |
| `$top` | `$top=10` | Limit number of results |
| `$skip` | `$skip=20` | Skip N records (pagination) |
| `$select` | `$select=CUSTNAME,BALANCE` | Return only specified fields |
| `$expand` | `$expand=ORDERITEMS_SUBFORM` | Include related sub-form data |

### Filter Operators

```
eq    - Equal:              $filter=ORDSTATUS eq 'O'
ne    - Not equal:          $filter=ORDSTATUS ne 'C'
gt    - Greater than:       $filter=BALANCE gt 10000
lt    - Less than:          $filter=SELLPRICE lt 100
ge    - Greater or equal:   $filter=INVENTORY ge 0
le    - Less or equal:      $filter=CREDIT_LIMIT le 50000
and   - Logical AND:        $filter=ORDSTATUS eq 'O' and CUSTNAME eq 'C001'
or    - Logical OR:         $filter=ORDSTATUS eq 'O' or ORDSTATUS eq 'P'
```

---

## 🧠 Tips for Building Agents with Gemini

### 1. Use Function Calling to Define API Tools

Define your ERP API operations as Gemini function declarations. This lets the model decide when and how to call the API.

### 2. Feed the OpenAPI Spec for Self-Discovery

```python
# Let the agent learn the API structure
import yaml

openapi_spec = requests.get(f"{API_ENDPOINT}/openapi.yaml").text
spec = yaml.safe_load(openapi_spec)

# Include relevant schema info in the system prompt
system_prompt = f"""You are an ERP agent. Here is the API specification:
{json.dumps(spec['paths'], indent=2)}

Available schemas:
{json.dumps(spec['components']['schemas'], indent=2)}
"""
```

### 3. Use Structured Output for Reports

```python
# Force JSON output for the detective report
response = model.generate_content(
    "Analyze the data and produce an anomaly report",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        response_schema={
            "type": "object",
            "properties": {
                "anomalies": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "anomaly_type": {"type": "string"},
                            "severity": {"type": "string", "enum": ["Critical", "Warning", "Info"]},
                            "entity": {"type": "string"},
                            "record_id": {"type": "string"},
                            "description": {"type": "string"},
                            "suggested_fix": {"type": "string"}
                        }
                    }
                }
            }
        }
    )
)
```

### 4. Multi-Step Agent Loop

```python
def run_agent(goal: str, max_steps: int = 20):
    """Run an agent loop: plan -> act -> observe -> repeat."""
    chat = model.start_chat()

    for step in range(max_steps):
        response = chat.send_message(goal if step == 0 else "Continue with the next step.")

        # Check if the model wants to call a function
        part = response.candidates[0].content.parts[0]

        if hasattr(part, 'function_call') and part.function_call:
            # Execute the function
            result = execute_function(part.function_call)

            # Feed result back to the model
            chat.send_message(
                genai.protos.Content(parts=[
                    genai.protos.Part(function_response=genai.protos.FunctionResponse(
                        name=part.function_call.name,
                        response={"result": result}
                    ))
                ])
            )
        else:
            # Model is done or providing analysis
            print(f"Step {step}: {response.text[:200]}")
            if "COMPLETE" in response.text or "report" in response.text.lower():
                return response.text

    return "Max steps reached"
```

### 5. Context Window Management

When dealing with large datasets, be strategic about what you send to the model:

```python
# Don't dump all records at once — summarize first
summary = {}
for entity in ENTITIES:
    data = query_erp(entity, {"$top": 0})  # Just get count
    summary[entity] = data.get("@odata.count", len(data.get("value", [])))

# Then deep-dive into suspicious areas
```

---

## 🚀 Alternative: Using Google ADK (Agent Development Kit)

Instead of building the agent loop manually with `google-generativeai`, you can use **Google ADK** for a more structured approach:

### Setup

```bash
pip install google-adk
```

### ADK Agent Example

```python
"""
ERP Detective Agent using Google ADK
"""
import os
import requests
from google.adk import Agent, Tool

API_ENDPOINT = os.environ.get("ERP_API_ENDPOINT", "http://localhost:3000")
API_KEY = os.environ.get("ERP_API_KEY", "test-key")

# Define tools using ADK's decorator pattern
@Tool
def query_erp(entity: str, filter_expr: str = None, top: int = None,
              orderby: str = None, select: str = None, expand: str = None) -> dict:
    """Query the Priority ERP API. Returns matching records from the specified entity.

    Args:
        entity: Entity name (CUSTOMERS, ORDERS, LOGPART, AINVOICES, SUPPLIERS,
                WORKORDERS, BOM, PRODUCTIONPLANS, EMPLOYEES, TIMESHEETS, DEPARTMENTS)
        filter_expr: OData $filter expression (e.g. "ORDSTATUS eq 'O'")
        top: Max records to return
        orderby: Sort expression (e.g. "CURDATE desc")
        select: Comma-separated field names to return
        expand: Sub-form to expand (e.g. ORDERITEMS_SUBFORM)
    """
    headers = {"X-API-Key": API_KEY}
    params = {}
    if filter_expr: params["$filter"] = filter_expr
    if top: params["$top"] = top
    if orderby: params["$orderby"] = orderby
    if select: params["$select"] = select
    if expand: params["$expand"] = expand

    resp = requests.get(f"{API_ENDPOINT}/api/{entity}", headers=headers, params=params)
    resp.raise_for_status()
    return resp.json()

@Tool
def update_erp(entity: str, record_id: str, data: dict) -> dict:
    """Update an existing ERP record.

    Args:
        entity: Entity name
        record_id: Primary key value
        data: Fields to update
    """
    headers = {"X-API-Key": API_KEY, "Content-Type": "application/json"}
    resp = requests.patch(f"{API_ENDPOINT}/api/{entity}('{record_id}')",
                         headers=headers, json=data)
    resp.raise_for_status()
    return resp.json()

@Tool
def create_erp(entity: str, data: dict) -> dict:
    """Create a new record in the ERP system.

    Args:
        entity: Entity name
        data: Fields for the new record
    """
    headers = {"X-API-Key": API_KEY, "Content-Type": "application/json"}
    resp = requests.post(f"{API_ENDPOINT}/api/{entity}", headers=headers, json=data)
    resp.raise_for_status()
    return resp.json()

@Tool
def delete_erp(entity: str, record_id: str) -> dict:
    """Delete an ERP record.

    Args:
        entity: Entity name
        record_id: Primary key value to delete
    """
    headers = {"X-API-Key": API_KEY}
    resp = requests.delete(f"{API_ENDPOINT}/api/{entity}('{record_id}')", headers=headers)
    resp.raise_for_status()
    return {"deleted": True, "entity": entity, "id": record_id}

# Create the detective agent
detective = Agent(
    model="gemini-2.0-flash",
    name="erp_detective",
    instruction="""You are an ERP data integrity detective. Systematically scan all
    entities in the Priority ERP system to detect anomalies:
    - Cross-reference: Do FK references (CUSTNAME, PARTNAME, EMPNUM) exist?
    - Business rules: Are prices positive and reasonable? BALANCE <= CREDIT_LIMIT?
    - Temporal: Dates in logical order? Nothing in the future?
    - Inventory: INVENTORY >= 0?
    - Duplicates: Same customer + date + amount invoices?
    - Status: Closed orders have items? Work orders past ENDDATE still Active?
    - BOM: Self-referencing components?

    Report each anomaly with type, severity, entity, record_id, and suggested fix.""",
    tools=[query_erp, update_erp, create_erp, delete_erp]
)

# Run it
if __name__ == "__main__":
    result = detective.run("Scan all ERP data and produce a complete anomaly report.")
    print(result)
```

### ADK vs Manual Approach

| Feature | Manual (google-generativeai) | Google ADK |
|---------|------------------------------|------------|
| Agent loop | You write it | Built-in |
| Tool definition | JSON schema dicts | `@Tool` decorator |
| Multi-step reasoning | Manual function call handling | Automatic |
| Structured output | Manual config | Built-in schemas |
| Best for | Learning internals | Production agents |

Both approaches work for this workshop. Choose based on your learning goals.

---

## 📝 Sample Code Snippets

### Complete Working Explorer Agent

```python
"""
ERP Explorer Agent - Workshop Exercise 1
שימוש: python explorer_agent.py
"""
import os
import json
import requests
import google.generativeai as genai

# --- Configuration ---
API_ENDPOINT = os.environ.get("ERP_API_ENDPOINT", "http://localhost:3000")
API_KEY = os.environ.get("ERP_API_KEY", "test-key")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

# --- ERP API Functions ---
def query_erp_api(entity: str, filter_expr: str = None, top: int = None,
                  orderby: str = None, select: str = None, expand: str = None) -> dict:
    """Execute a query against the ERP API."""
    headers = {"X-API-Key": API_KEY}
    params = {}
    if filter_expr:
        params["$filter"] = filter_expr
    if top:
        params["$top"] = top
    if orderby:
        params["$orderby"] = orderby
    if select:
        params["$select"] = select
    if expand:
        params["$expand"] = expand

    url = f"{API_ENDPOINT}/api/{entity}"
    resp = requests.get(url, headers=headers, params=params)
    resp.raise_for_status()
    return resp.json()

def create_erp_record(entity: str, data: dict) -> dict:
    """Create a new record in the ERP system."""
    headers = {"X-API-Key": API_KEY, "Content-Type": "application/json"}
    url = f"{API_ENDPOINT}/api/{entity}"
    resp = requests.post(url, headers=headers, json=data)
    resp.raise_for_status()
    return resp.json()

def update_erp_record(entity: str, record_id: str, data: dict) -> dict:
    """Update an existing ERP record."""
    headers = {"X-API-Key": API_KEY, "Content-Type": "application/json"}
    url = f"{API_ENDPOINT}/api/{entity}('{record_id}')"
    resp = requests.patch(url, headers=headers, json=data)
    resp.raise_for_status()
    return resp.json()

def delete_erp_record(entity: str, record_id: str) -> dict:
    """Delete an ERP record."""
    headers = {"X-API-Key": API_KEY}
    url = f"{API_ENDPOINT}/api/{entity}('{record_id}')"
    resp = requests.delete(url, headers=headers)
    resp.raise_for_status()
    return {"status": "deleted", "entity": entity, "id": record_id}

# --- Function Dispatch ---
FUNCTION_MAP = {
    "query_erp_api": query_erp_api,
    "create_erp_record": create_erp_record,
    "update_erp_record": update_erp_record,
    "delete_erp_record": delete_erp_record,
}

def execute_function_call(function_call):
    """Execute a function call from the model."""
    fn_name = function_call.name
    fn_args = dict(function_call.args)

    if fn_name in FUNCTION_MAP:
        try:
            result = FUNCTION_MAP[fn_name](**fn_args)
            return result
        except Exception as e:
            return {"error": str(e)}
    return {"error": f"Unknown function: {fn_name}"}

# --- Gemini Tool Definitions ---
tools = [
    {
        "function_declarations": [
            {
                "name": "query_erp_api",
                "description": "Query the Priority ERP API. Returns matching records.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "entity": {
                            "type": "string",
                            "description": "Entity name (CUSTOMERS, ORDERS, LOGPART, AINVOICES, SUPPLIERS, WORKORDERS, BOM, PRODUCTIONPLANS, EMPLOYEES, TIMESHEETS, DEPARTMENTS)"
                        },
                        "filter_expr": {
                            "type": "string",
                            "description": "OData $filter expression"
                        },
                        "top": {
                            "type": "integer",
                            "description": "Max records to return"
                        },
                        "orderby": {
                            "type": "string",
                            "description": "Sort expression"
                        },
                        "select": {
                            "type": "string",
                            "description": "Comma-separated field names to return"
                        },
                        "expand": {
                            "type": "string",
                            "description": "Sub-forms to expand (e.g., ORDERITEMS_SUBFORM)"
                        }
                    },
                    "required": ["entity"]
                }
            },
            {
                "name": "create_erp_record",
                "description": "Create a new record in the ERP",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "entity": {"type": "string"},
                        "data": {"type": "object", "description": "Fields for the new record"}
                    },
                    "required": ["entity", "data"]
                }
            },
            {
                "name": "update_erp_record",
                "description": "Update an existing ERP record by ID",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "entity": {"type": "string"},
                        "record_id": {"type": "string"},
                        "data": {"type": "object"}
                    },
                    "required": ["entity", "record_id", "data"]
                }
            },
            {
                "name": "delete_erp_record",
                "description": "Delete an ERP record by ID",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "entity": {"type": "string"},
                        "record_id": {"type": "string"}
                    },
                    "required": ["entity", "record_id"]
                }
            }
        ]
    }
]

# --- Agent Setup ---
model = genai.GenerativeModel(
    "gemini-2.0-flash",
    tools=tools,
    system_instruction="""You are a Priority ERP data analyst and management agent.
    You help users explore, understand, create, update, and manage data in the ERP system.

    Available entities: CUSTOMERS, ORDERS (sub: ORDERITEMS_SUBFORM), LOGPART,
    AINVOICES (sub: INVOICEITEMS_SUBFORM), SUPPLIERS, WORKORDERS, BOM,
    PRODUCTIONPLANS, EMPLOYEES, TIMESHEETS, DEPARTMENTS.

    When answering questions, always query the actual data - never guess.
    Present results clearly with relevant numbers and context."""
)

# --- Main Loop ---
def main():
    chat = model.start_chat()
    print("=" * 60)
    print("  Priority ERP Agent - Exercise 1")
    print("  סוכן לחקירת נתוני ERP")
    print("=" * 60)
    print(f"\n  Connected to: {API_ENDPOINT}")
    print("  Type 'quit' to exit\n")

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ('quit', 'exit', 'q'):
            break
        if not user_input:
            continue

        response = chat.send_message(user_input)

        # Handle function calling loop
        while True:
            part = response.candidates[0].content.parts[0]
            if not hasattr(part, 'function_call') or not part.function_call:
                break

            result = execute_function_call(part.function_call)
            response = chat.send_message(
                genai.protos.Content(parts=[
                    genai.protos.Part(function_response=genai.protos.FunctionResponse(
                        name=part.function_call.name,
                        response={"result": result}
                    ))
                ])
            )

        print(f"\nAgent: {response.text}\n")

if __name__ == "__main__":
    main()
```

---

## Appendix: Entity Field Reference

<!-- שדות עיקריים לכל ישות - לעזרה מהירה -->

### CUSTOMERS
`CUSTNAME` (PK), `CUSTDES` (name), `BALANCE`, `CREDIT_LIMIT`, `PHONE`, `EMAIL`, `ADDRESS`, `CITY`, `STATE`, `COUNTRY`, `STATUS` (A/I)

### ORDERS
`ORDNAME` (PK), `CUSTNAME` (FK), `ORDSTATUS` (O/C/P), `CURDATE`, `QPRICE`, `DETAILS`, sub: `ORDERITEMS_SUBFORM`

### ORDERITEMS_SUBFORM
`LINE` (PK), `PARTNAME` (FK to LOGPART), `TQUANT`, `PRICE`, `DUEDATE`, `KLINE`

### LOGPART (Products/Parts)
`PARTNAME` (PK), `PARTDES`, `BARCODE`, `UNIT`, `SELLPRICE`, `COSTPRICE`, `INVENTORY`, `FAMILY`, `STATUS`

### AINVOICES
`IVNUM` (PK), `CUSTNAME` (FK), `IVDATE`, `TOTAL`, `IVSTATUS` (O/P), `PAYDATE`, sub: `AINVOICEITEMS_SUBFORM`

### BOM (Bill of Materials)
`BOMNAME` (PK), `PARTNAME` (parent part FK), `BOMDES`, `REVISION`, `STATUS`, sub: `BOMITEMS_SUBFORM`
Child items: `LINE`, `CHILDPART` (FK to LOGPART), `TQUANT`, `UNIT`

### EMPLOYEES
`EMPNUM` (PK), `EMPNAME`, `DEPT` (FK to DEPARTMENTS), `POSITION`, `HIREDATE`, `PHONE`, `EMAIL`, `STATUS`

### TIMESHEETS
`TSNUM` (PK), `EMPNUM` (FK), `TSDATE`, `HOURS`, `PROJECT`, `DESCRIPTION`

---

## Good Luck and Have Fun! (בהצלחה!)

Remember: The best agents are the ones that think like humans but act at machine speed. Build smart, detect everything, and may the best agent win!

<!--
Workshop created for AI Agent Development with Google Gemini SDK
Designed for Priority ERP ecosystem professionals
-->

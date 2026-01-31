# מדריך בניית סוכן AI למערכת ERP
## סדנת Google ADK ב-Anti-Gravity IDE

---

## 🎯 מה נבנה היום?

סוכן חכם שיודע:
- לשלוף מידע מהמערכת ("מי הלקוחות שחייבים לנו כסף?")
- להוסיף נתונים ("תוסיף לקוח חדש בשם אבי כהן")
- לזהות בעיות ("יש הזמנות באיחור?")

---

## 📋 לפני שמתחילים

**מה צריך:**
- חשבון Google
- גישה ל-Anti-Gravity IDE
- מפתח ה-API של הסדנה (יינתן בהרצאה)

**פרטי ה-API:**
```
URL: https://app-nameless-dust-4209.fly.dev/api
API Key: workshop-2024-key
תיעוד: https://app-nameless-dust-4209.fly.dev/docs
```

---

## 🚀 שלב 1: פתיחת פרויקט חדש

1. היכנסו ל-Anti-Gravity IDE
2. לחצו **New Project**
3. בחרו **Agent Template**
4. תנו שם: `erp-assistant`

---

## 🔧 שלב 2: הגדרת הכלים (Tools)

הסוכן צריך "ידיים" לעבוד עם ה-API. נגדיר כלים:

### קובץ `tools.py`:

```python
import requests

# הגדרות בסיסיות
API_URL = "https://app-nameless-dust-4209.fly.dev/api"
API_KEY = "workshop-2024-key"

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

# === כלי 1: קבלת רשימת לקוחות ===
def get_customers(filter_status: str = None) -> list:
    """
    מחזיר רשימת לקוחות מהמערכת.
    filter_status: סינון לפי סטטוס (Active/Inactive)
    """
    url = f"{API_URL}/CUSTOMERS"
    if filter_status:
        url += f"?$filter=STATUS eq '{filter_status}'"

    response = requests.get(url, headers=headers)
    return response.json().get("value", [])


# === כלי 2: הוספת לקוח חדש ===
def create_customer(
    customer_id: str,
    name: str,
    phone: str = "",
    email: str = "",
    city: str = ""
) -> dict:
    """
    מוסיף לקוח חדש למערכת.
    customer_id: מזהה ייחודי (לדוגמה: C100)
    name: שם הלקוח
    """
    data = {
        "CUSTNAME": customer_id,
        "CUSTDES": name,
        "PHONE": phone,
        "EMAIL": email,
        "CITY": city,
        "STATUS": "Active",
        "BALANCE": 0,
        "CREDIT_LIMIT": 50000
    }

    response = requests.post(f"{API_URL}/CUSTOMERS",
                            headers=headers, json=data)
    return response.json()


# === כלי 3: קבלת הזמנות פתוחות ===
def get_open_orders() -> list:
    """מחזיר את כל ההזמנות הפתוחות"""
    url = f"{API_URL}/ORDERS?$filter=ORDSTATUS eq 'Open'"
    response = requests.get(url, headers=headers)
    return response.json().get("value", [])


# === כלי 4: חיפוש חשבוניות באיחור ===
def get_overdue_invoices() -> list:
    """מחזיר חשבוניות שלא שולמו בזמן"""
    url = f"{API_URL}/AINVOICES?$filter=IVSTATUS eq 'Overdue'"
    response = requests.get(url, headers=headers)
    return response.json().get("value", [])


# === כלי 5: בדיקת מלאי נמוך ===
def get_low_stock_products(threshold: int = 20) -> list:
    """מחזיר מוצרים עם מלאי מתחת לסף"""
    url = f"{API_URL}/LOGPART"
    response = requests.get(url, headers=headers)
    products = response.json().get("value", [])
    return [p for p in products if p.get("INVENTORY", 0) < threshold]


# === כלי 6: עדכון סטטוס הזמנה ===
def update_order_status(order_id: str, new_status: str) -> dict:
    """
    מעדכן סטטוס של הזמנה.
    new_status: Open / In Progress / Shipped / Delivered
    """
    url = f"{API_URL}/ORDERS/{order_id}"
    response = requests.patch(url, headers=headers,
                             json={"ORDSTATUS": new_status})
    return response.json()


# === כלי 7: קריאת תיעוד ה-API ===
def get_api_documentation() -> str:
    """מחזיר את תיעוד ה-API המלא"""
    response = requests.get(
        "https://app-nameless-dust-4209.fly.dev/openapi.yaml"
    )
    return response.text
```

---

## 🤖 שלב 3: הגדרת הסוכן

### קובץ `agent.py`:

```python
from google.adk import Agent
from tools import (
    get_customers, create_customer, get_open_orders,
    get_overdue_invoices, get_low_stock_products,
    update_order_status, get_api_documentation
)

# הגדרת הסוכן
agent = Agent(
    name="erp_assistant",
    model="gemini-2.0-flash",

    # הכלים שהסוכן יכול להשתמש בהם
    tools=[
        get_customers,
        create_customer,
        get_open_orders,
        get_overdue_invoices,
        get_low_stock_products,
        update_order_status,
        get_api_documentation
    ],

    # הוראות לסוכן
    system_prompt="""
    אתה עוזר חכם למערכת ERP תעשייתית.

    התפקיד שלך:
    - לענות על שאלות על לקוחות, הזמנות, מלאי וחשבוניות
    - להוסיף ולעדכן נתונים כשמבקשים ממך
    - להתריע על בעיות (חובות, מלאי נמוך, איחורים)

    כללים:
    - ענה תמיד בעברית
    - אם לא בטוח, שאל שאלות הבהרה
    - לפני יצירת נתון חדש, ודא שקיבלת את כל הפרטים הנדרשים
    - הצג מספרים בפורמט קריא (עם פסיקים)
    """
)
```

---

## 💬 שלב 4: דוגמאות לשיחה

### הפעלת הסוכן:

```python
# שיחה עם הסוכן
response = agent.chat("מי הלקוחות הגדולים שלנו?")
print(response)
```

### דוגמאות לשאלות שתוכלו לשאול:

**שאילתות מידע:**
```
"הראה לי את כל הלקוחות הפעילים"
"כמה הזמנות פתוחות יש לנו?"
"מי חייב לנו כסף? תראה חשבוניות באיחור"
"אילו מוצרים במלאי נמוך?"
"מה הסטטוס של הזמנה ORD016?"
```

**יצירת נתונים:**
```
"תוסיף לקוח חדש: חברת אלפא בע"מ, טלפון 03-1234567"
"תפתח הזמנה חדשה ללקוח C001"
```

**עדכון נתונים:**
```
"תעדכן את הזמנה ORD016 לסטטוס 'In Progress'"
"תשנה את מספר הטלפון של לקוח C005"
```

**שאלות מורכבות:**
```
"תן לי סיכום של המצב הפיננסי - כמה חייבים לנו?"
"יש בעיות בייצור? תבדוק הזמנות עבודה באיחור"
"מה הלקוח הכי רווחי שלנו?"
```

---

## 🎨 שלב 5: עטיפה בממשק משתמש

### קובץ `app.py` (ממשק פשוט):

```python
import streamlit as st
from agent import agent

st.title("🏭 עוזר ERP חכם")
st.caption("שאל אותי כל שאלה על המערכת")

# היסטוריית שיחה
if "messages" not in st.session_state:
    st.session_state.messages = []

# הצגת היסטוריה
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

# קלט מהמשתמש
if prompt := st.chat_input("מה תרצה לדעת?"):
    # הצגת השאלה
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.write(prompt)

    # קבלת תשובה מהסוכן
    with st.chat_message("assistant"):
        with st.spinner("חושב..."):
            response = agent.chat(prompt)
            st.write(response)

    st.session_state.messages.append({"role": "assistant", "content": response})
```

### הרצה:
```bash
streamlit run app.py
```

---

## 🔥 טיפים חשובים

### 1. הסוכן לומד מהתיעוד
אם הסוכן לא יודע לעשות משהו, אפשר לבקש ממנו:
```
"תקרא את תיעוד ה-API ותגיד לי איך לעשות X"
```

### 2. היו ספציפיים
❌ "תראה לי דברים"
✅ "תראה לי את 5 ההזמנות האחרונות"

### 3. הסוכן יכול לשרשר פעולות
```
"תמצא את כל הלקוחות עם חוב מעל 50,000 ותשלח לי סיכום"
```

### 4. אל תפחדו לשאול
הסוכן יודע להגיד "אני לא בטוח" ולבקש הבהרות.

---

## 📊 ישויות במערכת

| ישות | שם ב-API | מה זה? |
|------|----------|--------|
| לקוחות | CUSTOMERS | פרטי לקוחות ויתרות |
| הזמנות | ORDERS | הזמנות מכירה |
| מוצרים | LOGPART | קטלוג מוצרים ומלאי |
| חשבוניות | AINVOICES | חשבוניות ומצב תשלום |
| הזמנות עבודה | WORKORDERS | פקודות ייצור |
| עובדים | EMPLOYEES | רשימת עובדים |
| ספקים | SUPPLIERS | רשימת ספקים |

---

## ❓ שאלות נפוצות

**ש: מה קורה אם הסוכן טועה?**
ת: הנתונים במערכת הדמו מתאפסים כל כמה שעות. אל דאגה!

**ש: אפשר לחבר את זה למערכת ERP אמיתית?**
ת: כן! צריך רק להחליף את ה-API URL והמפתח.

**ש: הסוכן לא מבין אותי**
ת: נסו לנסח אחרת, או תנו יותר הקשר לשאלה.

---

## 🎓 תרגיל סיום

נסו לבנות סוכן שעונה על השאלה:

> "תן לי דו"ח בוקר: כמה הזמנות פתוחות, האם יש חשבוניות באיחור, ואילו מוצרים צריך להזמין"

בהצלחה! 🚀

# בניית סוכן AI למערכת ERP
## סדנת Google ADK ב-Anti-Gravity IDE

---

## מה נבנה היום?

סוכן חכם שמדבר עם מערכת ERP ויודע:
- לשלוף מידע ("מי הלקוחות שחייבים לנו כסף?")
- להוסיף נתונים ("תוסיף לקוח חדש בשם אבי כהן")
- לזהות בעיות ("יש הזמנות באיחור?")

**הכל בלי לכתוב קוד!** פשוט מדברים עם Anti-Gravity והוא בונה את הסוכן בשבילנו.

---

## לפני שמתחילים - מה צריך להכין

### 1. חשבון Google
צריך חשבון Google רגיל (Gmail)

### 2. Python 3.10 ומעלה
ADK דורש Python 3.10 או גרסה חדשה יותר. לבדיקה:
```bash
python3 --version
```

### 2.1 התקנת ADK (אם לא משתמשים ב-Anti-Gravity)
```bash
pip install google-adk
```

### 3. מפתח Gemini API (חשוב!)

השתמשו במפתח ה-API שיצרתם בשיחת ההכנה לסדנה.

> **תזכורת:** המפתח נראה כמו `AIzaSy...` ונמצא ב-[Google AI Studio](https://aistudio.google.com/) תחת **Get API Key**.

> **חשוב:** בלי המפתח הזה הסוכן לא יוכל לענות לשאלות!

### 4. פרטי מערכת ה-ERP לסדנה
```
כתובת API: https://priority-erp-mock.fly.dev/api
מפתח API: priority-adk-workshop-2026
תיעוד (OpenAPI): https://priority-erp-mock.fly.dev/openapi.yaml
```

---

## שלב 1: פתיחת פרויקט חדש

1. היכנסו ל-Anti-Gravity IDE
2. לחצו **New Project**
3. בחרו **ADK Agent** (או Agent Template)
4. תנו שם: `erp-assistant`

---

## שלב 2: הגדרת מפתח ה-API

### פרומפט 1 - יצירת קובץ הגדרות

כתבו בצ'אט של Anti-Gravity:

> Create a .env file with these settings:
> ```
> GOOGLE_API_KEY=MY_API_KEY_HERE
> GOOGLE_GENAI_USE_VERTEXAI=FALSE
> ```

**החליפו** את `MY_API_KEY_HERE` במפתח שקיבלתם מ-Google AI Studio!

---

## שלב 3: בניית הכלים לסוכן

הסוכן צריך "כלים" כדי לדבר עם מערכת ה-ERP.

### פרומפט 2 - כלי לקריאת לקוחות

> Create a tools.py file with a function that connects to an ERP API.
>
> Connection details:
> - URL: https://priority-erp-mock.fly.dev/api
> - API Key: priority-adk-workshop-2026 (in header X-API-Key)
>
> First function: get_customers - returns list of customers from /CUSTOMERS endpoint

---

### פרומפט 3 - הוספת עוד כלים

> Add these functions to tools.py:
>
> Read operations:
> 1. get_open_orders - returns open orders from /ORDERS with filter ORDSTATUS eq 'Open'
> 2. get_overdue_invoices - returns overdue invoices from /AINVOICES with filter IVSTATUS eq 'Overdue'
> 3. get_low_stock_products - returns products with low inventory from /LOGPART
>
> Create and update operations:
> 4. create_customer - creates new customer at /CUSTOMERS with POST
> 5. update_customer - updates existing customer with PATCH (phone, email, status)
> 6. update_order_status - updates order status with PATCH
>
> Use `Optional[str]` from typing for optional parameters

---

### פרומפט 4 - כלי לקריאת התיעוד (חשוב!)

זה הכלי שמאפשר לסוכן ללמוד לבד:

> Add a function get_api_documentation that returns the API documentation.
>
> It should fetch the OpenAPI spec from:
> https://priority-erp-mock.fly.dev/openapi.yaml
>
> This allows the agent to read the docs and learn how to use the API

---

## שלב 4: יצירת הסוכן

### פרומפט 5 - קובץ אתחול (חשוב!)

> Create an empty __init__.py file in the project folder

זה קובץ טכני ש-ADK צריך כדי לזהות את הפרויקט כסוכן.

### פרומפט 6 - הגדרת הסוכן

> Create agent.py with an ADK agent.
>
> Use LlmAgent from google.adk.agents with:
> - model: gemini-3-flash-preview
> - name: erp_assistant
> - tools from tools.py (use relative import: `from .tools import ...`)
>
> Agent instructions (in Hebrew):
> - You are a helper for an industrial ERP system
> - Always respond in Hebrew
> - Help with customers, orders, inventory and invoices
> - Alert about problems like debts and low stock

---

## שלב 5: הרצת הסוכן

### פרומפט 7 - הרצה

> How do I run the agent?

**פקודות הרצה:**

| פקודה | מה זה עושה |
|-------|------------|
| `adk web .` | פותח ממשק גרפי בדפדפן (מומלץ!) |
| `adk run .` | הרצה בשורת פקודה |

> **שימו לב:** הנקודה (`.`) אומרת "הפרויקט הנוכחי"

**הממשק הגרפי** נפתח בכתובת: http://localhost:8000

### איך להשתמש בממשק:
1. פתחו את הדפדפן בכתובת http://localhost:8000
2. בצד שמאל למעלה, בחרו את הסוכן `erp-assistant` מהרשימה הנפתחת
3. כתבו שאלה בתיבת הטקסט למטה ולחצו Enter
4. הסוכן יענה ותוכלו לראות את הכלים שהוא משתמש בהם

---

## שלב 6: בדיקות

ברגע שהסוכן רץ, נסו לשאול אותו:

| מה לשאול | מה אמור לקרות |
|----------|---------------|
| "מי הלקוחות שלנו?" | מציג רשימת לקוחות |
| "יש חשבוניות באיחור?" | מציג חשבוניות לא משולמות |
| "אילו מוצרים במלאי נמוך?" | מציג מוצרים עם מלאי נמוך |
| "כמה הזמנות פתוחות יש?" | סופר ומציג הזמנות פתוחות |

---

## שלב 7: בניית ממשק React לסוכן

עכשיו נבנה אפליקציית React שמתחברת לסוכן - ככה תוכלו לשלב את הסוכן באפליקציה שלכם!

### פרומפט 8 - יצירת פרויקט React

> Create a frontend folder with a React project using Vite.
>
> The project needs:
> - package.json with react, react-dom and vite
> - vite.config.js with proxy to localhost:8000 (ADK server)
> - index.html with Hebrew support (RTL, lang="he")

### פרומפט 9 - קומפוננטת צ'אט

> Create App.jsx with a chat interface for the ADK agent.
>
> The interface needs:
> - Create session at /apps/erp-assistant/users/{user}/sessions
> - Send messages via POST to /run_sse with SSE streaming
> - Display user and agent messages in chat style
> - Typing indicator when agent is thinking
> - "New chat" button
> - Hebrew UI (RTL) - title "עוזר ERP חכם", button "שלח", placeholder "הקלד הודעה..."

### פרומפט 10 - עיצוב CSS

> Create styles.css with modern chat styling.
>
> The design needs:
> - Beautiful gradient background
> - Rounded message bubbles
> - User messages on right, agent on left
> - Typing animation when agent thinks
> - RTL support for Hebrew

### הרצה

```bash
cd frontend
npm install
npm run dev
```

הממשק יפתח בכתובת: http://localhost:3000

> **שימו לב:** שרת ADK חייב לרוץ על פורט 8000 כדי שהממשק יעבוד!

### לא עובד? פרומפט להורדת ממשק מוכן

אם יש בעיות עם יצירת הממשק, השתמשו בפרומפט הזה:

> Download the ready-made React frontend from:
> https://github.com/idan82labs/priority-erp-mock/tree/main/adk-frontend
>
> Put the files in a frontend folder in my project.
> Then run npm install and npm run dev.

הממשק המוכן זהה לזה שבניתם - פשוט עובד מהקופסה!

---

## איך הממשק מתחבר לסוכן?

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│   ADK Server    │────▶│   Gemini API    │
│   (port 3000)   │◀────│   (port 8000)   │◀────│                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │ POST /run_sse         │ Tools (get_customers, etc.)
        │ (SSE stream)          │
        ▼                       ▼
   הצגת תשובה              מערכת ERP API
```

### נקודות קצה חשובות של ADK:

| Endpoint | Method | תיאור |
|----------|--------|-------|
| `/apps/{app}/users/{user}/sessions` | POST | יצירת session חדש |
| `/run_sse` | POST | שליחת הודעה וקבלת תשובה (SSE) |
| `/list-apps` | GET | רשימת סוכנים זמינים |

---

## דוגמאות לשאלות לסוכן

### שאילתות מידע (READ)
- "הראה לי את כל הלקוחות הפעילים"
- "כמה הזמנות פתוחות יש לנו?"
- "מי חייב לנו כסף?"
- "מה הסטטוס של הזמנה ORD016?"

### יצירת נתונים (CREATE)
- "תוסיף לקוח חדש: חברת אלפא בע״מ, טלפון 03-1234567"

### עדכון נתונים (UPDATE)
- "עדכן את הסטטוס של הזמנה ORD016 ל-In Progress"
- "עדכן את הטלפון של לקוח C001 ל-03-1111111"
- "שנה את הסטטוס של לקוח C016 ללא פעיל"

### ניתוח AI (שילוב מקורות מידע)
- "תן לי ניתוח עסקי: מי הלקוחות עם הסיכון הגבוה ביותר?"
- "שלב נתונים מחשבוניות באיחור, יתרות חובה, והזמנות פתוחות"
- "תן לי סיכום של המצב הפיננסי עם המלצות"
- "מה הלקוח עם היתרה הכי גבוהה?"

---

## פתרון בעיות נפוצות

### "שגיאת API Key" או "Unauthorized"

> I have an API Key error. Check that .env file exists with GOOGLE_API_KEY

ודאו שהמפתח מ-Google AI Studio מועתק נכון בקובץ `.env`

### הסוכן לא מתחבר ל-ERP

> The agent can't connect to the ERP API. Check the code in tools.py

### הסוכן לא עונה בעברית

> Update the agent instructions to always respond in Hebrew

### רוצה להוסיף יכולת חדשה

> Add a tool to update order status via PATCH to /ORDERS

---

## טיפ מתקדם: הסוכן שלומד לבד

אם הסוכן לא יודע לעשות משהו, בקשו ממנו לקרוא את התיעוד:

> "תקרא את תיעוד ה-API ותגיד לי איך לעשות X"

הסוכן ישתמש בכלי get_api_documentation וילמד לבד!

---

## הישויות במערכת

| מה זה בעברית | שם ב-API | לדוגמה |
|--------------|----------|--------|
| לקוחות | CUSTOMERS | שם, טלפון, יתרה |
| הזמנות | ORDERS | מספר הזמנה, סטטוס, סכום |
| מוצרים | LOGPART | שם מוצר, מחיר, מלאי |
| חשבוניות | AINVOICES | מספר חשבונית, סכום, סטטוס |
| הזמנות עבודה | WORKORDERS | פקודות ייצור |
| עובדים | EMPLOYEES | שם, מחלקה, תפקיד |
| ספקים | SUPPLIERS | פרטי ספקים |

---

## תרגיל סיום

בקשו מהסוכן:

> "תן לי דו״ח בוקר: כמה הזמנות פתוחות, האם יש חשבוניות באיחור, ואילו מוצרים צריך להזמין"

אם הסוכן עונה בצורה מסודרת עם כל המידע - הצלחתם!

---

## סיכום - מה עשינו?

1. ✅ השגנו מפתח Gemini מ-Google AI Studio
2. ✅ יצרנו פרויקט ADK חדש
3. ✅ הגדרנו את המפתח בקובץ .env
4. ✅ בנינו כלים לתקשורת עם ה-ERP
5. ✅ יצרנו סוכן חכם שמשתמש בכלים
6. ✅ הרצנו ובדקנו עם adk web
7. ✅ בנינו ממשק React משלנו שמתחבר לסוכן

---

## קישורים שימושיים

- [Google AI Studio](https://aistudio.google.com/) - להשגת מפתח Gemini
- [תיעוד ADK](https://google.github.io/adk-docs/) - מדריכים מתקדמים
- [תיעוד ה-API לסדנה](https://priority-erp-mock.fly.dev/openapi.yaml) - OpenAPI spec
- [ממשק ה-ERP](https://priority-erp-mock.fly.dev/) - ממשק גרפי למערכת

---

בהצלחה!

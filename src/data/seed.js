// Realistic mock data for Priority ERP Workshop
// Mix of Hebrew and English company names (Priority is Israeli ERP)
// Expanded dataset for interactive demo with 30 participants

const customers = [
  { CUSTNAME: 'C001', CUSTDES: 'תעשיות אלון בע"מ', PHONE: '03-5551234', EMAIL: 'info@alon-ind.co.il', ADDRESS: 'רחוב התעשייה 15', CITY: 'פתח תקווה', STATE: '', COUNTRY: 'Israel', BALANCE: 45000, CREDIT_LIMIT: 100000, STATUS: 'Active' },
  { CUSTNAME: 'C002', CUSTDES: 'Global Tech Solutions', PHONE: '09-7772345', EMAIL: 'sales@globaltech.com', ADDRESS: '23 Innovation Blvd', CITY: 'Herzliya', STATE: '', COUNTRY: 'Israel', BALANCE: 120000, CREDIT_LIMIT: 250000, STATUS: 'Active' },
  { CUSTNAME: 'C003', CUSTDES: 'מפעלי ברזל הצפון', PHONE: '04-8883456', EMAIL: 'orders@barzel-north.co.il', ADDRESS: 'אזור תעשייה 7', CITY: 'חיפה', STATE: '', COUNTRY: 'Israel', BALANCE: 67000, CREDIT_LIMIT: 150000, STATUS: 'Active' },
  { CUSTNAME: 'C004', CUSTDES: 'Precision Motors Ltd', PHONE: '08-6554567', EMAIL: 'info@precisionmotors.com', ADDRESS: '45 Industrial Park', CITY: 'Beer Sheva', STATE: '', COUNTRY: 'Israel', BALANCE: 23000, CREDIT_LIMIT: 80000, STATUS: 'Active' },
  { CUSTNAME: 'C005', CUSTDES: 'חשמל ואלקטרוניקה דרום', PHONE: '08-9995678', EMAIL: 'contact@elec-south.co.il', ADDRESS: 'שדרות הנגב 88', CITY: 'אשדוד', STATE: '', COUNTRY: 'Israel', BALANCE: 89000, CREDIT_LIMIT: 200000, STATUS: 'Active' },
  { CUSTNAME: 'C006', CUSTDES: 'AutoParts International', PHONE: '03-5126789', EMAIL: 'orders@autoparts-intl.com', ADDRESS: '12 Commerce St', CITY: 'Tel Aviv', STATE: '', COUNTRY: 'Israel', BALANCE: 156000, CREDIT_LIMIT: 300000, STATUS: 'Active' },
  { CUSTNAME: 'C007', CUSTDES: 'מערכות הנדסה מתקדמות', PHONE: '09-7437890', EMAIL: 'eng@advanced-sys.co.il', ADDRESS: 'רחוב המדע 3', CITY: 'רעננה', STATE: '', COUNTRY: 'Israel', BALANCE: 34000, CREDIT_LIMIT: 120000, STATUS: 'Active' },
  { CUSTNAME: 'C008', CUSTDES: 'Delta Manufacturing', PHONE: '04-6248901', EMAIL: 'info@deltamfg.com', ADDRESS: '67 Factory Rd', CITY: 'Nazareth Illit', STATE: '', COUNTRY: 'Israel', BALANCE: 78000, CREDIT_LIMIT: 180000, STATUS: 'Active' },
  { CUSTNAME: 'C009', CUSTDES: 'פלסטיק ואריזות המרכז', PHONE: '03-9359012', EMAIL: 'sales@plastic-center.co.il', ADDRESS: 'אזור תעשייה קיסריה', CITY: 'קיסריה', STATE: '', COUNTRY: 'Israel', BALANCE: 45000, CREDIT_LIMIT: 90000, STATUS: 'Active' },
  { CUSTNAME: 'C010', CUSTDES: 'NovaTech Systems', PHONE: '09-8760123', EMAIL: 'contact@novatech.co.il', ADDRESS: '8 High-Tech Park', CITY: 'Kfar Saba', STATE: '', COUNTRY: 'Israel', BALANCE: 210000, CREDIT_LIMIT: 400000, STATUS: 'Active' },
  { CUSTNAME: 'C011', CUSTDES: 'תעשיות מזון הגליל', PHONE: '04-9871234', EMAIL: 'info@galil-food.co.il', ADDRESS: 'רחוב התעשייה 22', CITY: 'כרמיאל', STATE: '', COUNTRY: 'Israel', BALANCE: 56000, CREDIT_LIMIT: 130000, STATUS: 'Active' },
  { CUSTNAME: 'C012', CUSTDES: 'SteelWorks Industries', PHONE: '03-5182345', EMAIL: 'orders@steelworks.com', ADDRESS: '90 Metal Ave', CITY: 'Rishon LeZion', STATE: '', COUNTRY: 'Israel', BALANCE: 134000, CREDIT_LIMIT: 280000, STATUS: 'Active' },
  { CUSTNAME: 'C013', CUSTDES: 'אופטיקה ולייזר בע"מ', PHONE: '08-6293456', EMAIL: 'sales@optics-laser.co.il', ADDRESS: 'פארק המדע 11', CITY: 'רחובות', STATE: '', COUNTRY: 'Israel', BALANCE: 92000, CREDIT_LIMIT: 200000, STATUS: 'Active' },
  { CUSTNAME: 'C014', CUSTDES: 'HydroFlow Solutions', PHONE: '04-8304567', EMAIL: 'info@hydroflow.com', ADDRESS: '5 Water Tech Blvd', CITY: 'Haifa', STATE: '', COUNTRY: 'Israel', BALANCE: 67000, CREDIT_LIMIT: 150000, STATUS: 'Active' },
  { CUSTNAME: 'C015', CUSTDES: 'רכיבים אלקטרוניים ש.מ', PHONE: '03-5415678', EMAIL: 'parts@elec-components.co.il', ADDRESS: 'רחוב סוקולוב 45', CITY: 'הרצליה', STATE: '', COUNTRY: 'Israel', BALANCE: 28000, CREDIT_LIMIT: 75000, STATUS: 'Active' },
  { CUSTNAME: 'C016', CUSTDES: 'EnergyTech Green', PHONE: '08-9526789', EMAIL: 'info@energytech.co.il', ADDRESS: '18 Solar Park', CITY: 'Arad', STATE: '', COUNTRY: 'Israel', BALANCE: 45000, CREDIT_LIMIT: 100000, STATUS: 'Inactive' },
  { CUSTNAME: 'C017', CUSTDES: 'מכשירי מדידה מדויקים', PHONE: '09-7637890', EMAIL: 'sales@precise-measure.co.il', ADDRESS: 'אזור תעשייה 33', CITY: 'נתניה', STATE: '', COUNTRY: 'Israel', BALANCE: 0, CREDIT_LIMIT: 50000, STATUS: 'Active' },
  { CUSTNAME: 'C018', CUSTDES: 'CompAir Systems', PHONE: '03-5748901', EMAIL: 'orders@compair.com', ADDRESS: '27 Pneumatics Way', CITY: 'Holon', STATE: '', COUNTRY: 'Israel', BALANCE: 88000, CREDIT_LIMIT: 190000, STATUS: 'Active' },
  { CUSTNAME: 'C019', CUSTDES: 'מפעלי נייר וקרטון', PHONE: '04-6321234', EMAIL: 'orders@paper-carton.co.il', ADDRESS: 'אזור תעשייה עמק חפר', CITY: 'עמק חפר', STATE: '', COUNTRY: 'Israel', BALANCE: 72000, CREDIT_LIMIT: 160000, STATUS: 'Active' },
  { CUSTNAME: 'C020', CUSTDES: 'SmartBuild Construction', PHONE: '03-5439876', EMAIL: 'procurement@smartbuild.co.il', ADDRESS: '55 Builder St', CITY: 'Petah Tikva', STATE: '', COUNTRY: 'Israel', BALANCE: 195000, CREDIT_LIMIT: 350000, STATUS: 'Active' },
  { CUSTNAME: 'C021', CUSTDES: 'תעשיות רפואיות אדל', PHONE: '09-7654321', EMAIL: 'supply@adel-med.co.il', ADDRESS: 'פארק התעשייה אפק', CITY: 'ראש העין', STATE: '', COUNTRY: 'Israel', BALANCE: 115000, CREDIT_LIMIT: 250000, STATUS: 'Active' },
  { CUSTNAME: 'C022', CUSTDES: 'Agro-Tech Innovations', PHONE: '08-8527413', EMAIL: 'orders@agrotech.co.il', ADDRESS: '12 Kibbutz Tech Zone', CITY: 'Kiryat Gat', STATE: '', COUNTRY: 'Israel', BALANCE: 48000, CREDIT_LIMIT: 120000, STATUS: 'Active' },
];

const products = [
  { PARTNAME: 'MOT-001', PARTDES: 'מנוע חשמלי 3HP', BARCODE: '7290001000011', UNIT: 'EA', SELLPRICE: 2500, COSTPRICE: 1800, INVENTORY: 45, FAMILY: 'MOTORS', STATUS: 'Active' },
  { PARTNAME: 'MOT-002', PARTDES: 'Servo Motor 500W', BARCODE: '7290001000028', UNIT: 'EA', SELLPRICE: 3200, COSTPRICE: 2400, INVENTORY: 28, FAMILY: 'MOTORS', STATUS: 'Active' },
  { PARTNAME: 'MOT-003', PARTDES: 'מנוע צעד NEMA 23', BARCODE: '7290001000035', UNIT: 'EA', SELLPRICE: 450, COSTPRICE: 320, INVENTORY: 120, FAMILY: 'MOTORS', STATUS: 'Active' },
  { PARTNAME: 'MOT-004', PARTDES: 'DC Motor 24V 100W', BARCODE: '7290001000400', UNIT: 'EA', SELLPRICE: 680, COSTPRICE: 480, INVENTORY: 85, FAMILY: 'MOTORS', STATUS: 'Active' },
  { PARTNAME: 'MOT-005', PARTDES: 'Brushless Motor 1KW', BARCODE: '7290001000401', UNIT: 'EA', SELLPRICE: 1850, COSTPRICE: 1350, INVENTORY: 32, FAMILY: 'MOTORS', STATUS: 'Active' },
  { PARTNAME: 'SEN-001', PARTDES: 'חיישן טמפרטורה PT100', BARCODE: '7290001000042', UNIT: 'EA', SELLPRICE: 180, COSTPRICE: 95, INVENTORY: 200, FAMILY: 'SENSORS', STATUS: 'Active' },
  { PARTNAME: 'SEN-002', PARTDES: 'Proximity Sensor Inductive', BARCODE: '7290001000059', UNIT: 'EA', SELLPRICE: 320, COSTPRICE: 210, INVENTORY: 85, FAMILY: 'SENSORS', STATUS: 'Active' },
  { PARTNAME: 'SEN-003', PARTDES: 'חיישן לחץ 0-10 bar', BARCODE: '7290001000066', UNIT: 'EA', SELLPRICE: 550, COSTPRICE: 380, INVENTORY: 60, FAMILY: 'SENSORS', STATUS: 'Active' },
  { PARTNAME: 'SEN-004', PARTDES: 'Flow Meter DN25', BARCODE: '7290001000073', UNIT: 'EA', SELLPRICE: 1200, COSTPRICE: 850, INVENTORY: 30, FAMILY: 'SENSORS', STATUS: 'Active' },
  { PARTNAME: 'SEN-005', PARTDES: 'Ultrasonic Level Sensor', BARCODE: '7290001000402', UNIT: 'EA', SELLPRICE: 890, COSTPRICE: 620, INVENTORY: 42, FAMILY: 'SENSORS', STATUS: 'Active' },
  { PARTNAME: 'SEN-006', PARTDES: 'חיישן אופטי Photoelectric', BARCODE: '7290001000403', UNIT: 'EA', SELLPRICE: 420, COSTPRICE: 280, INVENTORY: 95, FAMILY: 'SENSORS', STATUS: 'Active' },
  { PARTNAME: 'SEN-007', PARTDES: 'Encoder Incremental 1000PPR', BARCODE: '7290001000404', UNIT: 'EA', SELLPRICE: 750, COSTPRICE: 520, INVENTORY: 38, FAMILY: 'SENSORS', STATUS: 'Active' },
  { PARTNAME: 'VLV-001', PARTDES: 'שסתום כדורי 2 אינץ', BARCODE: '7290001000080', UNIT: 'EA', SELLPRICE: 380, COSTPRICE: 250, INVENTORY: 75, FAMILY: 'VALVES', STATUS: 'Active' },
  { PARTNAME: 'VLV-002', PARTDES: 'Solenoid Valve 24V', BARCODE: '7290001000097', UNIT: 'EA', SELLPRICE: 290, COSTPRICE: 190, INVENTORY: 110, FAMILY: 'VALVES', STATUS: 'Active' },
  { PARTNAME: 'VLV-003', PARTDES: 'שסתום בקרה פנאומטי', BARCODE: '7290001000103', UNIT: 'EA', SELLPRICE: 1800, COSTPRICE: 1300, INVENTORY: 20, FAMILY: 'VALVES', STATUS: 'Active' },
  { PARTNAME: 'VLV-004', PARTDES: 'Check Valve SS 1"', BARCODE: '7290001000405', UNIT: 'EA', SELLPRICE: 240, COSTPRICE: 160, INVENTORY: 88, FAMILY: 'VALVES', STATUS: 'Active' },
  { PARTNAME: 'VLV-005', PARTDES: 'Butterfly Valve DN100', BARCODE: '7290001000406', UNIT: 'EA', SELLPRICE: 920, COSTPRICE: 650, INVENTORY: 25, FAMILY: 'VALVES', STATUS: 'Active' },
  { PARTNAME: 'PMP-001', PARTDES: 'משאבה צנטריפוגלית 5HP', BARCODE: '7290001000110', UNIT: 'EA', SELLPRICE: 4500, COSTPRICE: 3200, INVENTORY: 12, FAMILY: 'PUMPS', STATUS: 'Active' },
  { PARTNAME: 'PMP-002', PARTDES: 'Dosing Pump Digital', BARCODE: '7290001000127', UNIT: 'EA', SELLPRICE: 2800, COSTPRICE: 2000, INVENTORY: 18, FAMILY: 'PUMPS', STATUS: 'Active' },
  { PARTNAME: 'PMP-003', PARTDES: 'Gear Pump 10 LPM', BARCODE: '7290001000407', UNIT: 'EA', SELLPRICE: 1650, COSTPRICE: 1180, INVENTORY: 22, FAMILY: 'PUMPS', STATUS: 'Active' },
  { PARTNAME: 'PLC-001', PARTDES: 'בקר PLC 16 כניסות', BARCODE: '7290001000134', UNIT: 'EA', SELLPRICE: 3500, COSTPRICE: 2600, INVENTORY: 25, FAMILY: 'CONTROLS', STATUS: 'Active' },
  { PARTNAME: 'PLC-002', PARTDES: 'HMI Touch Panel 7"', BARCODE: '7290001000141', UNIT: 'EA', SELLPRICE: 2200, COSTPRICE: 1600, INVENTORY: 35, FAMILY: 'CONTROLS', STATUS: 'Active' },
  { PARTNAME: 'PLC-003', PARTDES: 'מודול I/O מרוחק', BARCODE: '7290001000158', UNIT: 'EA', SELLPRICE: 950, COSTPRICE: 680, INVENTORY: 50, FAMILY: 'CONTROLS', STATUS: 'Active' },
  { PARTNAME: 'PLC-004', PARTDES: 'HMI Touch Panel 10"', BARCODE: '7290001000408', UNIT: 'EA', SELLPRICE: 3100, COSTPRICE: 2250, INVENTORY: 18, FAMILY: 'CONTROLS', STATUS: 'Active' },
  { PARTNAME: 'PLC-005', PARTDES: 'Analog Input Module 8CH', BARCODE: '7290001000409', UNIT: 'EA', SELLPRICE: 1200, COSTPRICE: 850, INVENTORY: 28, FAMILY: 'CONTROLS', STATUS: 'Active' },
  { PARTNAME: 'CYL-001', PARTDES: 'צילינדר פנאומטי 100mm', BARCODE: '7290001000165', UNIT: 'EA', SELLPRICE: 420, COSTPRICE: 290, INVENTORY: 90, FAMILY: 'PNEUMATICS', STATUS: 'Active' },
  { PARTNAME: 'CYL-002', PARTDES: 'Hydraulic Cylinder 200mm', BARCODE: '7290001000172', UNIT: 'EA', SELLPRICE: 1600, COSTPRICE: 1150, INVENTORY: 15, FAMILY: 'PNEUMATICS', STATUS: 'Active' },
  { PARTNAME: 'CYL-003', PARTDES: 'Compact Cylinder 50mm', BARCODE: '7290001000410', UNIT: 'EA', SELLPRICE: 280, COSTPRICE: 185, INVENTORY: 125, FAMILY: 'PNEUMATICS', STATUS: 'Active' },
  { PARTNAME: 'CYL-004', PARTDES: 'Rotary Actuator 180°', BARCODE: '7290001000411', UNIT: 'EA', SELLPRICE: 780, COSTPRICE: 550, INVENTORY: 35, FAMILY: 'PNEUMATICS', STATUS: 'Active' },
  { PARTNAME: 'BRG-001', PARTDES: 'מיסב כדורי 6205', BARCODE: '7290001000189', UNIT: 'EA', SELLPRICE: 85, COSTPRICE: 45, INVENTORY: 300, FAMILY: 'BEARINGS', STATUS: 'Active' },
  { PARTNAME: 'BRG-002', PARTDES: 'Roller Bearing 30x55', BARCODE: '7290001000196', UNIT: 'EA', SELLPRICE: 150, COSTPRICE: 90, INVENTORY: 180, FAMILY: 'BEARINGS', STATUS: 'Active' },
  { PARTNAME: 'BRG-003', PARTDES: 'Linear Bearing LM20UU', BARCODE: '7290001000412', UNIT: 'EA', SELLPRICE: 65, COSTPRICE: 38, INVENTORY: 220, FAMILY: 'BEARINGS', STATUS: 'Active' },
  { PARTNAME: 'GER-001', PARTDES: 'גלגל שיניים מודול 2', BARCODE: '7290001000202', UNIT: 'EA', SELLPRICE: 220, COSTPRICE: 140, INVENTORY: 65, FAMILY: 'GEARS', STATUS: 'Active' },
  { PARTNAME: 'GER-002', PARTDES: 'Timing Belt HTD5M', BARCODE: '7290001000219', UNIT: 'M', SELLPRICE: 45, COSTPRICE: 28, INVENTORY: 500, FAMILY: 'GEARS', STATUS: 'Active' },
  { PARTNAME: 'GER-003', PARTDES: 'Planetary Gearbox 10:1', BARCODE: '7290001000413', UNIT: 'EA', SELLPRICE: 1450, COSTPRICE: 1050, INVENTORY: 12, FAMILY: 'GEARS', STATUS: 'Active' },
  { PARTNAME: 'FLT-001', PARTDES: 'מסנן שמן הידראולי', BARCODE: '7290001000226', UNIT: 'EA', SELLPRICE: 120, COSTPRICE: 70, INVENTORY: 150, FAMILY: 'FILTERS', STATUS: 'Active' },
  { PARTNAME: 'FLT-002', PARTDES: 'Air Filter Element', BARCODE: '7290001000233', UNIT: 'EA', SELLPRICE: 95, COSTPRICE: 55, INVENTORY: 200, FAMILY: 'FILTERS', STATUS: 'Active' },
  { PARTNAME: 'FLT-003', PARTDES: 'Water Filter Cartridge', BARCODE: '7290001000414', UNIT: 'EA', SELLPRICE: 75, COSTPRICE: 42, INVENTORY: 180, FAMILY: 'FILTERS', STATUS: 'Active' },
  { PARTNAME: 'WIR-001', PARTDES: 'כבל חשמל 3x2.5mm', BARCODE: '7290001000240', UNIT: 'M', SELLPRICE: 12, COSTPRICE: 7, INVENTORY: 2000, FAMILY: 'ELECTRICAL', STATUS: 'Active' },
  { PARTNAME: 'WIR-002', PARTDES: 'Control Cable 12 Core', BARCODE: '7290001000257', UNIT: 'M', SELLPRICE: 28, COSTPRICE: 18, INVENTORY: 800, FAMILY: 'ELECTRICAL', STATUS: 'Active' },
  { PARTNAME: 'WIR-003', PARTDES: 'Shielded Cable 4x1.5mm', BARCODE: '7290001000415', UNIT: 'M', SELLPRICE: 18, COSTPRICE: 11, INVENTORY: 1200, FAMILY: 'ELECTRICAL', STATUS: 'Active' },
  { PARTNAME: 'CON-001', PARTDES: 'מחבר תעשייתי M12', BARCODE: '7290001000264', UNIT: 'EA', SELLPRICE: 45, COSTPRICE: 25, INVENTORY: 400, FAMILY: 'CONNECTORS', STATUS: 'Active' },
  { PARTNAME: 'CON-002', PARTDES: 'Terminal Block 10-pos', BARCODE: '7290001000271', UNIT: 'EA', SELLPRICE: 35, COSTPRICE: 20, INVENTORY: 500, FAMILY: 'CONNECTORS', STATUS: 'Active' },
  { PARTNAME: 'CON-003', PARTDES: 'Heavy Duty Connector 16P', BARCODE: '7290001000416', UNIT: 'EA', SELLPRICE: 185, COSTPRICE: 120, INVENTORY: 75, FAMILY: 'CONNECTORS', STATUS: 'Active' },
  { PARTNAME: 'FRM-001', PARTDES: 'פרופיל אלומיניום 40x40', BARCODE: '7290001000288', UNIT: 'M', SELLPRICE: 65, COSTPRICE: 42, INVENTORY: 300, FAMILY: 'FRAMES', STATUS: 'Active' },
  { PARTNAME: 'FRM-002', PARTDES: 'Steel Plate 5mm', BARCODE: '7290001000295', UNIT: 'KG', SELLPRICE: 18, COSTPRICE: 11, INVENTORY: 1500, FAMILY: 'FRAMES', STATUS: 'Active' },
  { PARTNAME: 'FRM-003', PARTDES: 'Linear Rail 20mm', BARCODE: '7290001000417', UNIT: 'M', SELLPRICE: 180, COSTPRICE: 125, INVENTORY: 80, FAMILY: 'FRAMES', STATUS: 'Active' },
  { PARTNAME: 'HSG-001', PARTDES: 'ארון חשמל 60x40x20', BARCODE: '7290001000301', UNIT: 'EA', SELLPRICE: 850, COSTPRICE: 580, INVENTORY: 20, FAMILY: 'ENCLOSURES', STATUS: 'Active' },
  { PARTNAME: 'HSG-002', PARTDES: 'Junction Box IP67', BARCODE: '7290001000318', UNIT: 'EA', SELLPRICE: 180, COSTPRICE: 110, INVENTORY: 80, FAMILY: 'ENCLOSURES', STATUS: 'Active' },
  { PARTNAME: 'HSG-003', PARTDES: 'Control Panel Box 80x60', BARCODE: '7290001000418', UNIT: 'EA', SELLPRICE: 1250, COSTPRICE: 880, INVENTORY: 10, FAMILY: 'ENCLOSURES', STATUS: 'Active' },
  { PARTNAME: 'DRV-001', PARTDES: 'ממיר תדר 5.5KW', BARCODE: '7290001000325', UNIT: 'EA', SELLPRICE: 4200, COSTPRICE: 3100, INVENTORY: 8, FAMILY: 'DRIVES', STATUS: 'Active' },
  { PARTNAME: 'DRV-002', PARTDES: 'Stepper Driver 4A', BARCODE: '7290001000332', UNIT: 'EA', SELLPRICE: 380, COSTPRICE: 260, INVENTORY: 55, FAMILY: 'DRIVES', STATUS: 'Active' },
  { PARTNAME: 'DRV-003', PARTDES: 'Servo Drive 1KW', BARCODE: '7290001000419', UNIT: 'EA', SELLPRICE: 2800, COSTPRICE: 2050, INVENTORY: 15, FAMILY: 'DRIVES', STATUS: 'Active' },
  { PARTNAME: 'SAF-001', PARTDES: 'מפסק בטיחות Emergency', BARCODE: '7290001000349', UNIT: 'EA', SELLPRICE: 250, COSTPRICE: 160, INVENTORY: 70, FAMILY: 'SAFETY', STATUS: 'Active' },
  { PARTNAME: 'SAF-002', PARTDES: 'Light Curtain 500mm', BARCODE: '7290001000356', UNIT: 'EA', SELLPRICE: 2800, COSTPRICE: 2100, INVENTORY: 6, FAMILY: 'SAFETY', STATUS: 'Active' },
  { PARTNAME: 'SAF-003', PARTDES: 'Safety Relay Module', BARCODE: '7290001000420', UNIT: 'EA', SELLPRICE: 580, COSTPRICE: 420, INVENTORY: 28, FAMILY: 'SAFETY', STATUS: 'Active' },
  { PARTNAME: 'SAF-004', PARTDES: 'Interlock Switch', BARCODE: '7290001000421', UNIT: 'EA', SELLPRICE: 320, COSTPRICE: 220, INVENTORY: 45, FAMILY: 'SAFETY', STATUS: 'Active' },
  { PARTNAME: 'LUB-001', PARTDES: 'שמן הידראולי ISO 46', BARCODE: '7290001000363', UNIT: 'L', SELLPRICE: 25, COSTPRICE: 15, INVENTORY: 600, FAMILY: 'LUBRICANTS', STATUS: 'Active' },
  { PARTNAME: 'LUB-002', PARTDES: 'Grease Lithium EP2', BARCODE: '7290001000422', UNIT: 'KG', SELLPRICE: 45, COSTPRICE: 28, INVENTORY: 150, FAMILY: 'LUBRICANTS', STATUS: 'Active' },
];

// Generate dates relative to "today" (workshop date)
const today = new Date();
const formatDate = (daysOffset) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

const orders = [
  // Delivered orders (past)
  { ORDNAME: 'ORD001', CUSTNAME: 'C001', CURDATE: formatDate(-45), ORDSTATUS: 'Delivered', QPRICE: 12500, DETAILS: 'הזמנת מנועים ובקרים' },
  { ORDNAME: 'ORD002', CUSTNAME: 'C006', CURDATE: formatDate(-40), ORDSTATUS: 'Delivered', QPRICE: 4500, DETAILS: 'Bearings and gears replacement' },
  { ORDNAME: 'ORD003', CUSTNAME: 'C010', CURDATE: formatDate(-38), ORDSTATUS: 'Delivered', QPRICE: 5600, DETAILS: 'Safety equipment order' },
  { ORDNAME: 'ORD004', CUSTNAME: 'C002', CURDATE: formatDate(-35), ORDSTATUS: 'Delivered', QPRICE: 6300, DETAILS: 'Maintenance spare parts' },
  { ORDNAME: 'ORD005', CUSTNAME: 'C015', CURDATE: formatDate(-33), ORDSTATUS: 'Delivered', QPRICE: 2100, DETAILS: 'מחברים ומסופים' },
  // Shipped orders
  { ORDNAME: 'ORD006', CUSTNAME: 'C003', CURDATE: formatDate(-20), ORDSTATUS: 'Shipped', QPRICE: 23400, DETAILS: 'הזמנת משאבות ושסתומים' },
  { ORDNAME: 'ORD007', CUSTNAME: 'C008', CURDATE: formatDate(-18), ORDSTATUS: 'Shipped', QPRICE: 31000, DETAILS: 'Complete conveyor system parts' },
  { ORDNAME: 'ORD008', CUSTNAME: 'C012', CURDATE: formatDate(-15), ORDSTATUS: 'Shipped', QPRICE: 27500, DETAILS: 'Hydraulic system components' },
  { ORDNAME: 'ORD009', CUSTNAME: 'C014', CURDATE: formatDate(-12), ORDSTATUS: 'Shipped', QPRICE: 16700, DETAILS: 'Pump station upgrade' },
  // In Progress orders
  { ORDNAME: 'ORD010', CUSTNAME: 'C002', CURDATE: formatDate(-10), ORDSTATUS: 'In Progress', QPRICE: 8900, DETAILS: 'Sensors and connectors order' },
  { ORDNAME: 'ORD011', CUSTNAME: 'C007', CURDATE: formatDate(-9), ORDSTATUS: 'In Progress', QPRICE: 7800, DETAILS: 'הזמנת חיישנים וכבלים' },
  { ORDNAME: 'ORD012', CUSTNAME: 'C001', CURDATE: formatDate(-8), ORDSTATUS: 'In Progress', QPRICE: 14300, DETAILS: 'ממירי תדר ומנועי סרוו' },
  { ORDNAME: 'ORD013', CUSTNAME: 'C010', CURDATE: formatDate(-7), ORDSTATUS: 'In Progress', QPRICE: 42000, DETAILS: 'Full automation line components' },
  { ORDNAME: 'ORD014', CUSTNAME: 'C018', CURDATE: formatDate(-6), ORDSTATUS: 'In Progress', QPRICE: 13500, DETAILS: 'Compressed air system parts' },
  { ORDNAME: 'ORD015', CUSTNAME: 'C020', CURDATE: formatDate(-5), ORDSTATUS: 'In Progress', QPRICE: 28500, DETAILS: 'Construction site automation' },
  // Open orders (recent)
  { ORDNAME: 'ORD016', CUSTNAME: 'C004', CURDATE: formatDate(-4), ORDSTATUS: 'Open', QPRICE: 6700, DETAILS: 'Pneumatic cylinders batch' },
  { ORDNAME: 'ORD017', CUSTNAME: 'C005', CURDATE: formatDate(-3), ORDSTATUS: 'Open', QPRICE: 15800, DETAILS: 'ארונות חשמל ומפסקים' },
  { ORDNAME: 'ORD018', CUSTNAME: 'C002', CURDATE: formatDate(-3), ORDSTATUS: 'Open', QPRICE: 19200, DETAILS: 'PLC system upgrade' },
  { ORDNAME: 'ORD019', CUSTNAME: 'C009', CURDATE: formatDate(-2), ORDSTATUS: 'Open', QPRICE: 3200, DETAILS: 'פרופילים ופלטות פלדה' },
  { ORDNAME: 'ORD020', CUSTNAME: 'C011', CURDATE: formatDate(-2), ORDSTATUS: 'Open', QPRICE: 9800, DETAILS: 'חלקי חילוף למערכת מילוי' },
  { ORDNAME: 'ORD021', CUSTNAME: 'C013', CURDATE: formatDate(-1), ORDSTATUS: 'Open', QPRICE: 8400, DETAILS: 'Optical sensors and cables' },
  { ORDNAME: 'ORD022', CUSTNAME: 'C003', CURDATE: formatDate(-1), ORDSTATUS: 'Open', QPRICE: 11900, DETAILS: 'הזמנת ציוד בקרה' },
  { ORDNAME: 'ORD023', CUSTNAME: 'C006', CURDATE: formatDate(0), ORDSTATUS: 'Open', QPRICE: 5400, DETAILS: 'Filter elements bulk order' },
  { ORDNAME: 'ORD024', CUSTNAME: 'C005', CURDATE: formatDate(0), ORDSTATUS: 'Open', QPRICE: 7200, DETAILS: 'לוחות חשמל ואביזרים' },
  { ORDNAME: 'ORD025', CUSTNAME: 'C008', CURDATE: formatDate(0), ORDSTATUS: 'Open', QPRICE: 18900, DETAILS: 'Robot cell components' },
  { ORDNAME: 'ORD026', CUSTNAME: 'C021', CURDATE: formatDate(0), ORDSTATUS: 'Open', QPRICE: 22400, DETAILS: 'Medical device components' },
  { ORDNAME: 'ORD027', CUSTNAME: 'C022', CURDATE: formatDate(0), ORDSTATUS: 'Open', QPRICE: 15600, DETAILS: 'Agricultural automation parts' },
  { ORDNAME: 'ORD028', CUSTNAME: 'C019', CURDATE: formatDate(0), ORDSTATUS: 'Open', QPRICE: 8900, DETAILS: 'Packaging line spares' },
  // Cancelled orders
  { ORDNAME: 'ORD029', CUSTNAME: 'C016', CURDATE: formatDate(-25), ORDSTATUS: 'Cancelled', QPRICE: 12000, DETAILS: 'Cancelled - customer request' },
];

const orderItems = [
  { ORDNAME: 'ORD001', LINE: 1, PARTNAME: 'MOT-001', TQUANT: 3, PRICE: 2500, DUEDATE: formatDate(-30), KLINE: 'Delivered' },
  { ORDNAME: 'ORD001', LINE: 2, PARTNAME: 'PLC-001', TQUANT: 1, PRICE: 3500, DUEDATE: formatDate(-30), KLINE: 'Delivered' },
  { ORDNAME: 'ORD001', LINE: 3, PARTNAME: 'DRV-001', TQUANT: 1, PRICE: 4200, DUEDATE: formatDate(-30), KLINE: 'Delivered' },
  { ORDNAME: 'ORD006', LINE: 1, PARTNAME: 'PMP-001', TQUANT: 2, PRICE: 4500, DUEDATE: formatDate(-5), KLINE: 'Shipped' },
  { ORDNAME: 'ORD006', LINE: 2, PARTNAME: 'VLV-001', TQUANT: 8, PRICE: 380, DUEDATE: formatDate(-5), KLINE: 'Shipped' },
  { ORDNAME: 'ORD006', LINE: 3, PARTNAME: 'VLV-003', TQUANT: 4, PRICE: 1800, DUEDATE: formatDate(-5), KLINE: 'Shipped' },
  { ORDNAME: 'ORD010', LINE: 1, PARTNAME: 'SEN-001', TQUANT: 10, PRICE: 180, DUEDATE: formatDate(5), KLINE: 'In Progress' },
  { ORDNAME: 'ORD010', LINE: 2, PARTNAME: 'SEN-002', TQUANT: 5, PRICE: 320, DUEDATE: formatDate(5), KLINE: 'In Progress' },
  { ORDNAME: 'ORD010', LINE: 3, PARTNAME: 'CON-001', TQUANT: 20, PRICE: 45, DUEDATE: formatDate(5), KLINE: 'In Progress' },
  { ORDNAME: 'ORD013', LINE: 1, PARTNAME: 'MOT-002', TQUANT: 6, PRICE: 3200, DUEDATE: formatDate(10), KLINE: 'In Progress' },
  { ORDNAME: 'ORD013', LINE: 2, PARTNAME: 'PLC-001', TQUANT: 2, PRICE: 3500, DUEDATE: formatDate(10), KLINE: 'In Progress' },
  { ORDNAME: 'ORD013', LINE: 3, PARTNAME: 'DRV-001', TQUANT: 3, PRICE: 4200, DUEDATE: formatDate(10), KLINE: 'In Progress' },
  { ORDNAME: 'ORD013', LINE: 4, PARTNAME: 'SAF-002', TQUANT: 2, PRICE: 2800, DUEDATE: formatDate(10), KLINE: 'In Progress' },
  { ORDNAME: 'ORD016', LINE: 1, PARTNAME: 'CYL-001', TQUANT: 12, PRICE: 420, DUEDATE: formatDate(7), KLINE: 'Open' },
  { ORDNAME: 'ORD016', LINE: 2, PARTNAME: 'VLV-002', TQUANT: 6, PRICE: 290, DUEDATE: formatDate(7), KLINE: 'Open' },
  { ORDNAME: 'ORD017', LINE: 1, PARTNAME: 'HSG-001', TQUANT: 5, PRICE: 850, DUEDATE: formatDate(8), KLINE: 'Open' },
  { ORDNAME: 'ORD017', LINE: 2, PARTNAME: 'SAF-001', TQUANT: 10, PRICE: 250, DUEDATE: formatDate(8), KLINE: 'Open' },
  { ORDNAME: 'ORD017', LINE: 3, PARTNAME: 'WIR-001', TQUANT: 500, PRICE: 12, DUEDATE: formatDate(8), KLINE: 'Open' },
  { ORDNAME: 'ORD018', LINE: 1, PARTNAME: 'PLC-001', TQUANT: 2, PRICE: 3500, DUEDATE: formatDate(12), KLINE: 'Open' },
  { ORDNAME: 'ORD018', LINE: 2, PARTNAME: 'PLC-002', TQUANT: 3, PRICE: 2200, DUEDATE: formatDate(12), KLINE: 'Open' },
  { ORDNAME: 'ORD018', LINE: 3, PARTNAME: 'PLC-003', TQUANT: 4, PRICE: 950, DUEDATE: formatDate(12), KLINE: 'Open' },
  { ORDNAME: 'ORD025', LINE: 1, PARTNAME: 'MOT-002', TQUANT: 4, PRICE: 3200, DUEDATE: formatDate(15), KLINE: 'Open' },
  { ORDNAME: 'ORD025', LINE: 2, PARTNAME: 'SEN-007', TQUANT: 8, PRICE: 750, DUEDATE: formatDate(15), KLINE: 'Open' },
  { ORDNAME: 'ORD025', LINE: 3, PARTNAME: 'GER-003', TQUANT: 2, PRICE: 1450, DUEDATE: formatDate(15), KLINE: 'Open' },
];

const invoices = [
  // Paid invoices
  { IVNUM: 'INV001', CUSTNAME: 'C001', IVDATE: formatDate(-60), TOTAL: 12500, IVSTATUS: 'Paid', PAYDATE: formatDate(-45) },
  { IVNUM: 'INV002', CUSTNAME: 'C006', IVDATE: formatDate(-55), TOTAL: 4500, IVSTATUS: 'Paid', PAYDATE: formatDate(-40) },
  { IVNUM: 'INV003', CUSTNAME: 'C010', IVDATE: formatDate(-52), TOTAL: 5600, IVSTATUS: 'Paid', PAYDATE: formatDate(-38) },
  { IVNUM: 'INV004', CUSTNAME: 'C002', IVDATE: formatDate(-48), TOTAL: 6300, IVSTATUS: 'Paid', PAYDATE: formatDate(-35) },
  { IVNUM: 'INV005', CUSTNAME: 'C015', IVDATE: formatDate(-45), TOTAL: 2100, IVSTATUS: 'Paid', PAYDATE: formatDate(-30) },
  { IVNUM: 'INV006', CUSTNAME: 'C004', IVDATE: formatDate(-42), TOTAL: 8900, IVSTATUS: 'Paid', PAYDATE: formatDate(-28) },
  // Sent invoices (current)
  { IVNUM: 'INV007', CUSTNAME: 'C003', IVDATE: formatDate(-25), TOTAL: 23400, IVSTATUS: 'Sent', PAYDATE: formatDate(5) },
  { IVNUM: 'INV008', CUSTNAME: 'C008', IVDATE: formatDate(-22), TOTAL: 31000, IVSTATUS: 'Sent', PAYDATE: formatDate(8) },
  { IVNUM: 'INV009', CUSTNAME: 'C012', IVDATE: formatDate(-18), TOTAL: 27500, IVSTATUS: 'Sent', PAYDATE: formatDate(12) },
  { IVNUM: 'INV010', CUSTNAME: 'C014', IVDATE: formatDate(-15), TOTAL: 16700, IVSTATUS: 'Sent', PAYDATE: formatDate(15) },
  { IVNUM: 'INV011', CUSTNAME: 'C020', IVDATE: formatDate(-10), TOTAL: 18500, IVSTATUS: 'Sent', PAYDATE: formatDate(20) },
  // Overdue invoices (critical for workshop demo!)
  { IVNUM: 'INV012', CUSTNAME: 'C007', IVDATE: formatDate(-95), TOTAL: 15200, IVSTATUS: 'Overdue', PAYDATE: formatDate(-65) },
  { IVNUM: 'INV013', CUSTNAME: 'C011', IVDATE: formatDate(-85), TOTAL: 8900, IVSTATUS: 'Overdue', PAYDATE: formatDate(-55) },
  { IVNUM: 'INV014', CUSTNAME: 'C018', IVDATE: formatDate(-75), TOTAL: 22400, IVSTATUS: 'Overdue', PAYDATE: formatDate(-45) },
  { IVNUM: 'INV015', CUSTNAME: 'C005', IVDATE: formatDate(-68), TOTAL: 11500, IVSTATUS: 'Overdue', PAYDATE: formatDate(-38) },
  // Draft invoices
  { IVNUM: 'INV016', CUSTNAME: 'C002', IVDATE: formatDate(-3), TOTAL: 8900, IVSTATUS: 'Draft', PAYDATE: formatDate(27) },
  { IVNUM: 'INV017', CUSTNAME: 'C010', IVDATE: formatDate(-2), TOTAL: 42000, IVSTATUS: 'Draft', PAYDATE: formatDate(28) },
  { IVNUM: 'INV018', CUSTNAME: 'C021', IVDATE: formatDate(-1), TOTAL: 22400, IVSTATUS: 'Draft', PAYDATE: formatDate(29) },
];

const invoiceItems = [
  { IVNUM: 'INV001', LINE: 1, PARTNAME: 'MOT-001', TQUANT: 3, PRICE: 2500 },
  { IVNUM: 'INV001', LINE: 2, PARTNAME: 'PLC-001', TQUANT: 1, PRICE: 3500 },
  { IVNUM: 'INV001', LINE: 3, PARTNAME: 'DRV-001', TQUANT: 1, PRICE: 4200 },
  { IVNUM: 'INV002', LINE: 1, PARTNAME: 'BRG-001', TQUANT: 20, PRICE: 85 },
  { IVNUM: 'INV002', LINE: 2, PARTNAME: 'GER-001', TQUANT: 10, PRICE: 220 },
  { IVNUM: 'INV007', LINE: 1, PARTNAME: 'PMP-001', TQUANT: 2, PRICE: 4500 },
  { IVNUM: 'INV007', LINE: 2, PARTNAME: 'VLV-001', TQUANT: 8, PRICE: 380 },
  { IVNUM: 'INV007', LINE: 3, PARTNAME: 'VLV-003', TQUANT: 4, PRICE: 1800 },
  { IVNUM: 'INV012', LINE: 1, PARTNAME: 'MOT-002', TQUANT: 3, PRICE: 3200 },
  { IVNUM: 'INV012', LINE: 2, PARTNAME: 'DRV-003', TQUANT: 2, PRICE: 2800 },
  { IVNUM: 'INV013', LINE: 1, PARTNAME: 'SEN-001', TQUANT: 20, PRICE: 180 },
  { IVNUM: 'INV013', LINE: 2, PARTNAME: 'SEN-002', TQUANT: 15, PRICE: 320 },
];

const suppliers = [
  { SUPNAME: 'SUP001', SUPDES: 'מפעלי מתכת השרון', PHONE: '09-7441234', EMAIL: 'sales@metal-sharon.co.il', ADDRESS: 'אזור תעשייה נתניה', COUNTRY: 'Israel', STATUS: 'Active' },
  { SUPNAME: 'SUP002', SUPDES: 'Siemens Industrial', PHONE: '+49-123-456789', EMAIL: 'orders@siemens-ind.de', ADDRESS: '10 Automation Str', COUNTRY: 'Germany', STATUS: 'Active' },
  { SUPNAME: 'SUP003', SUPDES: 'חיישנים ובקרה בע"מ', PHONE: '03-5552345', EMAIL: 'info@sensors-control.co.il', ADDRESS: 'רחוב המלאכה 5', COUNTRY: 'Israel', STATUS: 'Active' },
  { SUPNAME: 'SUP004', SUPDES: 'Pacific Bearings Corp', PHONE: '+86-21-55553456', EMAIL: 'export@pacbearings.cn', ADDRESS: '88 Industry Road', COUNTRY: 'China', STATUS: 'Active' },
  { SUPNAME: 'SUP005', SUPDES: 'FluidTech Europe', PHONE: '+39-02-4567890', EMAIL: 'sales@fluidtech.it', ADDRESS: '45 Via Industriale', COUNTRY: 'Italy', STATUS: 'Active' },
  { SUPNAME: 'SUP006', SUPDES: 'אלומיניום ופרופילים ישראל', PHONE: '04-8663456', EMAIL: 'orders@alu-profiles.co.il', ADDRESS: 'אזור תעשייה עכו', COUNTRY: 'Israel', STATUS: 'Active' },
  { SUPNAME: 'SUP007', SUPDES: 'ElectroCables Ltd', PHONE: '08-9274567', EMAIL: 'info@electrocables.com', ADDRESS: '23 Wire Lane', COUNTRY: 'Israel', STATUS: 'Active' },
  { SUPNAME: 'SUP008', SUPDES: 'Pneumax International', PHONE: '+49-89-5678901', EMAIL: 'sales@pneumax-intl.de', ADDRESS: '7 Druckluft Weg', COUNTRY: 'Germany', STATUS: 'Active' },
  { SUPNAME: 'SUP009', SUPDES: 'תעשיות גומי הדרום', PHONE: '08-6385678', EMAIL: 'sales@rubber-south.co.il', ADDRESS: 'אזור תעשייה ערד', COUNTRY: 'Israel', STATUS: 'Inactive' },
  { SUPNAME: 'SUP010', SUPDES: 'SafeGuard Equipment', PHONE: '+1-555-6789012', EMAIL: 'orders@safeguard-eq.com', ADDRESS: '100 Safety Blvd', COUNTRY: 'USA', STATUS: 'Active' },
  { SUPNAME: 'SUP011', SUPDES: 'Omron Components Japan', PHONE: '+81-3-12345678', EMAIL: 'global@omron.co.jp', ADDRESS: 'Tokyo Industrial Zone', COUNTRY: 'Japan', STATUS: 'Active' },
  { SUPNAME: 'SUP012', SUPDES: 'ABB Power Products', PHONE: '+46-8-7654321', EMAIL: 'orders@abb.se', ADDRESS: 'Stockholm Tech Park', COUNTRY: 'Sweden', STATUS: 'Active' },
];

const workOrders = [
  // Completed work orders
  { WONUM: 'WO001', PARTNAME: 'MOT-001', TQUANT: 10, STARTDATE: formatDate(-60), ENDDATE: formatDate(-45), WOSTATUS: 'Completed', PRIORITY: 5 },
  { WONUM: 'WO002', PARTNAME: 'PMP-001', TQUANT: 5, STARTDATE: formatDate(-50), ENDDATE: formatDate(-35), WOSTATUS: 'Completed', PRIORITY: 7 },
  { WONUM: 'WO003', PARTNAME: 'VLV-001', TQUANT: 20, STARTDATE: formatDate(-45), ENDDATE: formatDate(-30), WOSTATUS: 'Completed', PRIORITY: 4 },
  // In Progress work orders
  { WONUM: 'WO004', PARTNAME: 'PLC-001', TQUANT: 8, STARTDATE: formatDate(-20), ENDDATE: formatDate(5), WOSTATUS: 'In Progress', PRIORITY: 8 },
  { WONUM: 'WO005', PARTNAME: 'HSG-001', TQUANT: 12, STARTDATE: formatDate(-15), ENDDATE: formatDate(10), WOSTATUS: 'In Progress', PRIORITY: 6 },
  { WONUM: 'WO006', PARTNAME: 'DRV-001', TQUANT: 6, STARTDATE: formatDate(-10), ENDDATE: formatDate(15), WOSTATUS: 'In Progress', PRIORITY: 9 },
  { WONUM: 'WO007', PARTNAME: 'MOT-002', TQUANT: 15, STARTDATE: formatDate(-8), ENDDATE: formatDate(12), WOSTATUS: 'In Progress', PRIORITY: 7 },
  // Overdue work order (anomaly for demo!)
  { WONUM: 'WO008', PARTNAME: 'VLV-003', TQUANT: 10, STARTDATE: formatDate(-25), ENDDATE: formatDate(-5), WOSTATUS: 'In Progress', PRIORITY: 10 },
  // Planned work orders
  { WONUM: 'WO009', PARTNAME: 'SAF-002', TQUANT: 4, STARTDATE: formatDate(2), ENDDATE: formatDate(20), WOSTATUS: 'Planned', PRIORITY: 6 },
  { WONUM: 'WO010', PARTNAME: 'PMP-002', TQUANT: 8, STARTDATE: formatDate(5), ENDDATE: formatDate(25), WOSTATUS: 'Planned', PRIORITY: 5 },
  { WONUM: 'WO011', PARTNAME: 'SEN-004', TQUANT: 15, STARTDATE: formatDate(8), ENDDATE: formatDate(28), WOSTATUS: 'Planned', PRIORITY: 4 },
  { WONUM: 'WO012', PARTNAME: 'CYL-001', TQUANT: 30, STARTDATE: formatDate(10), ENDDATE: formatDate(30), WOSTATUS: 'Planned', PRIORITY: 3 },
  // On Hold work orders
  { WONUM: 'WO013', PARTNAME: 'DRV-003', TQUANT: 5, STARTDATE: formatDate(-5), ENDDATE: formatDate(15), WOSTATUS: 'On Hold', PRIORITY: 7 },
  { WONUM: 'WO014', PARTNAME: 'GER-003', TQUANT: 8, STARTDATE: formatDate(-3), ENDDATE: formatDate(20), WOSTATUS: 'On Hold', PRIORITY: 5 },
];

const boms = [
  { BOMNAME: 'BOM-MOT001', PARTNAME: 'MOT-001', BOMDES: 'מנוע חשמלי 3HP - עץ מוצר', REVISION: 'A', STATUS: 'Active' },
  { BOMNAME: 'BOM-PMP001', PARTNAME: 'PMP-001', BOMDES: 'משאבה צנטריפוגלית - עץ מוצר', REVISION: 'B', STATUS: 'Active' },
  { BOMNAME: 'BOM-HSG001', PARTNAME: 'HSG-001', BOMDES: 'ארון חשמל - עץ מוצר', REVISION: 'A', STATUS: 'Active' },
  { BOMNAME: 'BOM-PLC001', PARTNAME: 'PLC-001', BOMDES: 'PLC System Assembly', REVISION: 'C', STATUS: 'Active' },
  { BOMNAME: 'BOM-DRV001', PARTNAME: 'DRV-001', BOMDES: 'VFD Drive Assembly', REVISION: 'B', STATUS: 'Active' },
  { BOMNAME: 'BOM-SAF002', PARTNAME: 'SAF-002', BOMDES: 'Light Curtain System', REVISION: 'A', STATUS: 'Active' },
];

const bomItems = [
  { BOMNAME: 'BOM-MOT001', LINE: 1, CHILDPART: 'BRG-001', TQUANT: 2, UNIT: 'EA' },
  { BOMNAME: 'BOM-MOT001', LINE: 2, CHILDPART: 'WIR-001', TQUANT: 5, UNIT: 'M' },
  { BOMNAME: 'BOM-MOT001', LINE: 3, CHILDPART: 'CON-001', TQUANT: 1, UNIT: 'EA' },
  { BOMNAME: 'BOM-MOT001', LINE: 4, CHILDPART: 'FRM-002', TQUANT: 3, UNIT: 'KG' },
  { BOMNAME: 'BOM-PMP001', LINE: 1, CHILDPART: 'MOT-001', TQUANT: 1, UNIT: 'EA' },
  { BOMNAME: 'BOM-PMP001', LINE: 2, CHILDPART: 'VLV-001', TQUANT: 2, UNIT: 'EA' },
  { BOMNAME: 'BOM-PMP001', LINE: 3, CHILDPART: 'SEN-003', TQUANT: 1, UNIT: 'EA' },
  { BOMNAME: 'BOM-PMP001', LINE: 4, CHILDPART: 'BRG-002', TQUANT: 2, UNIT: 'EA' },
  { BOMNAME: 'BOM-PMP001', LINE: 5, CHILDPART: 'FLT-001', TQUANT: 1, UNIT: 'EA' },
  { BOMNAME: 'BOM-HSG001', LINE: 1, CHILDPART: 'FRM-002', TQUANT: 8, UNIT: 'KG' },
  { BOMNAME: 'BOM-HSG001', LINE: 2, CHILDPART: 'CON-002', TQUANT: 4, UNIT: 'EA' },
  { BOMNAME: 'BOM-HSG001', LINE: 3, CHILDPART: 'WIR-001', TQUANT: 20, UNIT: 'M' },
  { BOMNAME: 'BOM-HSG001', LINE: 4, CHILDPART: 'SAF-001', TQUANT: 1, UNIT: 'EA' },
  { BOMNAME: 'BOM-PLC001', LINE: 1, CHILDPART: 'PLC-003', TQUANT: 4, UNIT: 'EA' },
  { BOMNAME: 'BOM-PLC001', LINE: 2, CHILDPART: 'PLC-002', TQUANT: 1, UNIT: 'EA' },
  { BOMNAME: 'BOM-PLC001', LINE: 3, CHILDPART: 'WIR-002', TQUANT: 15, UNIT: 'M' },
  { BOMNAME: 'BOM-PLC001', LINE: 4, CHILDPART: 'HSG-002', TQUANT: 2, UNIT: 'EA' },
  { BOMNAME: 'BOM-DRV001', LINE: 1, CHILDPART: 'HSG-002', TQUANT: 1, UNIT: 'EA' },
  { BOMNAME: 'BOM-DRV001', LINE: 2, CHILDPART: 'CON-003', TQUANT: 2, UNIT: 'EA' },
  { BOMNAME: 'BOM-DRV001', LINE: 3, CHILDPART: 'WIR-003', TQUANT: 5, UNIT: 'M' },
  { BOMNAME: 'BOM-SAF002', LINE: 1, CHILDPART: 'SAF-003', TQUANT: 2, UNIT: 'EA' },
  { BOMNAME: 'BOM-SAF002', LINE: 2, CHILDPART: 'CON-001', TQUANT: 4, UNIT: 'EA' },
  { BOMNAME: 'BOM-SAF002', LINE: 3, CHILDPART: 'WIR-002', TQUANT: 10, UNIT: 'M' },
];

const productionPlans = [
  { PLANNAME: 'PP2024-Q4', PLANDES: 'תוכנית ייצור רבעון 4 2024', STARTDATE: formatDate(-60), ENDDATE: formatDate(-1), STATUS: 'Completed' },
  { PLANNAME: 'PP2025-Q1', PLANDES: 'Production Plan Q1 2025', STARTDATE: formatDate(-30), ENDDATE: formatDate(60), STATUS: 'Active' },
  { PLANNAME: 'PP2025-SP1', PLANDES: 'Special Project - Automation Line', STARTDATE: formatDate(-15), ENDDATE: formatDate(45), STATUS: 'Active' },
  { PLANNAME: 'PP2025-SP2', PLANDES: 'Medical Device Production', STARTDATE: formatDate(0), ENDDATE: formatDate(90), STATUS: 'Active' },
  { PLANNAME: 'PP2025-Q2', PLANDES: 'תוכנית ייצור רבעון 2 2025', STARTDATE: formatDate(30), ENDDATE: formatDate(120), STATUS: 'Planned' },
];

const departments = [
  { DEPTCODE: 'PROD', DEPTDES: 'Production', MANAGER: 'EMP001', HEADCOUNT: 28 },
  { DEPTCODE: 'ENG', DEPTDES: 'Engineering', MANAGER: 'EMP006', HEADCOUNT: 14 },
  { DEPTCODE: 'QA', DEPTDES: 'Quality Assurance', MANAGER: 'EMP010', HEADCOUNT: 9 },
  { DEPTCODE: 'LOG', DEPTDES: 'Logistics', MANAGER: 'EMP013', HEADCOUNT: 12 },
  { DEPTCODE: 'ADM', DEPTDES: 'Administration', MANAGER: 'EMP016', HEADCOUNT: 7 },
  { DEPTCODE: 'RND', DEPTDES: 'R&D', MANAGER: 'EMP019', HEADCOUNT: 8 },
];

const employees = [
  { EMPNUM: 'EMP001', EMPNAME: 'יוסי כהן', DEPT: 'PROD', POSITION: 'Production Manager', HIREDATE: '2018-03-15', PHONE: '050-1234567', EMAIL: 'yossi.c@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP002', EMPNAME: 'דני לוי', DEPT: 'PROD', POSITION: 'Production Technician', HIREDATE: '2019-07-01', PHONE: '050-2345678', EMAIL: 'dani.l@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP003', EMPNAME: 'מיכל אברהם', DEPT: 'PROD', POSITION: 'Machine Operator', HIREDATE: '2020-01-10', PHONE: '050-3456789', EMAIL: 'michal.a@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP004', EMPNAME: 'Alex Petrov', DEPT: 'PROD', POSITION: 'CNC Operator', HIREDATE: '2019-11-20', PHONE: '050-4567890', EMAIL: 'alex.p@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP005', EMPNAME: 'שרה מזרחי', DEPT: 'PROD', POSITION: 'Assembly Worker', HIREDATE: '2021-05-15', PHONE: '050-5678901', EMAIL: 'sara.m@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP006', EMPNAME: 'רון ברק', DEPT: 'ENG', POSITION: 'Engineering Manager', HIREDATE: '2017-01-10', PHONE: '050-6789012', EMAIL: 'ron.b@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP007', EMPNAME: 'Maria Santos', DEPT: 'ENG', POSITION: 'Mechanical Engineer', HIREDATE: '2020-08-01', PHONE: '050-7890123', EMAIL: 'maria.s@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP008', EMPNAME: 'עמית גולן', DEPT: 'ENG', POSITION: 'Electrical Engineer', HIREDATE: '2019-03-20', PHONE: '050-8901234', EMAIL: 'amit.g@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP009', EMPNAME: 'David Kim', DEPT: 'ENG', POSITION: 'Software Engineer', HIREDATE: '2021-09-01', PHONE: '050-9012345', EMAIL: 'david.k@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP010', EMPNAME: 'נועה שפירא', DEPT: 'QA', POSITION: 'QA Manager', HIREDATE: '2018-06-01', PHONE: '050-0123456', EMAIL: 'noa.s@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP011', EMPNAME: 'אורי דוד', DEPT: 'QA', POSITION: 'QA Inspector', HIREDATE: '2020-11-15', PHONE: '052-1234567', EMAIL: 'uri.d@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP012', EMPNAME: 'Lisa Chen', DEPT: 'QA', POSITION: 'QA Inspector', HIREDATE: '2021-02-01', PHONE: '052-2345678', EMAIL: 'lisa.c@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP013', EMPNAME: 'משה ביטון', DEPT: 'LOG', POSITION: 'Logistics Manager', HIREDATE: '2017-09-01', PHONE: '052-3456789', EMAIL: 'moshe.b@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP014', EMPNAME: 'רותי פרץ', DEPT: 'LOG', POSITION: 'Warehouse Coordinator', HIREDATE: '2019-04-10', PHONE: '052-4567890', EMAIL: 'ruti.p@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP015', EMPNAME: 'Tom Wilson', DEPT: 'LOG', POSITION: 'Shipping Coordinator', HIREDATE: '2020-07-20', PHONE: '052-5678901', EMAIL: 'tom.w@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP016', EMPNAME: 'הילה נחמני', DEPT: 'ADM', POSITION: 'Office Manager', HIREDATE: '2016-11-01', PHONE: '052-6789012', EMAIL: 'hila.n@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP017', EMPNAME: 'יעל כץ', DEPT: 'ADM', POSITION: 'Accountant', HIREDATE: '2018-02-15', PHONE: '052-7890123', EMAIL: 'yael.k@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP018', EMPNAME: 'Mark Johnson', DEPT: 'ADM', POSITION: 'HR Manager', HIREDATE: '2019-06-01', PHONE: '052-8901234', EMAIL: 'mark.j@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP019', EMPNAME: 'איתן לוין', DEPT: 'RND', POSITION: 'R&D Director', HIREDATE: '2017-04-01', PHONE: '052-9012345', EMAIL: 'eitan.l@company.co.il', STATUS: 'Active' },
  { EMPNUM: 'EMP020', EMPNAME: 'Chen Wei', DEPT: 'RND', POSITION: 'Senior Developer', HIREDATE: '2020-03-15', PHONE: '053-0123456', EMAIL: 'chen.w@company.co.il', STATUS: 'Active' },
];

// Generate timesheets for the past 2 weeks
const timesheets = [];
let tsCounter = 1;
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

for (let dayOffset = -14; dayOffset <= 0; dayOffset++) {
  const tsDate = formatDate(dayOffset);
  const dayOfWeek = new Date(today.getTime() + dayOffset * 24 * 60 * 60 * 1000).getDay();

  // Skip weekends (Friday=5, Saturday=6 in Israel context, but let's use Sat=6, Sun=0 for international)
  if (dayOfWeek === 6) continue; // Saturday

  // Production employees
  ['EMP001', 'EMP002', 'EMP003', 'EMP004', 'EMP005'].forEach(emp => {
    const hours = 7 + Math.floor(Math.random() * 3); // 7-9 hours
    const projects = ['WO004', 'WO005', 'WO006', 'WO007', 'WO008'];
    const project = projects[Math.floor(Math.random() * projects.length)];
    timesheets.push({
      TSNUM: `TS${String(tsCounter++).padStart(4, '0')}`,
      EMPNUM: emp,
      TSDATE: tsDate,
      HOURS: hours,
      PROJECT: project,
      DESCRIPTION: 'Production work'
    });
  });

  // Engineering employees (less frequent)
  if (dayOffset % 2 === 0) {
    ['EMP006', 'EMP007', 'EMP008', 'EMP009'].forEach(emp => {
      const hours = 6 + Math.floor(Math.random() * 4);
      timesheets.push({
        TSNUM: `TS${String(tsCounter++).padStart(4, '0')}`,
        EMPNUM: emp,
        TSDATE: tsDate,
        HOURS: hours,
        PROJECT: 'PP2025-SP1',
        DESCRIPTION: 'Engineering support'
      });
    });
  }

  // QA employees
  ['EMP010', 'EMP011', 'EMP012'].forEach(emp => {
    const hours = 6 + Math.floor(Math.random() * 3);
    timesheets.push({
      TSNUM: `TS${String(tsCounter++).padStart(4, '0')}`,
      EMPNUM: emp,
      TSDATE: tsDate,
      HOURS: hours,
      PROJECT: 'QA-GENERAL',
      DESCRIPTION: 'Quality inspections'
    });
  });
}

// Export mutable copies so routes can modify them
module.exports = {
  customers: [...customers],
  products: [...products],
  orders: [...orders],
  orderItems: [...orderItems],
  invoices: [...invoices],
  invoiceItems: [...invoiceItems],
  suppliers: [...suppliers],
  workOrders: [...workOrders],
  boms: [...boms],
  bomItems: [...bomItems],
  productionPlans: [...productionPlans],
  departments: [...departments],
  employees: [...employees],
  timesheets: [...timesheets],
};

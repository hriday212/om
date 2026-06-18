# Om Coldrink House - Action Plan & Roadmap

This document outlines the step-by-step plan of action for taking this front-end prototype of **Om Coldrink House** into a fully operational, compliant, production-grade e-commerce application.

---

## Phase 1: Local Setup & Customization (Immediate Tasks)

### 1. Configure Offline Fonts
Create a `fonts/` folder in your workspace root directory:
* Path: `c:\Users\Hrida\Downloads\Om\fonts\`

Download the following free font files from Google Fonts and save them inside the folder:
* **Cormorant Garamond (Serif)**:
  * `CormorantGaramond-Regular.ttf` (Main text, titles)
  * `CormorantGaramond-Medium.ttf`
  * `CormorantGaramond-SemiBold.ttf`
  * `CormorantGaramond-Bold.ttf`
  * `CormorantGaramond-Italic.ttf`
* **Plus Jakarta Sans (Sans-Serif)**:
  * `PlusJakartaSans-Regular.ttf` (Labels, checkout forms, tracker text)
  * `PlusJakartaSans-Medium.ttf`
  * `PlusJakartaSans-SemiBold.ttf`
  * `PlusJakartaSans-Bold.ttf`

### 2. Replace Product Placeholder Images
Use the instructions in the [Image Customization Guide](file:///c:/Users/Hrida/Downloads/Om/docs/image_customization_guide.md) to:
1. Capture real product photos of Matthri, Gudd Paare, Shakkar Paare, and your four heritage pickes (Jackfruit, Karela, Mango, Karvanda).
2. Save them as square `800x800px` images in `assets/`.
3. Update the `image` path mapping in `index.js`.

### 3. Insert Legal Registrations
Open `index.html` and search for the `footer-compliance` section. Replace details once obtained:
* **FSSAI License No.**: Add your real 14-digit food registration number.
* **GSTIN**: Marked as Exempt (Proprietorship) by default. Update this to your tax number if your turnover exceeds the registration threshold in the future.

---

## Phase 2: Interactive Features & Dynamic Shipping

### 1. Real Carrier API Integration
Instead of mock Porter & Borzo rate calculations, integrate their shipping APIs:
* **Porter API / Borzo API**:
  * Set up a backend route (Node.js/Python) to send a payload containing the pickup location coordinates (Shop No. 4, Sion West) and the drop-off coordinates (fetched using Google Maps Autocomplete API on the checkout form).
  * Render real-time quotes, ride details, and estimated delivery times on the checkout interface.

### 2. Payment Integration (Simple vs. Advanced)
Integrating a full payment gateway like Razorpay requires formal business registration, developer accounts, and a backend server. 

**Much Easier, Zero-Setup Alternatives:**
*   **Static UPI QR Code + WhatsApp Proof (Easiest)**:
    *   Place an image of your shop's business UPI QR Code (GPay/PhonePe/Paytm) inside the order completion screen.
    *   Instruct customers to pay the Grand Total and click a button that redirects them to WhatsApp to send a screenshot of the receipt as proof.
*   **UPI Intent Links (Automatic App Launch)**:
    *   Use a standard UPI link structure: `upi://pay?pa=youraddress@upi&pn=Om%20Coldrink%20House&am=TOTAL_AMOUNT&cu=INR`
    *   When clicked on a mobile device, this link automatically opens their preferred payment app (GPay/Paytm/PhonePe) with the exact order amount already filled in. They only have to enter their PIN.
*   **Cash on Delivery (COD)**:
    *   Allow payment at delivery. Many courier partners (like Borzo) offer cash-collection services where the rider collects the money and transfers it to your bank account.

---

## Phase 3: Backend Operations & WhatsApp Notifications

### 1. Database & Order Management
* **Order Management System (OMS)**:
  * Deploy a backend server (e.g., Node.js / Express with MongoDB or Firebase) to store active order logs, customer details, and payment statuses.
  * Build a simple admin dashboard for your kitchen staff to see new orders, click "Pack", click "Dispatch", and trigger courier requests automatically.

### 2. Live WhatsApp Alerts
* **WhatsApp Business API**:
  * Integrate an API service like *Twilio* or *Wati*.
  * Automatically trigger WhatsApp updates (Template Messages) to customers' phone numbers as their order state changes from **Received -> Preparing -> Dispatched -> Delivered**.

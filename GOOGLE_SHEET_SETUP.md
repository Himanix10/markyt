# MARKYT — Real-Time Google Sheet Live Sync Setup Guide

Your landing page has **two dynamic tables** that can be powered live by Google Sheets:
1. **Meta Ads Manager Table (Know About Us section)** — shows your active client campaigns, delivery status, results, cost per result, and amount spent.
2. **Daily Sprint Telemetry Table (Who We Are section)** — shows daily spend, impressions, clicks, CTR, leads, CPL, and notes.

Whenever you edit rows in your Google Sheet (from your phone, laptop, or automated Zapier/Make workflow), the website updates live automatically!

---

# SECTION A: Meta Ads Manager Proof Table ("Know About Us")

This is the table with **Campaign | Delivery | Results | Cost/Result | Amount Spent**.

### Step 1: Create or Add a Tab in Your Google Sheet
Name the tab: `Meta_Ads` (or use any sheet).

Set **Row 1** headers:
| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| **Campaign** | **Delivery** | **Badge** | **Results** | **Results Unit** | **Cost / Result** | **Cost Unit** | **Amount Spent** | **Budget Note** |

### Step 2: Add Sample Rows (Starting from Row 2)
Copy and paste these exact rows into your sheet:
- `Clothing Brand` | `Completed` | `` | `57` | `website purchases` | `₹175.44` | `per purchase` | `₹10,000.00` | `₹10.00K spent`
- `Premium Wooden Slabs (Carousel)` | `Active` | `` | `132` | `conversations` | `₹27.94` | `per conv.` | `₹3,688.08` | `₹3.69K spent`
- `Premium Wooden Slabs (Video)` | `Active` | `` | `101` | `conversations` | `₹46.12` | `per conv.` | `₹4,658.17` | `₹5,000 budget`
- `Skin Clinic` | `Active` | `` | `60` | `conversations` | `₹62.98` | `per conv.` | `₹3,778.80` | `₹3.78K spent`
- `Fitness Coach` | `Active` | `` | `15` | `conversations` | `₹62.62` | `per conv.` | `₹939.27` | `Ad set budget`
- `Therapist` | `Active` | `Day 2 Data` | `6` | `conversations` | `₹71.82` | `per conv.` | `₹430.92` | `Ad set budget`

---

### Step 3: Connect to the Website

You have **two ways** to connect:

#### METHOD 1: 30-Second Google Sheets CSV Publish (Recommended — 0 Code!)
1. In your Google Sheet, click **File** → **Share** → **Publish to web**.
2. Select your `Meta_Ads` sheet tab (instead of "Entire Document").
3. In the second dropdown, choose **Comma-separated values (.csv)** (instead of "Web page").
4. Click **Publish**.
5. Copy the generated link (starts with `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).
6. On your website, click **"Connect Google Sheet"** (or **"Sheet Settings"**) right above the table.
7. Paste the link and click **Save & Sync**.
8. Done! The table turns into **LIVE SHEET ACTIVE** immediately!

#### METHOD 2: Google Apps Script Web App
If you prefer a JSON Web App endpoint:
1. In Google Sheets, click **Extensions** → **Apps Script**.
2. Paste this code:
```javascript
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Meta_Ads") || ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var r = data[i];
      if (!r[0]) continue;
      rows.push({
        campaign: String(r[0]).trim(),
        status: String(r[1] || "Active").trim(),
        badge: r[2] ? { text: String(r[2]).trim(), variant: "amber" } : null,
        results: parseInt(String(r[3]).replace(/[^0-9]/g, ''), 10) || 0,
        resultsUnit: String(r[4] || "conversations").trim(),
        costPerResult: String(r[5] || "₹0.00").trim(),
        costPerUnit: String(r[6] || "per conv.").trim(),
        amountSpent: String(r[7] || "₹0.00").trim(),
        budgetNote: String(r[8] || "").trim()
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", rows: rows }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
3. Click **Deploy** → **New deployment** → **Web app** → Set access to **Anyone** → Copy Web App URL.
4. Paste the URL into the website modal or in `.env` as `VITE_CAMPAIGN_PROOF_SHEET_URL`.

---

# SECTION B: Daily Sprint Campaign Tracker ("Who We Are")

Follow the same steps using `Campaign_Tracker` tab with columns:
`Day | Creative / Channel | Spend | Impressions | CPM | Clicks | CTR | CPC | Leads | Conv % | Cost per Lead | Strategic Learning Note`
And configure `VITE_GOOGLE_SHEET_API_URL`.

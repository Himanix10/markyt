# MARKYT — Real-Time Google Sheet Telemetry Setup Guide

This guide walks you through setting up **Option 1 (Google Apps Script Web App)**.
- **Cost**: ₹0 (Runs on Google's free infrastructure)
- **Time to Setup**: ~2 to 5 minutes
- **How it works**: Whenever you edit or add rows in your Google Sheet (from your phone, laptop, or automated Zapier/Make flow), your landing page live data table updates automatically.

---

## Step 1: Prepare Your Google Sheet

1. Create a new Google Sheet (or use your existing campaign tracker).
2. Set the sheet name to `Campaign_Tracker` (or keep default `Sheet1`).
3. Set the columns in **Row 1**:
   | A | B | C | D | E | F | G | H | I | J | K | L |
   |---|---|---|---|---|---|---|---|---|---|---|---|
   | **Day** | **Creative / Channel** | **Spend** | **Impressions** | **CPM** | **Clicks** | **CTR** | **CPC** | **Leads** | **Conv %** | **Cost per Lead** | **Strategic Learning Note** |

4. Add sample rows starting from **Row 2**:
   - `Day 1` | `Testimonial Ad` | `117.86` | `1734` | `67.97` | `17` | `0.98%` | `6.93` | `2` | `12%` | `58.93` | `Learning phase`

---

## Step 2: Add Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**.
2. Replace any code in the editor with this:

```javascript
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Campaign_Tracker") || ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    if (!data || data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "empty",
        clientName: sheet.getName(),
        updatedAt: new Date().toISOString(),
        budgetCap: 5000,
        rows: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Header row is index 0
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var r = data[i];
      // Skip empty rows
      if (r[0] === "" && r[1] === "" && r[2] === "") continue;
      
      var day = String(r[0] || ("Day " + i)).trim();
      var channel = String(r[1] || "Meta Ads").trim();
      var amountSpent = parseFloat(String(r[2]).replace(/[^0-9.]/g, '')) || 0;
      var impressions = parseInt(String(r[3]).replace(/[^0-9]/g, ''), 10) || 0;
      var cpm = parseFloat(String(r[4]).replace(/[^0-9.]/g, '')) || (impressions > 0 ? (amountSpent / impressions) * 1000 : 0);
      var linkClicks = parseInt(String(r[5]).replace(/[^0-9]/g, ''), 10) || 0;
      var ctr = String(r[6] || (impressions > 0 ? ((linkClicks / impressions) * 100).toFixed(2) + "%" : "0%")).trim();
      var cpc = parseFloat(String(r[7]).replace(/[^0-9.]/g, '')) || (linkClicks > 0 ? amountSpent / linkClicks : 0);
      var leads = parseInt(String(r[8]).replace(/[^0-9]/g, ''), 10) || 0;
      var conversionRate = String(r[9] || (linkClicks > 0 ? ((leads / linkClicks) * 100).toFixed(1) + "%" : "0%")).trim();
      var costPerLead = parseFloat(String(r[10]).replace(/[^0-9.]/g, '')) || (leads > 0 ? amountSpent / leads : 0);
      var strategicNote = String(r[11] || "").trim();

      rows.push({
        day: day,
        channel: channel,
        amountSpent: amountSpent,
        impressions: impressions,
        cpm: cpm,
        linkClicks: linkClicks,
        ctr: ctr.includes('%') ? ctr : ctr + '%',
        cpc: cpc,
        leads: leads,
        conversionRate: conversionRate.includes('%') ? conversionRate : conversionRate + '%',
        costPerLead: costPerLead,
        strategicNote: strategicNote
      });
    }

    var response = {
      status: "success",
      clientName: sheet.getName(),
      updatedAt: new Date().toISOString(),
      budgetCap: 5000,
      rows: rows
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** (💾) icon.

---

## Step 3: Deploy as Web App

1. In Apps Script, click the blue **Deploy** button at the top right → **New deployment**.
2. Click the **gear icon** next to "Select type" and choose **Web app**.
3. Fill in settings:
   - **Description**: `Markyt Live Campaign Tracker`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: allows visitors on your website to read the telemetry)*
4. Click **Deploy**.
5. Grant permissions if Google asks ("Advanced" → "Go to Untitled project (unsafe)").
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

## Step 4: Connect to Your Website

You can connect in two easy ways:

### Option A: Directly from the Website UI (Instant)
1. Open your website (`http://localhost:3000/`).
2. Scroll to the **Live Data** section.
3. Click the green **"Connect Sheet"** button on the sheet toolbar.
4. Paste your Web App URL and click **"Save & Sync Sheet"**.
5. The table will immediately sync and turn into `LIVE SYNC ACTIVE`!

### Option B: Via `.env` file (Permanent for Production Deployment)
1. Create a `.env` file in the project root:
   ```env
   VITE_GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
2. Restart or build your Vite app.

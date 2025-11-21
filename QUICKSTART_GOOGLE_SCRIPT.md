# Quick Start: Google Apps Script Integration

**Goal**: Send form submissions to your email using Google Apps Script (100% free)

## 🎯 Quick Setup (3 Steps)

### Step 1: Deploy Google Apps Script (5 min)
1. Go to [script.google.com](https://script.google.com)
2. Create new project
3. Copy code from `google-apps-script/Code.gs`
4. Update email in line 18: `recipientEmail: 'your-email@example.com'`
5. Deploy → New deployment → Web app → Anyone → Deploy
6. Copy the Web App URL

### Step 2: Update Your Form (1 min)
1. Open `js/form-validation.js`
2. Line 131: Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your URL
3. Save

### Step 3: Test (1 min)
1. Open `index.html` in browser
2. Fill and submit the form
3. Check your email!

## 📖 Full Documentation
See [GOOGLE_SCRIPT_SETUP.md](GOOGLE_SCRIPT_SETUP.md) for detailed instructions with screenshots and troubleshooting.

## 📁 Files Created

```
Everrondottech/
├── google-apps-script/
│   └── Code.gs                    # Google Apps Script code
├── GOOGLE_SCRIPT_SETUP.md         # Detailed setup guide
├── QUICKSTART_GOOGLE_SCRIPT.md    # This file
└── js/
    └── form-validation.js         # Updated with integration
```

## ✨ What You Get

✅ **Email Notifications**: Beautiful HTML emails with lead details  
✅ **WhatsApp Links**: Click to message leads directly  
✅ **Google Sheets**: Optional logging for tracking  
✅ **Free Forever**: Runs on Google's infrastructure  
✅ **Secure**: No backend server needed  

## 🔧 Configuration Options

### Email Settings (in Code.gs)
```javascript
recipientEmail: 'your-email@example.com'  // Where to send leads
emailSubject: '🚀 New Lead from EVERRON'  // Email subject
```

### Google Sheets (Optional)
```javascript
sheetId: '1abc123...'  // Paste your Google Sheet ID
sheetName: 'Leads'     // Sheet tab name
```

## 🆘 Need Help?

- **Detailed Guide**: [GOOGLE_SCRIPT_SETUP.md](GOOGLE_SCRIPT_SETUP.md)
- **Troubleshooting**: See "Troubleshooting" section in setup guide
- **Test First**: Always test locally before deploying

---

**Time to complete**: ~7 minutes  
**Cost**: $0 (Free forever)  
**Difficulty**: Easy 🟢

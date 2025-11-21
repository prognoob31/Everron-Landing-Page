# Google Apps Script Setup Guide

Complete step-by-step instructions to connect your EVERRON landing page form to email using Google Apps Script.

## 📋 What You'll Need

- A Google account (Gmail)
- 10 minutes of your time
- The `Code.gs` file from the `google-apps-script` folder

---

## 🚀 Step 1: Create Google Apps Script Project

### 1.1 Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Sign in with your Google account
3. Click **"New Project"** (top left)

### 1.2 Set Up Your Script
1. You'll see a new project with a file called `Code.gs`
2. **Delete** all the default code in the editor
3. Open the `Code.gs` file from your `google-apps-script` folder
4. **Copy all the code** and paste it into the Google Apps Script editor

### 1.3 Configure Email Settings
In the script editor, find this section at the top:

```javascript
const CONFIG = {
  recipientEmail: 'hello@everron.tech', // CHANGE THIS
  emailSubject: '🚀 New Lead from EVERRON Landing Page',
  sheetId: '',
  sheetName: 'Leads'
};
```

**Update the `recipientEmail`** to your actual email address where you want to receive form submissions.

### 1.4 Save Your Project
1. Click the **disk icon** or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
2. Give your project a name: **"EVERRON Form Handler"**
3. Click **"OK"**

---

## 🌐 Step 2: Deploy as Web App

### 2.1 Start Deployment
1. Click **"Deploy"** button (top right)
2. Select **"New deployment"**

### 2.2 Configure Deployment Settings
1. Click the **gear icon** ⚙️ next to "Select type"
2. Choose **"Web app"**

3. Fill in the settings:
   - **Description**: "EVERRON Form Handler v1"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**

   > ⚠️ **Important**: Must select "Anyone" for the form to work from your website

4. Click **"Deploy"**

### 2.3 Authorize the Script
1. A popup will appear asking for permissions
2. Click **"Authorize access"**
3. Choose your Google account
4. You'll see a warning: "Google hasn't verified this app"
   - Click **"Advanced"**
   - Click **"Go to EVERRON Form Handler (unsafe)"**
   - This is safe - it's your own script!
5. Click **"Allow"** to grant permissions

### 2.4 Copy Your Web App URL
1. After authorization, you'll see a **"Deployment"** confirmation
2. **Copy the Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
3. **Save this URL** - you'll need it in the next step!

---

## 🔧 Step 3: Connect to Your Website

### 3.1 Update form-validation.js
1. Open `js/form-validation.js` in your code editor
2. Find this line (around line 131):
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. **Replace** `YOUR_GOOGLE_SCRIPT_URL_HERE` with your actual Web App URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
4. **Save the file**

---

## ✅ Step 4: Test Your Form

### 4.1 Test Locally
1. Open `index.html` in your browser
2. Scroll to the form section
3. Fill in all fields with test data:
   - **Full Name**: Test User
   - **Business Type**: E-commerce
   - **WhatsApp Number**: +1234567890
   - **Message Volume**: 100-500
4. Click **"Request Free Demo"**

### 4.2 Verify Email Delivery
1. Check your email inbox (the one you configured in Step 1.3)
2. You should receive a beautifully formatted email with:
   - Lead details
   - Professional styling
   - WhatsApp link to contact them directly

### 4.3 Check for Errors
If the form doesn't work:
1. Open browser console (F12 → Console tab)
2. Look for error messages
3. See **Troubleshooting** section below

---

## 📊 Optional: Enable Google Sheets Logging

Want to track all submissions in a spreadsheet?

### 5.1 Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: **"EVERRON Leads"**
4. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/1abc123def456ghi789jkl/edit
                                      ^^^^^^^^^^^^^^^^^^^^
                                      This is your Sheet ID
   ```

### 5.2 Update Script Configuration
1. Go back to your Google Apps Script project
2. Find the `CONFIG` section
3. Paste your Sheet ID:
   ```javascript
   const CONFIG = {
     recipientEmail: 'hello@everron.tech',
     emailSubject: '🚀 New Lead from EVERRON Landing Page',
     sheetId: '1abc123def456ghi789jkl', // Paste your Sheet ID here
     sheetName: 'Leads'
   };
   ```
4. **Save** the script (Ctrl+S / Cmd+S)
5. **Deploy again**:
   - Click "Deploy" → "Manage deployments"
   - Click the pencil icon ✏️ to edit
   - Change version to "New version"
   - Click "Deploy"

### 5.3 Test Sheet Logging
1. Submit another test form
2. Check your Google Sheet
3. You should see a new row with the submission data!

---

## 🔍 Troubleshooting

### Form submission fails
**Problem**: Form shows error message

**Solutions**:
1. Verify the Web App URL is correct in `form-validation.js`
2. Make sure you deployed with "Who has access: **Anyone**"
3. Check browser console for specific errors

### No email received
**Problem**: Form submits but no email arrives

**Solutions**:
1. Check your spam/junk folder
2. Verify `recipientEmail` in the script is correct
3. Go to Apps Script → Executions tab to see if script ran
4. Check for errors in the Executions log

### "Google hasn't verified this app" warning
**Problem**: Scary warning during authorization

**Solution**: This is normal for personal scripts. Click "Advanced" → "Go to [project name] (unsafe)" → "Allow"

### CORS errors in console
**Problem**: Browser shows CORS-related errors

**Solution**: This is expected with `no-cors` mode. As long as the form shows success, it's working!

### Sheet not updating
**Problem**: Email works but Google Sheet doesn't update

**Solutions**:
1. Verify Sheet ID is correct
2. Make sure you deployed a new version after adding the Sheet ID
3. Check the sheet name matches `sheetName` in CONFIG

---

## 🎯 Next Steps

### After Successful Testing

1. **Deploy Your Website**
   - Follow `DEPLOYMENT.md` to deploy to GitHub Pages
   - The form will work the same on the live site

2. **Customize Email Template** (Optional)
   - Edit the HTML in the `sendEmailNotification` function
   - Change colors, layout, or add your logo

3. **Add Analytics** (Optional)
   - Track form submissions in Google Analytics
   - Add conversion tracking

4. **Set Up Auto-Reply** (Optional)
   - Modify the script to send a confirmation email to the user
   - Add their email field to the form first

---

## 📞 Support

If you encounter issues:

1. Check the [Google Apps Script documentation](https://developers.google.com/apps-script)
2. Review the Executions log in your Apps Script project
3. Verify all URLs and IDs are correct

---

## 🔐 Security Notes

- ✅ The script only accepts POST requests with form data
- ✅ All HTML is escaped to prevent XSS attacks
- ✅ No sensitive data is stored (unless you enable Sheets)
- ✅ Runs on Google's secure infrastructure
- ✅ Free within Google's usage quotas (20,000 emails/day)

---

**Congratulations!** 🎉 Your form is now connected to email via Google Apps Script!

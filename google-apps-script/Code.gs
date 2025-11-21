/**
 * EVERRON Landing Page - Form Submission Handler
 * This Google Apps Script receives form submissions and sends them via email
 * 
 * SETUP INSTRUCTIONS:
 * 1. Replace YOUR_EMAIL_HERE with your actual email address
 * 2. Deploy as Web App (see GOOGLE_SCRIPT_SETUP.md for details)
 * 3. Copy the deployment URL to your form-validation.js file
 */

// ============================================
// CONFIGURATION - UPDATE THIS!
// ============================================
const CONFIG = {
  // Email address that will receive form submissions
  recipientEmail: 'hello@everron.tech', // CHANGE THIS to your email
  
  // Email subject line
  emailSubject: '🚀 New Lead from EVERRON Landing Page',
  
  // Optional: Google Sheet ID to log submissions (leave empty to disable)
  // To enable: Create a Google Sheet and paste its ID here
  sheetId: '', // Example: '1abc123def456ghi789jkl'
  
  // Sheet name where data will be logged
  sheetName: 'Leads'
};

// ============================================
// MAIN FUNCTION - Handles POST requests
// ============================================
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.fullName || !data.businessType || !data.whatsappNumber || !data.messageVolume) {
      return createResponse(false, 'Missing required fields');
    }
    
    // Send email notification
    sendEmailNotification(data);
    
    // Optional: Log to Google Sheets
    if (CONFIG.sheetId) {
      logToSheet(data);
    }
    
    // Return success response
    return createResponse(true, 'Form submitted successfully');
    
  } catch (error) {
    console.error('Error processing form:', error);
    return createResponse(false, 'Server error: ' + error.message);
  }
}

// ============================================
// EMAIL NOTIFICATION
// ============================================
function sendEmailNotification(data) {
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: white;
          padding: 30px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-top: none;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .field:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .label {
          font-size: 12px;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .value {
          font-size: 16px;
          color: #0f172a;
          font-weight: 500;
        }
        .whatsapp-link {
          display: inline-block;
          background: #10B981;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 6px;
          margin-top: 10px;
          font-weight: 600;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 14px;
        }
        .timestamp {
          color: #94a3b8;
          font-size: 13px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 New Lead Submission</h1>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">Full Name</div>
          <div class="value">${escapeHtml(data.fullName)}</div>
        </div>
        
        <div class="field">
          <div class="label">Business Type</div>
          <div class="value">${formatBusinessType(data.businessType)}</div>
        </div>
        
        <div class="field">
          <div class="label">WhatsApp Number</div>
          <div class="value">${escapeHtml(data.whatsappNumber)}</div>
          <a href="https://wa.me/${cleanPhoneNumber(data.whatsappNumber)}" class="whatsapp-link" target="_blank">
            💬 Message on WhatsApp
          </a>
        </div>
        
        <div class="field">
          <div class="label">Monthly Message Volume</div>
          <div class="value">${formatMessageVolume(data.messageVolume)}</div>
        </div>
        
        <div class="footer">
          <div class="timestamp">
            Submitted on ${new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Plain text version for email clients that don't support HTML
  const plainBody = `
New Lead from EVERRON Landing Page
===================================

Full Name: ${data.fullName}
Business Type: ${formatBusinessType(data.businessType)}
WhatsApp Number: ${data.whatsappNumber}
Monthly Message Volume: ${formatMessageVolume(data.messageVolume)}

Submitted: ${new Date().toLocaleString()}
  `;
  
  // Send email
  MailApp.sendEmail({
    to: CONFIG.recipientEmail,
    subject: CONFIG.emailSubject,
    body: plainBody,
    htmlBody: htmlBody
  });
}

// ============================================
// GOOGLE SHEETS LOGGING (Optional)
// ============================================
function logToSheet(data) {
  if (!CONFIG.sheetId) return;
  
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.sheetId).getSheetByName(CONFIG.sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(CONFIG.sheetId).insertSheet(CONFIG.sheetName);
      // Add headers
      newSheet.appendRow(['Timestamp', 'Full Name', 'Business Type', 'WhatsApp Number', 'Message Volume']);
      newSheet.getRange('A1:E1').setFontWeight('bold').setBackground('#2563EB').setFontColor('#FFFFFF');
    }
    
    const targetSheet = sheet || SpreadsheetApp.openById(CONFIG.sheetId).getSheetByName(CONFIG.sheetName);
    
    // Append data
    targetSheet.appendRow([
      new Date(),
      data.fullName,
      formatBusinessType(data.businessType),
      data.whatsappNumber,
      formatMessageVolume(data.messageVolume)
    ]);
    
  } catch (error) {
    console.error('Error logging to sheet:', error);
    // Don't fail the entire request if sheet logging fails
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Create JSON response with CORS headers
function createResponse(success, message, data = {}) {
  const response = {
    success: success,
    message: message,
    ...data
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Handle OPTIONS requests for CORS preflight
function doGet(e) {
  return createResponse(true, 'EVERRON Form Handler is running');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Format business type for display
function formatBusinessType(type) {
  const types = {
    'ecommerce': 'E-commerce',
    'service': 'Service Business',
    'agency': 'Agency',
    'restaurant': 'Restaurant',
    'other': 'Other'
  };
  return types[type] || type;
}

// Format message volume for display
function formatMessageVolume(volume) {
  const volumes = {
    'low': 'Less than 100',
    'medium': '100 - 500',
    'high': '500 - 1,000',
    'very-high': '1,000+'
  };
  return volumes[volume] || volume;
}

// Clean phone number for WhatsApp link
function cleanPhoneNumber(phone) {
  return phone.replace(/\D/g, '');
}

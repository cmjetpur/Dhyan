/**
 * Google Apps Script — AatmYatra Dhyaan Lead Collection
 * 
 * Google Sheet: https://docs.google.com/spreadsheets/d/15Ul18RRipBsEAsKle2qT3CW0xurw3LFnMKsDI6HaLGA/
 * 
 * Sheet Columns: timestamp | Update | Name | Phone | Course Name | Price | Status | Address | Note
 */

const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // e.parameter works with URL-encoded form data (most reliable method)
    const p = e.parameter;
    
    // Columns: timestamp | Update | Name | Phone | Course Name | Price | Status | Address | Note
    sheet.appendRow([
      p.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      p.Update || '',
      p.Name || '',
      p.Phone || '',
      p['Course Name'] || '',
      p.Price || '',
      p.Status || 'New Lead',
      p.Address || '',
      p.Note || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Lead saved!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'AatmYatra Dhyaan API is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

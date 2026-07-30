/**
 * Lead + Call intake — Google Apps Script Web App (reusable across sites).
 *
 * Receives the normalized LeadRecord JSON that the site sends from BOTH:
 *   - the website quote form  (/api/lead)
 *   - the Twilio call adapter (/api/twilio/voice/status)
 * They both go through forwardLead() → this one webhook, so this single script
 * is the whole lead destination: it appends every lead to the bound Sheet AND
 * emails a notification, handling type "form" and type "call" in one place.
 * The Sheet is your renter-facing ledger (form + call volume, by source).
 *
 * ── SETUP ──────────────────────────────────────────────────────────────────
 * 1. Create a Google Sheet. In it: Extensions → Apps Script. Paste this file.
 *    (Creating it from inside the Sheet makes the script "bound" to it, which
 *    is what lets it write rows.)
 * 2. Set CONFIG below — the notification inbox and the site label.
 * 3. Deploy → New deployment → type "Web app":
 *       Execute as:      Me
 *       Who has access:  Anyone
 *    Authorize when prompted (Sheets + Gmail scopes). Copy the Web app URL.
 * 4. Set that URL as the LEAD_WEBHOOK_URL environment variable in Vercel
 *    (Production), then redeploy the site.
 * ────────────────────────────────────────────────────────────────────────────
 */

// ── CONFIG (set per site) ───────────────────────────────────────────────────
const CONFIG = {
  // Inbox that receives lead notifications. ASK THE SITE OWNER for this per
  // site — do NOT reuse another site's address. Leave '' to skip email and
  // only log to the Sheet.
  NOTIFY_EMAIL: 'dylan@greatwhitepressurewashing.com',

  // Shown in email subjects/bodies so multi-site inboxes stay sortable.
  SITE_LABEL: 'Great White Pressure Washing',

  // Optional hardening: if set, POSTs must include ?token=THIS_VALUE on the URL
  // (append it to the LEAD_WEBHOOK_URL you paste into Vercel). Leave '' to
  // accept any POST — the Web app URL itself is the secret (it lives only in
  // Vercel env vars, never in the public repo).
  SHARED_SECRET: '',
};

// Column order in the Sheet — matches the LeadRecord shape (src/lib/leads.ts).
const COLUMNS = [
  'timestamp', 'type', 'name', 'phone', 'email', 'service', 'town', 'message',
  'source', 'medium', 'campaign', 'gclid', 'referrer', 'landingPage',
  'callDuration', 'callStatus', 'siteId',
];

function doPost(e) {
  try {
    if (CONFIG.SHARED_SECRET &&
        (!e || !e.parameter || e.parameter.token !== CONFIG.SHARED_SECRET)) {
      return json({ ok: false, error: 'unauthorized' });
    }
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    appendRow(data);
    sendNotification(data);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// A browser GET returns a heartbeat, so you can sanity-check the URL is live.
function doGet() {
  return json({ ok: true, service: CONFIG.SITE_LABEL + ' lead intake' });
}

function appendRow(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(headerLabel));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(COLUMNS.map(function (k) {
    return data[k] != null ? data[k] : '';
  }));
}

function sendNotification(data) {
  if (!CONFIG.NOTIFY_EMAIL || CONFIG.NOTIFY_EMAIL.indexOf('@') === -1) return;
  const isCall = data.type === 'call';
  const who = data.name || data.phone || 'Unknown';

  const subject = isCall
    ? '📞 New call — ' + (data.phone || 'unknown') +
        (data.callStatus ? ' (' + data.callStatus + ')' : '')
    : 'New quote request — ' + who + (data.town ? ' (' + data.town + ')' : '');

  const lines = [];
  lines.push(CONFIG.SITE_LABEL + ' — ' + (isCall ? 'Phone call' : 'Quote request'));
  lines.push('');
  if (isCall) {
    lines.push('Caller:   ' + (data.phone || '—'));
    lines.push('Duration: ' + formatDuration(data.callDuration));
    lines.push('Status:   ' + (data.callStatus || '—'));
  } else {
    lines.push('Name:     ' + (data.name || '—'));
    lines.push('Phone:    ' + (data.phone || '—'));
    lines.push('Email:    ' + (data.email || '—'));
    lines.push('Service:  ' + (data.service || '—'));
    lines.push('Town:     ' + (data.town || '—'));
    if (data.message) { lines.push(''); lines.push('Message:'); lines.push(data.message); }
  }
  lines.push('');
  lines.push('Source:   ' + (data.source || 'direct') +
    (data.medium ? ' / ' + data.medium : ''));
  if (data.campaign) lines.push('Campaign: ' + data.campaign);
  if (data.gclid) lines.push('gclid:    ' + data.gclid);
  if (data.landingPage) lines.push('Landing:  ' + data.landingPage);
  if (data.referrer) lines.push('Referrer: ' + data.referrer);
  lines.push('Time:     ' + (data.timestamp || new Date().toISOString()));

  const options = { to: CONFIG.NOTIFY_EMAIL, subject: subject, body: lines.join('\n') };
  if (!isCall && data.email && data.email.indexOf('@') !== -1) {
    options.replyTo = data.email; // reply straight to the customer on form leads
  }
  MailApp.sendEmail(options);
}

function formatDuration(sec) {
  const s = parseInt(sec, 10);
  if (isNaN(s)) return '—';
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + 'm ' + (r < 10 ? '0' + r : r) + 's';
}

function headerLabel(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, function (c) {
    return c.toUpperCase();
  });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

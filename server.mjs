import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import nodemailer from 'nodemailer';

const publicDir = join(process.cwd(), 'public');
const maxBodyBytes = 32 * 1024;
const rateLimits = new Map();
const mimeTypes = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const requiredConfig = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'CONTACT_RECIPIENT'];

for (const key of requiredConfig) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
});

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const history = (rateLimits.get(ip) || []).filter(timestamp => now - timestamp < 15 * 60 * 1000);
  history.push(now);
  rateLimits.set(ip, history);
  return history.length > 5;
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > maxBodyBytes) throw new Error('Request body is too large.');
  }
  return JSON.parse(body || '{}');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

async function handleContact(req, res) {
  if (isRateLimited(getClientIp(req))) return sendJson(res, 429, { error: 'Please wait before sending another enquiry.' });
  try {
    const { firstName = '', lastName = '', email = '', company = '', type = '', message = '' } = await readJson(req);
    const fields = { firstName, lastName, email, company, type, message };
    if (Object.values(fields).some(value => typeof value !== 'string' || value.trim().length === 0)) return sendJson(res, 400, { error: 'Please complete all fields.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return sendJson(res, 400, { error: 'Please provide a valid work email.' });
    if (Object.values(fields).some(value => value.length > 5000)) return sendJson(res, 400, { error: 'One or more fields are too long.' });

    const safe = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, escapeHtml(value.trim())]));
    await transporter.sendMail({
      from: { name: 'TravelNDC website', address: process.env.SMTP_USER },
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email.trim(),
      subject: `Website enquiry — ${firstName.trim()} ${lastName.trim()}`,
      text: `Name: ${firstName.trim()} ${lastName.trim()}\nWork email: ${email.trim()}\nCompany: ${company.trim()}\nBusiness type: ${type.trim()}\n\nMessage:\n${message.trim()}`,
      html: `<h2>Website enquiry</h2><p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p><p><strong>Work email:</strong> ${safe.email}</p><p><strong>Company:</strong> ${safe.company}</p><p><strong>Business type:</strong> ${safe.type}</p><p><strong>Message:</strong><br>${safe.message.replace(/\n/g, '<br>')}</p>`
    });
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact form delivery failed:', error.message);
    sendJson(res, 500, { error: 'We could not send your enquiry. Please try again later.' });
  }
}

async function serveStatic(req, res) {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = normalize(join(publicDir, relativePath));
  if (!filePath.startsWith(`${publicDir}/`)) return sendJson(res, 403, { error: 'Forbidden' });
  try {
    const file = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream' });
    res.end(file);
  } catch {
    sendJson(res, 404, { error: 'Not found' });
  }
}

createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/contact') return handleContact(req, res);
  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
  sendJson(res, 405, { error: 'Method not allowed' });
}).listen(Number(process.env.PORT) || 3000, () => console.log(`TravelNDC website listening on http://localhost:${process.env.PORT || 3000}`));

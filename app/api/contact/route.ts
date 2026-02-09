import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_TO = '77051168680'; // WhatsApp Business для уведомлений
const EMAIL_TO = 'triada.workspace@gmail.com';

function buildMessageText(data: { name: string; email: string; phone: string; service: string; message: string }) {
  const serviceLabels: Record<string, string> = {
    web: 'Веб-разработка',
    mobile: 'Мобильные приложения',
    design: 'Дизайн',
    crm: 'CRM-система',
    bot: 'Боты',
    other: 'Другое',
    '': '—',
  };
  const serviceLabel = (serviceLabels[data.service] ?? data.service) || '—';
  return [
    '🆕 *Новая заявка с сайта TRIADA GROUP*',
    '',
    `*Имя:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Телефон:* ${data.phone}`,
    `*Услуга:* ${serviceLabel}`,
    `*Сообщение:*`,
    data.message || '—',
  ].join('\n');
}

async function sendEmail(data: { name: string; email: string; phone: string; service: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const serviceLabels: Record<string, string> = {
    web: 'Веб-разработка',
    mobile: 'Мобильные приложения',
    design: 'Дизайн',
    crm: 'CRM-система',
    bot: 'Боты',
    other: 'Другое',
    '': '—',
  };
  const serviceLabel = (serviceLabels[data.service] ?? data.service) || '—';

  const html = `
    <h2>Новая заявка с сайта TRIADA GROUP</h2>
    <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Услуга:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Сообщение:</strong></p>
    <p>${escapeHtml(data.message || '—')}</p>
  `;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
      to: EMAIL_TO,
      subject: `Заявка: ${data.name} — ${serviceLabel}`,
      html,
    }),
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendWhatsApp(body: string): Promise<{ ok: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!accountSid || !authToken || !from) {
    console.error('[WhatsApp] Не заданы TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN или TWILIO_WHATSAPP_FROM. Файл .env должен быть в корне проекта (рядом с package.json).');
    return { ok: false, error: 'Twilio не настроен' };
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const params = new URLSearchParams({
    To: `whatsapp:+${WHATSAPP_TO}`,
    From: from.startsWith('whatsapp:') ? from : `whatsapp:${from}`,
    Body: body,
  });

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: params.toString(),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json.message || json.error_message || res.statusText;
    console.error('[WhatsApp] Twilio error:', res.status, msg, json);
    return { ok: false, error: msg };
  }
  return { ok: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Укажите имя и email' },
        { status: 400 }
      );
    }

    const data = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone ?? '').trim(),
      service: String(service ?? '').trim(),
      message: String(message ?? '').trim(),
    };

    const messageText = buildMessageText(data);

    try {
      await sendEmail(data);
    } catch (err) {
      console.error('Resend error:', err);
    }
    const waResult = await sendWhatsApp(messageText);
    if (!waResult.ok) {
      console.error('[WhatsApp] Не удалось отправить:', waResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Contact API error:', e);
    return NextResponse.json(
      { error: 'Не удалось отправить заявку' },
      { status: 500 }
    );
  }
}

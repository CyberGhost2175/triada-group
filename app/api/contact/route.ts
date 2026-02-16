import { NextRequest, NextResponse } from 'next/server';

const EMAIL_TO = 'triada.workspace@gmail.com';

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

function buildTelegramHtml(data: { name: string; email: string; phone: string; service: string; message: string }) {
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
  const h = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return [
    '🆕 <b>Новая заявка с сайта TRIADA GROUP</b>',
    '',
    `<b>Имя:</b> ${h(data.name)}`,
    `<b>Email:</b> ${h(data.email)}`,
    `<b>Телефон:</b> ${h(data.phone)}`,
    `<b>Услуга:</b> ${h(serviceLabel)}`,
    '<b>Сообщение:</b>',
    h(data.message || '—'),
  ].join('\n');
}

async function sendTelegram(data: { name: string; email: string; phone: string; service: string; message: string }): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('[Telegram] Не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID в .env');
    return { ok: false, error: 'Telegram не настроен' };
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramHtml(data),
      parse_mode: 'HTML',
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.ok) {
    const msg = json.description || res.statusText;
    console.error('[Telegram] Error:', res.status, msg, json);
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

    try {
      await sendEmail(data);
    } catch (err) {
      console.error('Resend error:', err);
    }
    const tgResult = await sendTelegram(data);
    if (!tgResult.ok) {
      console.error('[Telegram] Не удалось отправить:', tgResult.error);
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

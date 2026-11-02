import { NextRequest, NextResponse } from 'next/server';

const EMAIL_TO = 'triada.workspace@gmail.com';

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const serviceLabels: Record<string, string> = {
  web: 'Web application',
  mobile: 'Mobile app',
  design: 'Design',
  automation: 'Automation',
  unsure: 'Not sure yet',
  '': '—',
};

const budgetLabels: Record<string, string> = {
  under5: 'Under $5k',
  '5to15': '$5–15k',
  '15to50': '$15–50k',
  '50plus': '$50k+',
  '': '—',
};

async function sendEmail(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const serviceLabel = (serviceLabels[data.service] ?? data.service) || '—';
  const budgetLabel = (budgetLabels[data.budget] ?? data.budget) || '—';

  const html = `
    <h2>Новая заявка с сайта TRIADA GROUP</h2>
    <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Компания:</strong> ${escapeHtml(data.company || '—')}</p>
    <p><strong>Услуга:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Бюджет:</strong> ${escapeHtml(budgetLabel)}</p>
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

function buildTelegramHtml(data: ContactPayload) {
  const serviceLabel = (serviceLabels[data.service] ?? data.service) || '—';
  const budgetLabel = (budgetLabels[data.budget] ?? data.budget) || '—';
  const h = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return [
    '🆕 <b>Новая заявка с сайта TRIADA GROUP</b>',
    '',
    `<b>Имя:</b> ${h(data.name)}`,
    `<b>Email:</b> ${h(data.email)}`,
    `<b>Компания:</b> ${h(data.company || '—')}`,
    `<b>Услуга:</b> ${h(serviceLabel)}`,
    `<b>Бюджет:</b> ${h(budgetLabel)}`,
    '<b>Сообщение:</b>',
    h(data.message || '—'),
  ].join('\n');
}

async function sendTelegram(data: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIdsRaw = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatIdsRaw) {
    console.error('[Telegram] Не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID в .env');
    return { ok: false, error: 'Telegram не настроен' };
  }

  const chatIds = chatIdsRaw.split(/[\s,]+/).map((id) => id.trim()).filter(Boolean);
  if (chatIds.length === 0) {
    console.error('[Telegram] TELEGRAM_CHAT_ID пустой');
    return { ok: false, error: 'Нет chat_id' };
  }

  const text = buildTelegramHtml(data);
  let lastError: string | undefined;

  for (const chatId of chatIds) {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) {
      const msg = json.description || res.statusText;
      console.error('[Telegram] Error для chat_id', chatId, ':', res.status, msg, json);
      lastError = msg;
    }
  }

  return lastError ? { ok: false, error: lastError } : { ok: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Укажите имя и email' },
        { status: 400 }
      );
    }

    const data: ContactPayload = {
      name: String(name).trim(),
      email: String(email).trim(),
      company: String(company ?? '').trim(),
      service: String(service ?? '').trim(),
      budget: String(budget ?? '').trim(),
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

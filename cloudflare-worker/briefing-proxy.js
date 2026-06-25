/**
 * Cloudflare Worker — Briefing Proxy
 *
 * Verifica el token de Turnstile antes de reenviar el formulario a HubSpot.
 * Despliega en: Workers & Pages → Create Worker → pega este código.
 * Secret de entorno requerido: TURNSTILE_SECRET
 */

const ALLOWED_ORIGINS = ['https://katan.es', 'https://www.katan.es'];
const HUBSPOT_PORTAL_ID = '148402397';
const HUBSPOT_FORM_ID   = 'c2601690-8d77-4f53-9477-13415070a477';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') ?? '';
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, corsHeaders);
    }

    const { turnstileToken, fields, context } = body;

    if (!turnstileToken || !fields) {
      return json({ error: 'Missing fields' }, 400, corsHeaders);
    }

    // Verificar token de Turnstile
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET,
        response: turnstileToken,
        remoteip: request.headers.get('CF-Connecting-IP'),
      }),
    });

    const { success } = await verifyRes.json();
    if (!success) {
      return json({ error: 'Verificación fallida' }, 403, corsHeaders);
    }

    // Reenviar a HubSpot
    const hubspotRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context }),
      }
    );

    const data = await hubspotRes.json().catch(() => ({}));
    return json(data, hubspotRes.status, corsHeaders);
  },
};

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

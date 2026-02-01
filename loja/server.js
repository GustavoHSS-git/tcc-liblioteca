require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const crypto = require('crypto');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos (o front da loja está nesta pasta)
app.use(express.static(__dirname));

// Servir a pasta de imagens (uma pasta acima: ../fotos)
app.use('/fotos', express.static(path.join(__dirname, '..', 'fotos')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'lojaindex.html')));

// Cria pagamento PIX via Mercado Pago (sandbox ou produção, conforme MP_ACCESS_TOKEN)
app.post('/api/create-pix', async (req, res) => {
  try {
    const { amount = 1, description = 'Compra' } = req.body;
    console.log('POST /api/create-pix -> request body:', req.body);

    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) return res.status(500).json({ error: 'MP_ACCESS_TOKEN não configurado' });

    // Permitir que o email do pagador seja enviado no body (útil para Sandbox Test Users)
    const payer = req.body.payer || { email: 'cliente@example.com' };

    const body = {
      transaction_amount: Number(amount),
      payment_method_id: 'pix',
      description,
      payer
    };

    const idempotencyKey = req.headers['x-idempotency-key'] || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2,9)}`);
    console.log('Using idempotency key:', idempotencyKey);

    const mpRes = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify(body)
    });

    // Ler como texto e tentar parse para JSON, assim conseguimos logar respostas não-JSON também
    const text = await mpRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { _rawText: text };
    }

    console.log('Mercado Pago response status:', mpRes.status, mpRes.statusText);
    console.log('Mercado Pago response body:', data);

    const mpStatus = data.status || null;
    const mpStatusDetail = data.status_detail || data.cause || data.message || null;
    const mpMessage = data.message || null;
    const ticketUrl = data.point_of_interaction?.transaction_data?.ticket_url || null;

    if (!mpRes.ok) {
      // Retornar detalhe do erro para o front (útil para debug em sandbox)
      return res.status(mpRes.status).json({
        error: 'Erro do Mercado Pago',
        status: mpRes.status,
        mpStatus,
        mpStatusDetail,
        mpMessage,
        ticketUrl,
        body: data
      });
    }

    const qr = data.point_of_interaction?.transaction_data?.qr_code || null;
    const qrBase64 = data.point_of_interaction?.transaction_data?.qr_code_base64 || null;

    // Se não teve qr nem qrBase64, logar para facilitar debug
    if (!qr && !qrBase64) {
      console.warn('Nenhum QR retornado pelo Mercado Pago para pagamento:', data);
    }

    const paymentId = data.id;
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    });
    const payment = await response.json();

    res.json({ id: data.id, qr, qrBase64, ticketUrl, mpStatus, mpStatusDetail, mpMessage, raw: data });
  } catch (err) {
    console.error('Erro em /api/create-pix:', err);
    res.status(500).json({ error: 'erro interno', detail: err.message });
  }
});

// Rota para receber webhooks do PSP (implemente validação conforme a doc do PSP)
app.post('/api/webhook', (req, res) => {
  console.log('webhook recebido:', req.body);
  res.sendStatus(200);
});

// Endpoint de debug: retorna se o token está presente e os primeiros 8 caracteres (sem expor todo o token)
app.get('/debug/mp', (req, res) => {
  const token = process.env.MP_ACCESS_TOKEN || '';
  res.json({ present: !!token, tokenStart: token.slice(0, 8) });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
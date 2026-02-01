# Integração PIX com Mercado Pago (exemplo)

Este exemplo adiciona um backend simples em Node/Express que cria cobranças PIX usando a API do Mercado Pago e retorna o `qr_code` e `qr_code_base64` para o front-end.

## Passos para rodar localmente
1. Clone / abra esta pasta (`loja`).
2. Copie `.env.example` para `.env` e coloque seu `MP_ACCESS_TOKEN` (sandbox ou produção).
3. Rode:
   - `npm install`
   - `npm start` (ou `npm run dev` com `nodemon`)
4. Abra `http://localhost:3000/`.

## Como testar
- Clique em "Comprar" em um item — o front chamará `/api/create-pix` e mostrará o QR (imagem ou gerado pelo JS) e a string (payload) para copiar.
- Use o sandbox do Mercado Pago para testar pagamentos.

## Observações de segurança
- Mantenha `MP_ACCESS_TOKEN` no servidor (não exponha no front-end).
- Valide webhooks e assinaturas conforme a documentação do PSP em produção.

## Referências
- Mercado Pago: https://www.mercadopago.com.br/developers/pt

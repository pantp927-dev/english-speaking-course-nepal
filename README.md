# English Speaking Course A to Z — Railway deployment

**Course:** Padam Raj Pant | **Price:** Rs.99 | **WhatsApp:** +9779848781175

## Deploy
1. Unzip and upload the **contents** of this folder to a NEW GitHub repository. Keep the repository **private** if preferred.
2. Railway → New Project → Deploy from GitHub repo → select this repository. Railway runs `npm start`.
3. Railway → add a **Volume** mounted at `/data` (critical: orders, payment screenshots and ebooks must persist across redeployments).
4. Set Railway service variables: `DATA_DIR=/data` and `ADMIN_PASSWORD=<a long random secret of at least 12 characters>`. Never commit this password to GitHub. Optional: `PUBLIC_URL=https://your-generated-railway-domain`.
5. Railway service Settings → Networking → Generate Domain. Open the domain and `/health`.
6. Go to `https://your-domain/admin` and log in using **any username** and your `ADMIN_PASSWORD` as password. Upload the five real PDF ebooks (each max 8MB).
7. Replace `public/images/part1.jpg` ... `part5.jpg` with original cover images. Existing covers are temporary crops from screenshots.
8. Add your **real QR image** as `public/images/payment-qr.png` before accepting payments. Without a QR, the page offers a WhatsApp request for payment instructions. **Do not run paid ads until QR, PDFs, and admin setup are complete.**
9. Test an order: submit name, WhatsApp number, transaction ID and image screenshot. It appears in `/admin`. Independently verify receipt of Rs.99 in the actual bank/wallet (a screenshot is not proof of receipt). Click approve, copy the private link, and send it to the customer's WhatsApp. The buyer downloads five PDFs from the website.

## Facebook ads
Set `metaPixelId` in `public/config.js` after creating your Meta Pixel. `PageView` and `Contact` are tracked, and successful order-form submissions trigger a **custom** `PaymentVerificationRequested` event. No Purchase event is fired for an unverified payment. Manual verification currently does not send Purchase events to Meta; proper conversion reporting would require an authenticated server-side Conversions API integration.

## Security / limitations
- **No automated payment verification.** Admin must confirm the payment separately before approving.
- The access URL is a bearer link: anyone with it can download PDFs. Share privately, and do not publish it. There is no account login, expiry, or download limit.
- Admin uses HTTP Basic Auth over Railway HTTPS. Choose a strong `ADMIN_PASSWORD` and keep `/admin` private. For higher-volume production, add proper admin authentication, CSRF protection, malware scanning, audit logs, backup, and monitoring.
- Payment screenshot is stored privately on the mounted Railway volume. Set up backups, retention/deletion policy, and a proper privacy policy before public launch. Admin's screenshot endpoint assumes JPEG when displaying; PNG/WebP may display depending on browser sniffing.
- Railway persistent volumes are required. Do not use ephemeral filesystem storage.
- Never commit payment credentials, PDFs, customer records, or admin passwords to GitHub.

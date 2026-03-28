const escapeHtml = require('../../utils/escapeHtml');
const {
  BRAND_NAME,
  PORTFOLIO_URL,
  ACCENT,
  BG_PAGE,
  BG_CARD,
  TEXT_MUTED,
  TEXT_MAIN,
  BORDER,
} = require('../config');

/**
 * Confirmation email to the visitor.
 * @param {{ name: string, subject: string }} data
 */
function autoReplyTemplate({ name, subject }) {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  const portfolio = escapeHtml(PORTFOLIO_URL);

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${BG_PAGE};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BG_PAGE};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 20px 0;text-align:center;">
              <span style="display:inline-block;font-family:'Courier New',monospace;font-size:13px;font-weight:700;letter-spacing:0.15em;color:${ACCENT};border:1px solid rgba(0,255,148,0.35);padding:8px 14px;border-radius:8px;">
                // ${escapeHtml(BRAND_NAME)}
              </span>
            </td>
          </tr>
          <tr>
            <td style="background:${BG_CARD};border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,${ACCENT} 0%,#00c77a 100%);"></td>
                </tr>
                <tr>
                  <td style="padding:32px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                    <p style="margin:0;font-size:20px;font-weight:700;color:${TEXT_MAIN};letter-spacing:-0.02em;">
                      Hi ${safeName},
                    </p>
                    <p style="margin:16px 0 0 0;font-size:15px;line-height:1.65;color:${TEXT_MUTED};">
                      Thanks for your message — I’ve received it and will get back to you as soon as I can.
                    </p>
                    <p style="margin:12px 0 0 0;font-size:13px;line-height:1.6;color:${TEXT_MUTED};">
                      <strong style="color:${TEXT_MAIN};">Subject:</strong> ${safeSubject}
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                      <tr>
                        <td style="border-radius:10px;background:${ACCENT};">
                          <a href="${portfolio}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:#050508;text-decoration:none;border-radius:10px;">
                            Visit portfolio
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:28px 0 0 0;font-size:14px;line-height:1.6;color:${TEXT_MUTED};">
                      — ${escapeHtml(BRAND_NAME.split(' ')[0] || BRAND_NAME)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 12px 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;color:${TEXT_MUTED};text-align:center;line-height:1.5;">
              This is an automated confirmation. Please do not reply to this message if your question was only for testing.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

module.exports = autoReplyTemplate;

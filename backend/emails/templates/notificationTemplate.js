const escapeHtml = require('../../utils/escapeHtml');
const { BRAND_NAME, ACCENT, BG_PAGE, BG_CARD, TEXT_MUTED, TEXT_MAIN, BORDER } = require('../config');

/**
 * Email to you when someone submits the contact form.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
function notificationTemplate({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\r\n|\n|\r/g, '<br/>');

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
            <td style="padding:0 0 20px 0;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${TEXT_MUTED};">
              ${escapeHtml(BRAND_NAME)} · Contact form
            </td>
          </tr>
          <tr>
            <td style="background:${BG_CARD};border:1px solid ${BORDER};border-radius:16px;overflow:hidden;box-shadow:0 24px 48px rgba(0,0,0,0.35);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,${ACCENT} 0%,#00c77a 100%);"></td>
                </tr>
                <tr>
                  <td style="padding:28px 28px 8px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                    <p style="margin:0;font-size:22px;font-weight:700;color:${TEXT_MAIN};letter-spacing:-0.02em;">
                      New message
                    </p>
                    <p style="margin:8px 0 0 0;font-size:14px;line-height:1.5;color:${TEXT_MUTED};">
                      Someone reached out through your portfolio contact form.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 28px 28px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                    <table role="presentation" width="100%" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid ${BORDER};">
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${ACCENT};margin-bottom:4px;">Name</span>
                          <span style="font-size:15px;color:${TEXT_MAIN};">${safeName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid ${BORDER};">
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${ACCENT};margin-bottom:4px;">Email</span>
                          <a href="mailto:${safeEmail}" style="font-size:15px;color:${ACCENT};text-decoration:none;">${safeEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid ${BORDER};">
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${ACCENT};margin-bottom:4px;">Subject</span>
                          <span style="font-size:15px;color:${TEXT_MAIN};">${safeSubject}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:16px 0 0 0;">
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${ACCENT};margin-bottom:8px;">Message</span>
                          <div style="background:rgba(0,255,148,0.06);border:1px solid rgba(0,255,148,0.15);border-radius:12px;padding:16px 18px;font-size:14px;line-height:1.65;color:${TEXT_MAIN};">
                            ${safeMessage}
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                      <tr>
                        <td style="border-radius:10px;background:${ACCENT};">
                          <a href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: ' + subject)}" style="display:inline-block;padding:12px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:600;color:#050508;text-decoration:none;border-radius:10px;">
                            Reply in mail
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 8px 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:${TEXT_MUTED};text-align:center;line-height:1.5;">
              You can reply directly to this email — <strong style="color:${TEXT_MAIN};">Reply-To</strong> is set to the sender.
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

module.exports = notificationTemplate;

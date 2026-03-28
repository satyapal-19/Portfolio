const { BRAND_NAME, PORTFOLIO_URL, LOGO_URL } = require("../config");

const autoReplyTemplate = (name) => {
  return `
  <div style="background:#f4f6f8; padding:20px; font-family:Arial;">
    
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden;">
      
      <div style="background:#111827; padding:20px; text-align:center;">
        <img src="${LOGO_URL}" style="height:40px;" />
        <h2 style="color:#fff;">${BRAND_NAME}</h2>
      </div>

      <div style="padding:25px;">
        <h3>Hi ${name}, 👋</h3>

        <p>I’ve received your message and will reply soon.</p>

        <div style="margin:20px 0; background:#f3f4f6; padding:15px; border-radius:8px;">
          This is an automated confirmation email.
        </div>

        <div style="text-align:center; margin:25px;">
          <a href="${PORTFOLIO_URL}" 
             style="background:#2563eb; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px;">
             🚀 View My Portfolio
          </a>
        </div>

        <p>– Satyapal</p>
      </div>

      <div style="text-align:center; padding:10px; font-size:12px; color:#888;">
        © 2026 ${BRAND_NAME}
      </div>

    </div>
  </div>
  `;
};

module.exports = autoReplyTemplate;
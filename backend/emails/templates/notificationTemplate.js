const notificationTemplate = (name, email, message) => {
  return `
  <div style="background:#f4f6f8; padding:20px; font-family:Arial;">
    
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px;">
      
      <div style="background:#dc2626; padding:20px; text-align:center;">
        <h2 style="color:#fff;">📬 New Message</h2>
      </div>

      <div style="padding:20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>
        <div style="background:#f3f4f6; padding:10px; border-radius:6px;">
          ${message}
        </div>

        <div style="text-align:center; margin-top:20px;">
          <a href="mailto:${email}" 
             style="background:#111827; color:#fff; padding:10px 18px; text-decoration:none; border-radius:6px;">
             Reply
          </a>
        </div>
      </div>

    </div>
  </div>
  `;
};

module.exports = notificationTemplate;
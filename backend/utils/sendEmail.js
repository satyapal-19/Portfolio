const { Resend } = require('resend');

const sendEmail = async ({ to, subject, html, replyTo }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const from = process.env.EMAIL_FROM || 'Satyapal Portfolio <onboarding@resend.dev>';

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;

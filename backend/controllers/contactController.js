const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const notificationTemplate = require('../emails/templates/notificationTemplate');
const autoReplyTemplate = require('../emails/templates/autoReplyTemplate');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Contact form: RESEND_API_KEY is not set');
      return res.status(503).json({
        success: false,
        message: 'Email service not configured. Please try again later.',
      });
    }

    // Save to MongoDB first — always
    const contact = await Contact.create({ name, email, subject, message });

    const notifyTo = process.env.CONTACT_MAIL_TO || 'satypalgaikwad1234@gmail.com';

    // Notify Satyapal
    try {
      await sendEmail({
        to: notifyTo,
        subject: `[Portfolio] ${subject} — ${name}`,
        html: notificationTemplate({ name, email, subject, message }),
        replyTo: email,
      });
    } catch (notifyErr) {
      console.error('Notification email failed:', notifyErr.message);
    }

    // Auto-reply to sender
    try {
      await sendEmail({
        to: email,
        subject: `Thanks for reaching out — ${process.env.BRAND_NAME || 'Satyapal Gaikwad'}`,
        html: autoReplyTemplate({ name, subject }),
      });
    } catch (autoErr) {
      console.error('Auto-reply email failed:', autoErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('submitContact error:', error.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

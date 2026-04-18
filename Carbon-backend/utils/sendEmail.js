const nodemailer = require("nodemailer");

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 * @returns {Promise} - Resolves with info on success, throws on error
 */
  const sendEmail = async (to, subject, text) => {
  try {
    if (!process.env.EMAIL_USER) {
      console.log(`[MOCK EMAIL to ${to}] Subject: ${subject} | Text: ${text}`);
      return { messageId: "mock-id" };
    }

    const mailOptions = {
      from: `"Carbon Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;

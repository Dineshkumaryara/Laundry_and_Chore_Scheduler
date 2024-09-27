const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure you have access to your environment variables

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Yahoo, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Send reminder email
const sendReminderEmail = async (
  recipientEmail,
  name,
  reminderText,
  scheduledTime
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email address
    to: recipientEmail, // The user's email
    subject: "Reminder Scheduled", // Email subject
    text: `Hello ${name},\n\nYou have scheduled the following reminder:\n"${reminderText}"\nScheduled for: ${new Date(
      scheduledTime
    ).toLocaleString()}\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", recipientEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendReminderEmail;

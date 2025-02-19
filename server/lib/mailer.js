import nodemailer from "nodemailer";

// Create a transporter using Gmail as an example.
// You can use other services or SMTP settings as needed.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,       // Your email address
    pass: process.env.EMAIL_PASS,       // Your email password or app-specific password
  },
});

// sendNotification sends an email with the provided subject and text.
export async function sendNotification(subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,         // Sender address
    to: process.env.NOTIFICATION_EMAIL,   // Recipient address (admin or security team)
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully");
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

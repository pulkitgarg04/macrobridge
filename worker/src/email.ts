const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT || "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string): Promise<void> {
  try {
    if (!to || !body) {
      throw new Error(`Invalid email or body: to=${to}, body=${body}`);
    }

    console.log("to: ", to, ", body: ", body);

    await transport.sendMail({
      from: "project.pulkitgarg@gmail.com",
      sender: "Macrobridge",
      to,
      subject: "Your Macrobridge Zap has been executed",
      text: body,
    });

    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err);
    throw err;
  }
}

// app/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "hang_cw@hotmail.com",
      pass: process.env.HOTMAIL_PASSWORD,
    },
  });

  // Inside your send-email.ts API route handler

  const mailOptions = {
    from: '"Tesla Test Drive" <hang_cw@hotmail.com>',
    to: req.body.email, // Receiver email address from the request
    subject: "Tesla Test Drive Confirmation",
    text: `Hello ${req.body.firstname}, your request for a test drive of ${req.body.selectedModel} has been received. We will contact you shortly to arrange the details.`, // Fallback for email clients that do not support HTML
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007BFF;">Tesla Test Drive Confirmation</h2>
      <p>Hello <strong>${req.body.firstname}</strong>,</p>
      <p>Thank you for your interest in test driving a Tesla! We've received your request for a test drive of the <strong>${req.body.selectedModel}</strong>.</p>
      <p>We will contact you shortly to arrange the details of your test drive. In the meantime, if you have any questions, feel free to contact us.</p>
      <p>Please note that this is an mock email and not a real confirmation.</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      <p>Best Regards,</p>
      <p><strong>The Tesla Team</strong></p>
      <p><img src="cid:tesla-logo" alt="Tesla Logo" style="width: 100px;"></p> <!-- Adjust the src as per your actual embedded image CID -->
    </div>
  `,
    attachments: [
      {
        filename: "teslalogo.svg",
        path: path.join(process.cwd(), "public/teslalogo.svg"), // Using process.cwd() for project root
        cid: "tesla-logo", // Same CID referenced in the img src above
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}

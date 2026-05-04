import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  console.log("SMTP USER existe:", !!process.env.SES_SMTP_USER);
  console.log("SMTP PASS existe:", !!process.env.SES_SMTP_PASSWORD);
  console.log("FROM EMAIL:", process.env.SES_FROM_EMAIL);
  console.log("REGION:", process.env.AWS_REGION);

  const { email, summary } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: `email-smtp.${process.env.AWS_REGION}.amazonaws.com`,
      port: 587,
      auth: {
        user: process.env.SES_SMTP_USER,
        pass: process.env.SES_SMTP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.SES_FROM_EMAIL,
      to: email,
      subject: "Resumen de tus tareas",
      text: summary,
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error enviando email" });
  }
}
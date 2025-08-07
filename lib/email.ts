import nodemailer from "nodemailer"

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  if (
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    !process.env.EMAIL_FROM
  ) {
    console.warn("Email sending is not fully configured. Skipping email.")
    console.log("Simulated email content:")
    console.log("To:", to)
    console.log("Subject:", subject)
    console.log("Text:", text)
    return { success: true, message: "Email sending skipped due to missing configuration." }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text,
    })
    return { success: true, message: "Email sent successfully." }
  } catch (error: any) {
    console.error("Error sending email:", error)
    return { success: false, message: `Failed to send email: ${error.message}` }
  }
}

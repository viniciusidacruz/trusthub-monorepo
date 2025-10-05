"use server";

import { transporter } from "@/shared/lib/nodemailer";

interface SendEmailActionProps {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}

const styles = {
  container: `
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #DDD;
      border-radius: 6px;
    `,
  header: `
      font-size: 20px;
      color: #333;
    `,
  paragraph: `
      font-size: 16px;
    `,
  link: `
      display: inline-block;
      margin-top: 15px;
      padding: 10px 15px;
      background: #007BFF;
      color: #FFF;
      text-decoration: none;
      border-radius: 4px;
    `,
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: SendEmailActionProps) {
  const emailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `[TrustHub] - ${subject}`,
    html: `
        <div style="${styles.container}">
            <h1 style="${styles.header}">${subject}</h1>
            <p style="${styles.paragraph}">${meta.description}</p>
            <a href="${meta.link}" style="${styles.link}">Clique aqui</a>
        </div>
    `,
  };

  try {
    const result = await transporter.sendMail(emailOptions);
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return { success: false, error: "Erro ao enviar email" };
  }
}

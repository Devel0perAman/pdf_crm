// Use CommonJS require with an explicit any type to avoid missing type declarations for nodemailer
const nodemailer: any = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

export const sendEmail =
  async (
    to: string,
    subject: string,
    html: string
  ) => {
    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  };
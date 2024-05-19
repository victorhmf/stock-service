import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail({ to, subject, text }) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;

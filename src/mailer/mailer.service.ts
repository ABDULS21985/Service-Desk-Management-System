import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io', 
      port: 587,
      secure: false, 
      auth: {
        user: '1d21a146ca91aa', 
        pass: 'acd4f7755dcebd', 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: '"Enterprise Service Desk" ServiceDesk@katanga.com', 
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

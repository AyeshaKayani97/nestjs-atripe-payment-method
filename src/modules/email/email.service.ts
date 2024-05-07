import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgetPasswordEmailDto } from './dto/index.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async forgetPasswordEmail(data: ForgetPasswordEmailDto): Promise<boolean> {
    try {
      const { to, subject, forgotPasswordToken } = data;
      const template = `<div>Hi, please copy the link <a href="http://127.0.0.1:3000/auth/reset-password?token=${forgotPasswordToken}">reset password</a></div>`;

      await this.mailerService.sendMail({
        to: to,
        subject: subject,
        html: template,
      });

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

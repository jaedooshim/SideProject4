import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from '../_common/prisma/prisma.service';
import * as process from 'process';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private prismaService: PrismaService,
  ) {}

  async sendEmail(email: string) {
    const verifyEmailCode = this.verifyCode();

    await this.prismaService.verifyEmail.create({
      data: {
        email,
        verifyCode: verifyEmailCode,
        expiredAt: new Date(Date.now() + 30 * 1000),
      },
    });
    await this.mailerService.sendMail({
      to: email,
      subject: 'TEST Email',
      text: `테스트 :: 아래 링크를 클릭하여 이메일 인증을 완료해주세요...`,
    });
  }
  verifyCode(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

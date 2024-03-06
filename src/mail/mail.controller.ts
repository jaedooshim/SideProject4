import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { PrismaService } from '../_common/prisma/prisma.service';

@Controller('mail')
export class MailController {
  constructor(
    private mailService: MailService,
    private prismaService: PrismaService,
  ) {}

  @Post()
  async createMail(@Body('email') body: string) {
    return await this.mailService.sendEmail(body);
  }

  @Get('verify')
  async verifyEmail(@Query('code') query: string) {
    const verifyEmail = await this.prismaService.verifyEmail.findFirst({
      where: { verifyCode: query },
    });

    if (!verifyEmail || verifyEmail.expiredAt < new Date()) {
      throw new BadRequestException('유효시간이 지났습니다.');
    }

    const member = await this.prismaService.member.findFirst({
      where: { email: verifyEmail.email },
    });

    await this.prismaService.member.update({
      where: { id: member.id },
      data: { isValidEmail: true },
    });

    return { message: '인증이 완료되었습니다.' };
  }
}

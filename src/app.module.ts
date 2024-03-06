import { Module } from '@nestjs/common';
import { PrismaModule } from './_common/prisma/prisma.module';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './_common/jwt/jwt.module';
import { BcryptModule } from './_common/bcrypt/bcrypt.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PrismaModule, MemberModule, AuthModule, JwtModule, BcryptModule, MailModule],
})
export class AppModule {}

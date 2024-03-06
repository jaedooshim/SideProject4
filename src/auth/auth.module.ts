import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '../_common/jwt/jwt.module';
import { MemberModule } from '../member/member.module';
import { BcryptModule } from '../_common/bcrypt/bcrypt.module';

@Module({
  imports: [JwtModule, MemberModule, BcryptModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

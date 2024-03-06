import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { IMemberCreate } from './types/create/request.interface';
import { Member } from '@prisma/client';
import { BcryptService } from '../_common/bcrypt/bcrypt.service';
import { IMemberFindMany } from './types/find-many/request.interface';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: IMemberCreate): Promise<string> {
    await this.memberRepository.findUniqueEmail(data.email);
    data.password = await this.bcryptService.hash(data.password);
    await this.memberRepository.create(data);
    return '회원이 정상적으로 생성되었습니다.';
  }

  async softDelete(id: string): Promise<string> {
    await this.memberRepository.findUniqueOrThrow(id);
    await this.memberRepository.softDelete(id);
    return '회원삭제가 정상적으로 처리되었습니다.';
  }

  async findMany(data: IMemberFindMany) {
    return await this.memberRepository.findMany(data);
  }

  async getEmail(email: string): Promise<Member> {
    return await this.memberRepository.isValidEmail(email);
  }

  async findUnique(id: string): Promise<Member> {
    return await this.memberRepository.findUniqueOrThrow(id);
  }
}

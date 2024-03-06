import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/prisma/prisma.service';
import { IMemberCreate } from './types/create/request.interface';
import { Member } from '@prisma/client';
import { IMemberFindMany } from './types/find-many/request.interface';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  private memberRepository = this.prisma.extendedClient.member;

  async create(data: IMemberCreate): Promise<Member> {
    return this.memberRepository.create({ data: { ...data } });
  }

  async softDelete(id: string): Promise<Member> {
    return this.memberRepository.softDelete({ id });
  }

  async findMany(data: IMemberFindMany): Promise<Member[]> {
    return this.prisma.member.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findUniqueEmail(email: string): Promise<void> {
    const member = await this.memberRepository.findFirst({ where: { email } });
    if (member) throw new ConflictException('이미 등록된 이메일입니다.');
  }

  async isValidEmail(email: string): Promise<Member | null> {
    const member = await this.memberRepository.findFirst({ where: { email } });
    if (!member) throw new NotFoundException('등록되지 않은 이메일입니다.');
    return member;
  }

  async findUniqueOrThrow(id: string): Promise<Member> {
    const member = await this.memberRepository.findFirst({ where: { id } });
    if (!member) throw new NotFoundException('등록되지 않은 멤버입니다.');
    return member;
  }
}

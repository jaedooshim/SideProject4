import { IsNotEmpty, IsString } from 'class-validator';

export class MemberParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MemberCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

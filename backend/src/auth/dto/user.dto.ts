import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
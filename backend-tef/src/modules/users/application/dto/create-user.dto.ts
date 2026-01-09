import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;
  @IsString()
  public surname: string;
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
  @IsString()
  public phone: string;
}

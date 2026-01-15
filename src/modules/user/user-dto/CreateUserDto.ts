import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: 'Not valid email' })
  @IsNotEmpty({ message: 'Mandatory Email' })
  email: string;

  @IsString({ message: 'String Password'})
  @IsNotEmpty({message: 'Mandatory Password'})
  password: string;

  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Mandatory name' })
  @MinLength(2, { message: 'At least 2 char' })
  fullname: string;
}

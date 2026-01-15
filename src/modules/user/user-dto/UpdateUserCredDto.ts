import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserCredDto {
  @IsEmail({}, { message: 'Email non valida' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Password deve essere una stringa' })
  @MinLength(6, { message: 'Password deve avere almeno 6 caratteri' })
  @IsOptional()
  password?: string;
}
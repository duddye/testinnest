import { IsString, MinLength, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsString({ message: 'Nome deve essere una stringa' })
  @MinLength(2, { message: 'Nome deve avere almeno 2 caratteri' })
  @IsOptional()
  fullname?: string;
}
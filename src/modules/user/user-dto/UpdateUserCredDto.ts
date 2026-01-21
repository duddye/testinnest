import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class UpdateUserCredDto {
  @Field({ nullable: true })
  @IsEmail({}, { message: 'Email non valida' })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString({ message: 'Password deve essere una stringa' })
  @MinLength(6, { message: 'Password deve avere almeno 6 caratteri' })
  @IsOptional()
  password?: string;
}
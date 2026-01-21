import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength, IsOptional } from "class-validator";

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsString({ message: 'Nome deve essere una stringa' })
  @MinLength(2, { message: 'Nome deve avere almeno 2 caratteri' })
  @IsOptional()
  fullname?: string;
}
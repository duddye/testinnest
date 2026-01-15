import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class CreateDeviceDto {
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Mandatory name' })
  @MinLength(2, { message: 'At least 2 char' })
  name: string;


  @IsString()  // TYPE SHOULD EXISTS IN DB
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Mandatory SN' })
  //@MinLength(10, { message: 'At least 10 char' })
  serialNumber: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;
}


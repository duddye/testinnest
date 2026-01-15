import { IsString, IsNotEmpty, MinLength} from "class-validator";


export class UpdateDeviceDto {
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Mandatory name' })
  @MinLength(2, { message: 'At least 2 char' })
  name: string;
}
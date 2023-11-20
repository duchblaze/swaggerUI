import { IsString, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ required: true })
  @IsString()
  phoneNo: string;

  @ApiProperty({ required: true })
  @IsString()
  dob: string;

  @ApiProperty({ required: true })
  @IsString()
  gender: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  status: boolean;

  @ApiProperty({ required: false })
  @IsDate()
  dateCreated;
}

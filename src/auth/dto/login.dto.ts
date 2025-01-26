import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginDto {
  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'Registered email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'securePassword123!',
    description:
      'Account password (must contain at least one number and one letter)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

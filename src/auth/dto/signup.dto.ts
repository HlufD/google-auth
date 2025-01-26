import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class SignupDto {
  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'strongPassword123!',
    description:
      'User password (must contain at least one number and one letter)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    example: 'John',
    description: "User's first name",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    description: "User's last name",
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

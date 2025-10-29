import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto{
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'juan@example.com',
        description: 'User email'
    })

    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '123456',
        description: 'User password'
    })
    
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    
}
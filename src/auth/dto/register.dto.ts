import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Juanes Vélez',
    description: 'Nombre completo del usuario',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({
    example: 'juanes@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

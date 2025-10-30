import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Comprar tenis', description: 'Título de la tarea' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @ApiProperty({ example: 'Ir al centro comercial', required: false })
  @IsOptional()
  description?: string;
}

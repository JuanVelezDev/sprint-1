import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Preparar la reunión con el cliente',
    description: 'Título de la tarea. Mínimo 3 caracteres.',
  })
  @IsString()
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @ApiProperty({
    example: 'Revisar los puntos del contrato y preparar la presentación.',
    description: 'Descripción opcional de la tarea.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: TaskStatus.PENDING,
    enum: TaskStatus,
    description: 'Estado inicial de la tarea (opcional)',
    default: TaskStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'El estado debe ser PENDING, IN_PROGRESS o DONE' })
  status?: TaskStatus;
}


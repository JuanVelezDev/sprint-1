import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Preparar presentación final del proyecto',
    description: 'Título nuevo de la tarea',
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title?: string;

  @ApiPropertyOptional({
    example: 'Agregar las métricas finales y revisar ortografía',
    description: 'Descripción nueva de la tarea',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: TaskStatus.DONE,
    enum: TaskStatus,
    description: 'Nuevo estado de la tarea',
  })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'El estado debe ser PENDING, IN_PROGRESS o DONE' })
  status?: TaskStatus;
}

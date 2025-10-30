import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

 
  @Post()
  @ApiBody({ type: CreateTaskDto })
  async createTask(@Req() req, @Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(req.user.userId, dto);
  }
}

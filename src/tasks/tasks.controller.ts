import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDto } from './dto/pagination.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Post()
    createTask(@Body() dto: CreateTaskDto, @Req() req) {
        return this.taskService.createTask(dto, req.user);
    }

    @Get()
    getAllTasks(@Req() req, @Query() pagination: PaginationDto){
        return this.taskService.getAllTasks(req.user, pagination);
    }

    @Get(':id')
    gesTaskById(@Param('id') id: string, @Req() req){
        return this.taskService.getTaskById(id, req.user)
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req){
        return this.taskService.updateTask(id, dto, req.user)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string, @Req() req){
        return this.taskService.deleteTask(id, req.user)
    }
}

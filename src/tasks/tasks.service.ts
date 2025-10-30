import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,
    ) {}

    async createTask(dto: CreateTaskDto, user: User): Promise<Task>{
        const task = this.taskRepo.create({ ...dto, user })
        return await this.taskRepo.save(task);
    }

    async getAllTasks(user: User, pagination: PaginationDto){
        const { page, limit } = pagination;
        const [ tasks, total ] = await this.taskRepo.findAndCount({
            where: { user },
            skip: ( page - 1 ) * limit,
            take: limit,
            order: { createdAt: 'DESC' }
        });

        return {
            total,
            page,
            limit,
            data: tasks,
        };
    }

    async getTaskById(id: string, user: User){
        const task = await this.taskRepo.findOne({ where: { id, user } });
        if (!task) throw new NotFoundException('Tarea no encontrada');
        return task;
    }

    async updateTask(id: string, dto: UpdateTaskDto, user: User){
        const task = await this.getTaskById(id, user);
        Object.assign(task, dto);
        return this.taskRepo.save(task);
    }

    async deleteTask(id: string, user: User){
        const task = await this.getTaskById(id, user);
        await this.taskRepo.delete(task);
        return { message: 'Tarea eliminada correctamente' }
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getTasks(userId: number, page: number, limit: number) {
    const [tasks, total] = await this.taskRepo.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { page, limit, total, tasks };
  }

  async createTask(userId: number, dto: CreateTaskDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newTask = this.taskRepo.create({
      ...dto,
      user,
    });

    return await this.taskRepo.save(newTask);
  }
}

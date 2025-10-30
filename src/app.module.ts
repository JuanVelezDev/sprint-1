import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { TasksModule } from './tasks/task.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

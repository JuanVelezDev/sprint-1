import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password_hash: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

}
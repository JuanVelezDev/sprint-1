import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";

enum TaskStatus{
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}


/*export class Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: string;
}*/

import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {

    getAllTask(){
        return[{
            id:1,
            title: "first task",
            descrption: "some task"
        }]
    }
    getTaskById(id: string){
    }
    createTask(task: any){
    }
    deleteTask(id: string){
    }
    updateTask(id: string, task: any){
    }

}

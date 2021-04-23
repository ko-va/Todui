import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { List } from './List';
import {User} from "./User";


@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    isToggled: boolean;

    @Column()
    listId: number;

    @Column()
    userId: number;

    @ManyToOne(() => List, list => list.todos)
    list: List;

    @ManyToOne(() => User, user => user.todos)
     user: User;
}

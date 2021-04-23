import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { List } from './List';
import { Todo } from './Todo';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => List, list => list.user, { cascade: true })
    lists: List[];

    @OneToMany(() => Todo, todo => todo.user, { cascade: true })
    todos: Todo[];
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from './User';
import { Todo } from './Todo';


@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.lists)
    user: User;

    @OneToMany(() => Todo, todo => todo.list, {eager: true, cascade: true})
    todos: Todo[];

}

import Todo from "./Todo";

export default interface TodoList {
    name: string;
    description: string;
    todos: Array<Todo>;
    id: number;
}

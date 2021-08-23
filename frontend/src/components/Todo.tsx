import React from 'react';
import './Todo.css';
import TodoModel from '../types/models/Todo'

interface TodoProps {
    todo: TodoModel;
    removeTodo(id: number): void;
    updateTodo(id: number, isToggled: boolean): void;
}

const Todo = (props: TodoProps) =>  {
    const { todo } = props;

    return (
      <div className="todo__container">

        <div className="todo-checkbox-name-desc">

          <div className="todo-input--checkbox">
            <input className="checkbox" type="checkbox" checked={todo.isToggled} onChange={() => {
              props.updateTodo(todo.id, !todo.isToggled)
            }} />
          </div>

          <div className="todo__content">

            <div className="todo__name">
              <p className="todo__name-p">{todo.name}</p>
            </div>

            <div className="todo__desc">
              <p className="todo__desc-p">{todo.description}</p>
            </div>

          </div>

        </div>

        <div className="todo-btn--remove">
            <button onClick={() => props.removeTodo(todo.id)}>x</button>
        </div>

      </div>
    );
}

export default Todo;

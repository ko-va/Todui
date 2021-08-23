import React from 'react';
import './List.css';
import TodoList from '../types/models/TodoList';
import TodoType from '../types/models/Todo';
import NewTodo from './NewTodo';
import request from "../request";
import Todo from './Todo';

interface ListPropInterface {
    list: TodoList,
    reload(): void,
    authFailure?: () => void,
}

const List = (props: ListPropInterface) => {
  const { list } = props;

  const removeList = async () => {
    await request({
      path: `lists/${list.id}`,
      method: 'DELETE',
      authFailure: props.authFailure,
    })

    await props.reload()
  };

  const removeTodo = async (id: number) => {
    await request({
      path: `lists/${list.id}/todos/${id}`,
      method: 'DELETE',
      authFailure: props.authFailure,
    })

    await props.reload()
  }

  const updateTodo = async (id: number, isToggled: boolean) => {
    await request({
      path: `lists/${list.id}/todos/${id}`,
      method: 'PATCH',
      body: {
        isToggled,
      },
      authFailure: props.authFailure,
    })

    await props.reload()
  }

  const sortedTodos = list.todos.sort((a: TodoType, b: TodoType) => +a.isToggled - +b.isToggled)

  return (
    <div className="list__container">

      <div className="list__content">

        <div className="list-name">
          <h3>{list.name}</h3>
        </div>
        <div className="list-desc">
          <p>{list.description}</p>
        </div>

        <div className="todos__todo--add">
          <NewTodo listId={list.id} reload={props.reload} authFailure={props.authFailure} />
        </div>

        <div className="todos__container">
          {sortedTodos.map(todo => {
            return <Todo todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />
          })}
        </div>

      </div>

      <div className="list--btns">

        <div>
          <button className="list-btn--remove" onClick={removeList}>Remove List</button>
        </div>

      </div>

    </div>
  );
}

export default List;

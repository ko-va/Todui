import React, { useState } from 'react';
import request from "../request";
import './NewTodo.css';
interface NewTodoPropsInterface {
  reload(): any,
  listId: number,
  authFailure?: () => any,
}

const NewTodo = (props: NewTodoPropsInterface) => {

  const { listId } = props;

  const [name, setName] = useState<string|undefined>();
  const [desc, setDesc] = useState<string|undefined>();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true)

  const handleNameInputChange = (event: any) => {
    setName(event.target.value);
  };

  const handleDescInputChange = (event: any) => {
    setDesc(event.target.value);
  }

  const addTodo = async () => {
    if (!name || !desc) {
      setValid(false)
      return
    }

    await request({
      path: `lists/${listId}/todos`,
      method: 'POST',
      body: {
        name: name,
        description: desc,
        isToggled: false,
      },
      authFailure: props.authFailure,
    });

    await props.reload();

    setName("")
    setDesc("")
  }

  return (
    <div className="new-todo__container">
      <button className="btn-third btn--add-new-todo" onClick={() => {
        setExpanded(!expanded)
        if (!expanded) {
          setValid(true)
        }
      }}>{expanded ? 'Close form' : 'Add new todo'}</button>

      {expanded && <>
          <div className="new-todo__input-fields">
            {!valid && <p>Please fill both fields</p>}

            <div className="todo-name">
              <input className="new-list__input" value={name} type="text" placeholder="name" onChange={handleNameInputChange} />
            </div>

            <div className="todo-desc">
              <input className="new-list__input" value={desc} type="text" placeholder="description" onChange={handleDescInputChange} />
            </div>

          </div>

          <div className="list-btn--add">
              <button className="btn-third" onClick={addTodo}>Add</button>
          </div>
      </>}
    </div>
  );
};

export default NewTodo;

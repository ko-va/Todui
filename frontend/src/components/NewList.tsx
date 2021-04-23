import React, { useState } from 'react';
import './NewList.css';
import request from "../request";

interface NewListPropInterface {
  reload(): any,
  authFailure?: () => any,
}

const NewList = (props: NewListPropInterface) => {

  const [name, setName] = useState<string|undefined>();
  const [desc, setDesc] = useState<string|undefined>();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleNameInputChange = (event: any) => {
    setName(event.target.value);
  };

  const handleDescInputChange = (event: any) => {
    setDesc(event.target.value);
  }

  const addList = async () => {
    await request({
      path: 'lists',
      method: 'POST',
      body: {
        name,
        description: desc
      },
      authFailure: props.authFailure,
    });

    await props.reload();

    setName("")
    setDesc("")
  }

  return (
    <div className="list__container">

      <div className="list__content new-list__content">
        <button className="btn-secondary btn--add-new-list" onClick={() => {
          setExpanded(!expanded)
        }}>{expanded ? 'Close form' : 'Add new list'}</button>

        {expanded && <>
          <div className="new-list__input-fields">

            <div className="new-list__name">
              <input className="new-list__input" value={name} type="text" placeholder="name" onChange={handleNameInputChange} />
            </div>

            <div className="new-list__desc">
              <input className="new-list__input" value={desc} type="text" placeholder="description" onChange={handleDescInputChange} />
            </div>

          </div>

          <div>
            <button className="btn-main list-btn--create" onClick={addList}>Create</button>
          </div>
        </>}
      </div>

    </div>
  );
}

export default NewList;

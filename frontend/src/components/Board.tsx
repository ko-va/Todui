import React from 'react';
import AllLists from './AllLists';
import ContainerComponentProps from '../types/ContainerComponent';

const Board = (props: ContainerComponentProps) => {
  return (
    <div className="board">
      <AllLists authFailure={props.logout} />
    </div>
  );
}

export default Board;

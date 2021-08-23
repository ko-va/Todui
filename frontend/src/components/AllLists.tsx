import React, { useState, useEffect } from 'react';
import TodoList from '../types/models/TodoList';
import List from './List';
import NewList from './NewList';

import './AllLists.css';
import request from "../request";

interface Props {
  authFailure?: () => void,
}

const AllLists = (props: Props) => {
    const [allLists, setAllLists] = useState([]);

    const fetchData = async () => {
      const allListsJson = await request({
        path: 'lists/',
        authFailure: props.authFailure,
      });

      if (allListsJson) {
        setAllLists(allListsJson);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return <div className="all-lists">

        <NewList reload={fetchData} authFailure={props.authFailure} />

        {allLists.map((list: TodoList) => {
            return <List list={list} reload={fetchData} authFailure={props.authFailure} />
        })}

    </div>;
};

export default AllLists;

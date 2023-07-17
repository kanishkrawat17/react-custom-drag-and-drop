import React, { useState } from 'react';
import TodoInput from './TodoInput';
import "../css/index.css";
const TodoList = () => {
  const [pendingTodos, setPendingTodos] = useState([
    { id: 1, taskName: 'Wash Dishes' },
    { id: 2, taskName: 'Wash Car' },
  ]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const itemId = e.dataTransfer.getData('text');
    const removedItem = pendingTodos.find(
      (item) => item.id == itemId
    );

    setCompletedTodos((prevState) => [...prevState, removedItem]);

    setPendingTodos((prevState) => {
      return prevState.filter((todoItem) => {
        const todoId = todoItem.id;
        return itemId != todoId;
      });
    });
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <div className="todolist-wrapper">
      <TodoInput
        pendingTodos={pendingTodos}
        setPendingTodos={setPendingTodos}
      />
      <div className="pending-tasks">
        <span>You have {pendingTodos.length} Pending Tasks</span>
        <ul>
          {pendingTodos?.map((todoItem) => {
            return (
              <li
                draggable
                key={todoItem.id}
                onDragStart={(e) => handleDragStart(e, todoItem.id)}
              >
                {todoItem.taskName}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="completed-tasks"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <span>You completed {completedTodos.length} Tasks</span>
        <ul>
          {completedTodos?.map((todoItem) => {
            return <li key={todoItem.id}>{todoItem.taskName}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;

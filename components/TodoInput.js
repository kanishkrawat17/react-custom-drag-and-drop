import React, { useState } from 'react';

const TodoInput = (props) => {
  const { pendingTodos, setPendingTodos } = props;
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const newTask = { id: pendingTodos.length + 1, taskName: value }
    setPendingTodos((prevState) => [
      ...prevState,
      newTask
    ]);
  };

  return (
    <>
      <input value={value} onChange={handleChange} type="text" />
      <button onClick={handleClick}>Create task</button>
    </>
  );
};

export default TodoInput;

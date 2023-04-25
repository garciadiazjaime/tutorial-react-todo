// pages/index.js

import { useState } from "react";

function HomePage() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  const onChangeHandler = (event) => {
    setTodo(event.target.value);
  };

  const addClickHandler = () => {
    if (!todo) {
      return;
    }

    const newList = [...list, { todo, state: false }];
    setList(newList);
    setTodo("");
  };

  const onTodoChangeHandler = (index) => {
    const newList = [...list];

    newList[index].state = !newList[index].state;
    setList(newList);
  };

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={onChangeHandler}
        style={{
          border: "none",
          borderBottom: "1px solid black",
          boxSizing: "border-box",
          padding: "0px 12px",
          width: "100%",
          fontSize: 24,
          height: 60,
        }}
      />

      <button
        onClick={addClickHandler}
        style={{
          margin: "12px 0",
          padding: "12px 0",
          fontSize: 20,
          width: "100%",
          background: "none",
          border: "1px solid black",
        }}
      >
        Add
      </button>

      <ul style={{ margin: 0, listStyle: "none", padding: 0, fontSize: 48 }}>
        {list.map((item, index) => (
          <li
            key={index}
            style={{ display: "flex", alignItems: "center", margin: "12px 0" }}
          >
            <input
              type="checkbox"
              checked={item.state}
              onChange={() => onTodoChangeHandler(index)}
              style={{ width: 48, height: 48, marginRight: 12 }}
            />
            <span>{item.todo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

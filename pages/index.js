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

    const newList = [...list, todo];
    setList(newList);
    setTodo("");
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
    </div>
  );
}

export default HomePage;

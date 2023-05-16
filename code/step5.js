// pages/index.js

// BEGINNING OF NEW CODE
import { useState, useEffect, useRef } from "react";
// ENDING OF NEW CODE

function HomePage() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  // BEGINNING OF NEW CODE
  const inputRef = useRef();
  // ENDING OF NEW CODE

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

  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      addClickHandler();
    }
  };

  const onTodoChangeHandler = (index) => {
    const newList = [...list];

    newList[index].state = !newList[index].state;
    setList(newList);
  };

  // BEGINNING OF NEW CODE
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // ENDING OF NEW CODE

  return (
    <div>
      {/* BEGINNING OF NEW CODE */}
      <input
        type="text"
        value={todo}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        ref={inputRef}
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
      {/* END OF NEW CODE */}
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
            <input
              type="text"
              value={item.todo}
              readOnly
              style={{
                height: 48,
                width: "100%",
                fontSize: 32,
                border: "none",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

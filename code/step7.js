// pages/index.js

import { useState, useEffect, useRef } from "react";

function HomePage() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const inputRef = useRef();

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

  const onTodoValueChangeHandler = (event, index) => {
    const newList = [...list];
    newList[index].todo = event.target.value;

    setList(newList);
  };

  // BEGINNING OF NEW CODE
  const deleteClickHandler = (index) => {
    if (!confirm("Are you sure?")) {
      return;
    }

    const newList = [...list];

    setList([...newList.slice(0, index), ...newList.slice(index + 1)]);
  };
  // ENDING OF NEW CODE

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
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
            {/* BEGINNING OF NEW CODE */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={item.todo}
                onChange={(event) => onTodoValueChangeHandler(event, index)}
                style={{
                  height: 48,
                  width: "calc(100% - 40px)",
                  fontSize: 32,
                  border: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 13,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  opacity: 0.7,
                }}
                onClick={() => deleteClickHandler(index)}
              >
                ❌
              </div>
            </div>
            {/* END OF NEW CODE */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

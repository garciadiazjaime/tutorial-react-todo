// pages/index.js

import { useState, useEffect, useRef } from "react";

function HomePage() {
  const [todo, setTodo] = useState("");
  const [list, setListState] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [editModeOn, setEditModeIn] = useState(false);
  const inputRef = useRef();

  const setList = (list) => {
    localStorage.setItem("@app.List", JSON.stringify(list));
    setListState(list);
  };

  const initList = () => {
    let localList = [];

    try {
      localList = JSON.parse(localStorage.getItem("@app.List"));
    } catch (error) {
      // no-op
    }

    if (Array.isArray(localList)) {
      setList(localList);
    }
  };

  const onChangeHandler = (event) => {
    setTodo(event.target.value);
  };

  const saveClickHandler = () => {
    if (!todo) {
      return;
    }

    const newList = [...list];

    if (editModeOn) {
      newList[editIndex].todo = todo;
      setEditIndex();
    } else {
      newList.push({ todo, state: false });
    }

    setList(newList);
    setTodo("");
  };

  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      saveClickHandler();
    }
  };

  const onTodoChangeHandler = (index) => {
    const newList = [...list];

    newList[index].state = !newList[index].state;
    setList(newList);
  };

  const editClickHandler = (index) => {
    if (editModeOn) {
      setTodo("");
      setEditIndex();
    } else {
      inputRef.current.focus();
      setEditIndex(index);
      setTodo(list[index].todo);
    }
  };

  const deleteClickHandler = (event, index) => {
    event.stopPropagation();
    if (!confirm("Are you sure?")) {
      return;
    }

    const newList = [...list];

    if (index === 0) {
      setList(newList.slice(1));
    } else {
      setList([...newList.slice(0, index), ...newList.slice(index + 1)]);
    }
    setEditIndex();
    setTodo("");
  };

  useEffect(() => {
    setEditModeIn(editIndex >= 0);
  }, [editIndex]);

  useEffect(() => {
    inputRef.current.focus();

    initList();
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

      <ul style={{ margin: "24px 0 0", listStyle: "none", padding: 0 }}>
        {list.map((item, index) => (
          <li
            key={index}
            style={{
              margin: "12px 0",
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
              height: 48,
            }}
          >
            <input
              type="checkbox"
              checked={item.state}
              onChange={() => onTodoChangeHandler(index)}
              style={{ width: 48, height: 48, marginRight: 12 }}
            />
            <div
              style={{
                fontSize: editIndex === index ? 30 : 24,
                color: editIndex === index ? "gray" : "initial",
                flex: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => editClickHandler(index)}
            >
              <div>{item.todo}</div>
              {index === editIndex ? (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid red",
                    opacity: 0.7,
                  }}
                  onClick={(event) => deleteClickHandler(event, index)}
                >
                  ❌
                </div>
              ) : (
                <></>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

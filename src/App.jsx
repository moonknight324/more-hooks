import React, { useState, useReducer, useRef } from "react";
import "./App.css";

const initState = [];

function Reducer(state, action) {
  switch (action.type) {
    case "ADD_CONTENT":
      return [...state, { name: action.data, visible: true }];
    case "TOGGLE_CONTENT":
      return state.map((ele, index) =>
        index === action.index ? { ...ele, visible: !ele.visible } : ele
      );
    default:
      return state;
  }
}

const App = () => {
  const [value, setValue] = useState("");
  const inpFocus = useRef();
  const [content, dispatch] = useReducer(Reducer, initState);

  const focusInput = () => {
    inpFocus.current.focus();
  };

  const hideContent = (index) => {
    dispatch({ type: "TOGGLE_CONTENT", index });
  };

  const addContent = () => {
    dispatch({ type: "ADD_CONTENT", data: value });
  };

  const handleContentChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="main">
        <input ref={inpFocus} type="text" onChange={handleContentChange} />
        <button onClick={addContent}>Add</button>
      </div>
      <div className="content-body">
        {content.map((ele, index) => (
          <div key={index}>
            <p>{ele.visible ? ele.name : "This Content is Hidden"}</p>
            <button onClick={() => hideContent(index)}>Toggle</button>
          </div>
        ))}
      </div>
      <button className="focus" onClick={focusInput}>Get Back Writing!</button>
    </>
  );
};

export default App;

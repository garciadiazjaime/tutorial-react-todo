// pages/index.js

import { useState } from "react";


function HomePage() {
 const [todo, setTodo] = useState("");


 const onChangeHandler = (event) => {
   setTodo(event.target.value)
 };


 return (
   <div>
     <input type="text" value={todo} onChange={onChangeHandler} style={{
       boxSizing: 'border-box',
       padding: '0px 12px',
       width: '100%',
       fontSize: 24,
       height: 60,
     }} />
   </div>
 );
}

export default HomePage;

const { useState } = require("react");

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
      setHistory(history);
     }
   setHistory((prevhistory) => [...prevhistory, newMode]);
   setMode(newMode);
   }

 function back() {
   
   if (history.length > 1) {
     history.pop(); 
   }
   if (history.length > 0) {
     setMode(history.slice(-1)[0]);
   }
 }
 return { mode, transition, back };
}
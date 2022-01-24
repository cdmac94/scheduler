import React from "react";
import "components/Appointments/styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";

const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREAT = "CREATE";
export default function Appointment(props) {

  const {time, id, interview} = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  return (
    {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
  )
  
}
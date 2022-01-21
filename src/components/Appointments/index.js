import React from "react";
import "components/Appointments/styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {

  const {time, id, interview} = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {props.interview ? <Show id={id} student={interview.student}  interviewer={interview.interviewer.name}/> : <Empty />}
    </article>
  )
  
}
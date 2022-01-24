import React from "react";
import "components/Appointments/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVEING = "SAVEING";

  const {time, id, interview} = props;

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    if (interview.student && interview.interviewer) {
      transition(SAVEING);
      props.bookInterview(id, interview)
      .then((res) => {
        console.log(res)
        if (res === 204){
          transition(SHOW)
        }
      })
      .catch((error) => console.log(error ));
    }
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  return (
    <article className="appointment">
      <Header time = {time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={interview.student}
        interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} name = {props.name} value = {props.value} onCancel={back} onSave={save}/>}
      {mode === SAVEING && <Status message = "Saving"/>}
    </article>
  )
  
}
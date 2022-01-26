import React from "react";
import "components/Appointments/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {time, id, interview} = props;

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };
    if (name && interviewer) {
      transition(SAVING);
    }
      props.bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  function edit(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

      transition(SAVING);
      props.editInterview(id, interview)
      .then((res) =>{
        if(res === 204){
          transition(SHOW)
        }
      })
      .catch((res) => {
      if(res === 500){
        transition(ERROR_SAVE, true)
      }
    });
  };

  function confirmDelete() {
    transition(DELETE)
  };

  function deleteApp(event) {

    transition(DELETING)
    props.cancelInterview(id)
    .then((res) =>{
      if(res === 204){
        transition(EMPTY)
      }
    })
    .catch((res) => {
      if(res === 500){
        transition(ERROR_DELETE, true)
      }
    });
  }

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
        onDelete={confirmDelete}
        onEdit={() => transition(EDITING)}
        />
      )}
      {mode === CREATE && 
        <Form 
        interviewers={props.interviewers} 
        value = {props.value} 
        onCancel={back} 
        onSave={save}/>}
      {mode === SAVING && <Status message = "Saving"/>}
      {mode === DELETING && <Status message = "Deleting"/>}
      {mode === DELETE && 
        <Confirm 
        onConfirm={deleteApp} 
        message ="Are you sure you want to delete?" 
        onCancel={back}/>}
      {mode === EDITING && 
        <Form 
        interviewers={props.interviewers} 
        interviewer = {props.interview.interviewer.id} 
        value = {props.value} 
        name ={interview.student} 
        onCancel={back} 
        onSave={edit}/>}
      {mode === ERROR_SAVE && <Error message = "Could not create appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message = "Could not cancel appointment" onClose={back} />}
    </article>
  )
  
}
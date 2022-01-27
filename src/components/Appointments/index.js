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

  // variables to be used with useVisualMode to ensure apropriate compenents are rendered

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //functions for new interview form

  function save(name, interviewer) {
    if (!name || !interviewer) {
      transition(ERROR_SAVE);
    }

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  function edit(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.editInterview(props.id, interview)
    .then((res) =>{
      if(res === 204){
        transition(SHOW)
      }
    })
    .catch(() => transition(ERROR_SAVE, true));
  };

  function deleteApp(event) {
    
    transition(DELETING)
    props.cancelInterview(props.id)
    .then((res) =>{
      if(res === 204){
        transition(EMPTY)
      }
    })
    .catch((res) => transition(ERROR_DELETE, true));
  };

  function confirmDelete() {
    transition(DELETE)
  };
  
  return (
    <article className="appointment">
      <Header time = {props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
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
        name ={props.interview.student} 
        onCancel={back} 
        onSave={edit}/>}
      {mode === ERROR_SAVE && <Error message = "Could not create appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message = "Could not cancel appointment" onClose={back} />}
    </article>
  )
  
}
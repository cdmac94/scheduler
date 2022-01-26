import React from "react";
import { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const { student,  interviewers, onSave, onCancel} = props;
  const [name, setName] = useState(props.name || "");
  const [currentInterviewer, setCurrentInterviewer] = useState(props.interviewer || null);

  function reset()  {
    setName("")
    setCurrentInterviewer(null)
  }

  const cancel = () => {
    reset();
    onCancel();
  };

  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    setError("");
    onSave(name, currentInterviewer);
  };
  

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name = "name"
          type="text"
          value={name}
          placeholder= "Enter Student Name"
          onChange={(event) => setName(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
       interviewers={interviewers} value={currentInterviewer} onChange={(event) => setCurrentInterviewer(event)} selected={props.selected}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm  onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  )
}
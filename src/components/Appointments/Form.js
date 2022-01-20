import React from "react";
import { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const { student, interviewer, interviewers, onSave, onCancel} = props;
  const [currentStudent, setCurrentStudent] = useState(props.student || "");
  const [currentInterviewer, setCurrentInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setCurrentStudent("")
    setCurrentInterviewer(null)
  }

  function cancel () {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name={student}
          type="text"
          value={ currentStudent }
          placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
          onChange={(event) => setCurrentStudent(event.target.value)}
        />
      </form>
      <InterviewerList 
       interviewers={interviewers} value={currentInterviewer} onChange={(event) => setCurrentInterviewer(event)}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onSubmit={event => event.preventDefault()} onClick={onSave}>Save</Button>
      </section>
    </section>
  </main>
  )
}
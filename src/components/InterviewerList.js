import React from "react"; 
import PropTypes from "prop-types"
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewList(props) {

  const { onChange, interviewers, value } = props

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
       {interviewers.map(interviewer => <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)} 
      />)}
    </ul>
    </section>
  )
}

InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired
}
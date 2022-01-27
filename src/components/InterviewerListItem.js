import React from "react";
import "components/InterviewerListItem.scss" 
import classNames from "classnames";

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    });

  const selectInterviewer =  () => props.setInterviewer(props.id);


  return (
    <li className={interviewerClass} onClick={selectInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
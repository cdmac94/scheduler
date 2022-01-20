import React, { Fragment } from "react";
import Appointments from "components/Appointments";
import Header from "./Header";
import "components/Appointments/styles.scss";

export default function Application(props) {

  const {time} = props;

  return (
    <article className="appointment">
      {props.time && <h2>Appointment at {time}</h2>}
      {!props.time && <h2>No Appointment</h2>}
    </article>
  )
  
}
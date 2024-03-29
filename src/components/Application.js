import React from "react";
import DayList from "./DayList";
import Appointment from "components/Appointments/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();

  // functions to render the appointments of the day with the approiate student and interviewer
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointment = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    const interviewers = getInterviewersForDay(state, state.day);

    return (
        <Appointment 
        key = {appointment.id}
        id = {appointment.id}
        time = {appointment.time}
        interview = {interview}
        interviewers = { interviewers }
        bookInterview = { bookInterview }
        cancelInterview = { cancelInterview }
        editInterview = {editInterview}
        />
      )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="/images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
          />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
       {appointment}
        <Appointment key ="last" time="5pm" />
      </section>
    </main>
  );
}

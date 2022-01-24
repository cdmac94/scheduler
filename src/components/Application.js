import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "components/Appointments/index.js";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];


export default function Application(props) {

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${appointment.id}`, appointment)
    .then((res) => {
      const status = res.status
      setState({
        ...state,
        appointments
      })
      return status;
    })
    .catch((error) => console.log(error ));
  }


  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch((error) => console.log(error))
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
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
        />
      )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
          bookInterview = { bookInterview }
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

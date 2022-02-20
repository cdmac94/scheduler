import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  const updateSpots = function(spot) {
    const selectedDay = state.days.find(day => day.name === state.day);
    const dayID = selectedDay.id;
    const updateDays = [...state.days];
    updateDays.forEach(day => day.id === dayID ? day.spots += spot : day);
    return updateDays;
  };

  const  bookInterview = function (id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const spotsRemaing = updateSpots(-1);

    return axios.put(`/api/appointments/${appointment.id}`, appointment)
    .then(() => {
      console.log("Made it here!")
      setState(prev => ({
        ...prev,
        appointments,
        spotsRemaing
      }))
    })
  }
  
  const cancelInterview = function(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    
    return axios.delete(`/api/appointments/${appointment.id}`)
    .then(() => {
        const spotsRemaing = updateSpots(1);
        setState(prev => ({
          ...prev,
          appointments,
          spotsRemaing
        }))
      }) 
  }

  const editInterview = function (id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${appointment.id}`, appointment)
    .then(() => {
      setState(prev => ({
        ...prev,
        appointments,
      }))
    })
  }
  
  return { state, setDay, bookInterview, cancelInterview, editInterview};
}
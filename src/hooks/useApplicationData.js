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
    .catch((error) => console.log(error));
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
    .then((res) => {
      const status = res.status;
      setState(prev => ({
        ...prev,
        appointments,
        spotsRemaing
      }))
      return status;
    })
    .catch((error) => console.log(error));
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

    const spotsRemaing = updateSpots(1);

    return axios.delete(`/api/appointments/${appointment.id}`)
      .then((res) => {
        const status = res.status
        setState(prev => ({
          ...prev,
          appointments,
          spotsRemaing
        }))
        return status;
      })
      .catch((error) => console.log(error));    
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
    .then((res) => {
      const status = res.status
      setState(prev => ({
        ...prev,
        appointments,
      }))
      return status;
    })
    .catch((error) => console.log(error));
  }
  
  return { state, setDay, bookInterview, cancelInterview, editInterview};
}
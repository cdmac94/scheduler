const getAppointmentsForDay = function(state, day) {
  const appArr = [];
  //eslint-disable-next-line
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach(appId => appArr.push(appId));
    }
  });
  const apps = appArr.map((id) => state.appointments[id]);
  return apps;
};

const getInterview = function(state, interview) {
  if (!interview) {
    return null
  }
  const interviewer = state.interviewers[interview.interviewer];
  const student = interview.student;
  return {
    student: student,
    interviewer: interviewer
  };
};
  
const getInterviewersForDay = function(state, day) {
  const interviewerArr = [];
  //eslint-disable-next-line
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach(interviewerId => interviewerArr.push(interviewerId));
    }
  });
  const interviewers = interviewerArr.map((id) => state.interviewers[id]);
  return interviewers;
}


export { getInterview, getAppointmentsForDay, getInterviewersForDay };
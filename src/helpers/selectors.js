export function getAppointmentsForDay(state, day) {
  const appArr = [];
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach(appId => appArr.push(appId))
    }
  })

  const apps = appArr.map((id) => state.appointments[id])

  return apps;
  
}

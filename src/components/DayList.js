// import { findByDisplayValue } from "@testing-library/react";
import React from "react";
// import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {


  return(
    <ul>
       {props.days.map(day => <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={props.onChange} 
      />)}
    </ul>
  );
}
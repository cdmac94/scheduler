import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = function(spots){
    if(spots === 0) {
      return 'no spots remaining';
    }
    else if(spots === 1){
      return `${spots} spot remaining`;
    }
    else{
      return `${spots} spots remaining`;
    }
  }
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const selectDay = () => props.setDay(props.name);

  return (
    <li className={dayClass} onClick={selectDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
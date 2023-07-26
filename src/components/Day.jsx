import React from "react";

function Day(props){
   

return (

    <div className="day">
      <h1 className="heading">{props.date}</h1>
        <img src={props.icon} alt="weatherimg" className="day-img"/>
        <div className="temperatue">
        <p className="temphigh">{props.maxTemp}</p>
        <p  className="templow" >{props.minTemp}</p> </div> 
    </div>
)

}
export default Day;
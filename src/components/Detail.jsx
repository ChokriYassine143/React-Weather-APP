import React  from "react";
function Detail(props){
    return (<div className={props.classn?"Detail-box2":"Detail-box"}>
    <p className="heading-detail">{props.name}</p>
    <h1 className="value-detail">{props.value}</h1>
   {props.src? <img className="icon" src={props.src} alt="Weather Icon"/>:null}
   {props.inp?<input type={props.inp} 
   className="hum"
        min="0"
        max="100"
        value={Number(props.value.slice(0,-1))}
        readOnly />:null}
    </div>);

}
export default Detail;
import React from 'react'
import './info.css'

export default function Info(props) {
  return (

<div className="info-container">
     <h1 className="info-title">{props.title}</h1>
     <div className="divider"></div>
     <p className="date">{props.date}</p>
     <p className="location">{props.location}</p>
     <div className="divider"></div>
     <p className="info-text">{props.text}</p>
</div>
  );
}



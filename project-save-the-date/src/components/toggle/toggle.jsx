import React from 'react'
import './toggle.css'

export default function Toggle(props) {
  return (
<button className="toggle" onClick={props.onClick}>{props.label}</button>
  );
}
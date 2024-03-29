import React from 'react'
import './hero-image.css'
import Image from 'next/image';

export default function HeroImage (props) {
  return (
<div className="hero-image">
<Image className="photo"
src={props.src} 
alt={props.alt} 
width={500}
height={500}
style={{
    maxWidth: '100%', 
    height:'auto',
}}
/>
</div>
  );
}
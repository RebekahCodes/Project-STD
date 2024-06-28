import React from 'react'
import './footer.css'

export default function Footer() {
  return (

<footer className="site-footer">
     <p>{process.env.NEXT_PUBLIC_SITE_FOOTER}</p>
</footer>


  );
}
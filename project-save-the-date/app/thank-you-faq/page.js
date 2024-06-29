"use client";
import React from "react";
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import "./thank-you-faq.css";
import HeroImage from "@/components/hero-image/hero-image";
import Info from "@/components/info/info";

export default function ThankYouFaq() {
  return (
    <div className="home-container">
      

      <div className="info-grid">
        <Info
        title="Thank You!"
           //date={process.env.NEXT_PUBLIC_DATE}
           location="We have received your contact details and will be in touch soon."
           text={process.env.NEXT_PUBLIC_DATE}
        />
      </div>
      
      <div className="add-to-calendar-button">
      
      <AddToCalendarButton
  name={process.env.NEXT_PUBLIC_TITLE}
  options={['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo']}
  location={process.env.NEXT_PUBLIC_LOCATION}
  startDate="2025-07-04"
  endDate="2025-07-04"
  timeZone="Europe/London"
  label="Add To My Calendar"
/>
</div>
<div/>
      <HeroImage src={process.env.NEXT_PUBLIC_IMAGE_URL} alt="photo of a couple" />
    
    </div>
  );
}
import "./page.css";
import Head from "next/head";
import HeroImage from "../src/components/hero-image/hero-image.jsx";
import Info from "../src/components/info/info.jsx";
import Button from "../src/components/button/button.jsx";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <HeroImage src="/images/hero-image.png" alt="engagement photo" />
        <Info
          title="Becky & Gerrone Are Getting Married!"
          date="4th July 2025"
          location="SURREY, UK"
          text="Please click below to enter your contact details so that we can send your invitation"
        />
        <Button label="Enter Your Contact Details" />
      </div>
    </>
  );
}

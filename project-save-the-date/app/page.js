import "./page.css";
import HeroImage from "../src/components/hero-image/hero-image.jsx";
import Info from "../src/components/info/info.jsx";
import Button from "../src/components/button/button.jsx";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <HeroImage src="/images/hero-image.png" alt="engagement photo" />

      <div className="info-grid">
        <Info
          title="Becky & Gerrone Are Getting Married!"
          date="4th July 2025"
          location="SURREY, UK"
          text="Please click below to enter your contact details so that we can send your invitation"
        />

        <div className="button-link">
          <Link href="/sign-up">
            <Button label="Get Your Invite" />
          </Link>
        </div>
      </div>
    </div>
  );
}

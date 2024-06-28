import "./page.css";
import HeroImage from "../src/components/hero-image/hero-image.jsx";
import Info from "../src/components/info/info.jsx";
import Button from "../src/components/button/button.jsx";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <HeroImage src="/images/stock-image.png" alt="photo of a couple" />

      <div className="info-grid">
        <Info
          title={process.env.NEXT_PUBLIC_TITLE}
          date={process.env.NEXT_PUBLIC_DATE}
          location={process.env.NEXT_PUBLIC_LOCATION}
          text={process.env.NEXT_PUBLIC_TEXT}
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

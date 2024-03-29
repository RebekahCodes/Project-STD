import Image from "next/image";
import "./page.css";
import HeroImage from "../components/hero-image/hero-image.jsx";

export default function Home() {
  return (
    <>
      <HeroImage
        src="/images/hero-image.png"
        alt="
      engagement photo"
      />
    </>
  );
}

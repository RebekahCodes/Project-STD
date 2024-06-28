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
           location="We're excited to celebrate our special day with you and have chosen to host an intimate adult-only wedding."
          
          text="Details to follow."
        />
      </div>
      <HeroImage src={process.env.NEXT_PUBLIC_IMAGE_URL} alt="photo of a couple" />
    </div>
  );
}
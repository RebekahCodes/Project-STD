import "./thank-you-faq.css";
import HeroImage from "@/components/hero-image/hero-image";
import Info from "@/components/info/info";

export default function ThankYouFaq() {
  return (
    <div className="home-container">
      <HeroImage src={process.env.NEXT_PUBLIC_IMAGE_URL} alt="photo of a couple" />

      <div className="info-grid">
        <Info
          title="Thank You for Signing Up!"
          date={process.env.NEXT_PUBLIC_DATE}
          location={process.env.NEXT_PUBLIC_LOCATION}
          text="We have received your information and will be in touch soon."
        />
      </div>
    </div>
  );
}